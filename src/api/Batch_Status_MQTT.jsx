import React, { useEffect, useState, createContext } from "react";
import mqtt from "mqtt";

// สร้าง Context
const BatchStatusContext = createContext();

const Batch_Status_MQTT = ({ children }) => {

    
const [data_batch, setData_batch] = useState('Wait Data');

const [historicalData, setHistoricalData] = useState([]);
const [batch_status , setBatch_Status] = useState({
 batch_power : '',
 batchnumber : ''
});
const [batch_start_time , setBatch_start_time] = useState('');


// console.log(batch_status)
useEffect(() => {
  const host = "mqtt://100.82.151.125";
  const port = 1884;
  const topic = "NAY/ISO-29110/BATCH_STATUS";

  const client = mqtt.connect(host, { port });

  client.on("connect", () => {
    // console.log("Connected to MQTT Broker");
    client.subscribe(topic, (err) => {
      if (err) {
        // console.error("Subscription error:", err);
      } else {
        // console.log(`Subscribed to topic: ${topic}`);
      }
    });
  });

  client.on("message", (receivedTopic, message) => {
    try {
      const dataJson = JSON.parse(message);
      // console.log(dataJson)
      const device_tank_batch = dataJson[0].device_batch_value;
      const timestamp = new Date(Date.now() + 7 * 60 * 60 * 1000);
      // console.log('Received tank volume:', device_tank_batch);

      // อัปเดต data_tank และ historicalData
      setData_batch(device_tank_batch);

      setHistoricalData((prevData) => [
        ...prevData.slice(-15), // เก็บข้อมูลล่าสุด 10 ค่า
        { timestamp, value: device_tank_batch },
      ]);

      setBatch_Status({
        batch_power : dataJson[0].device_batch_value_status ? "True" : "False",
        batchnumber : dataJson[0].device_batch_id
      });

      setBatch_start_time(dataJson[0].device_batch_start_time)

    } catch (error) {
      console.error("Error parsing MQTT message", error);
    }
  });

  return () => {
    client.end();
  };
}, []);


  return (
    <BatchStatusContext.Provider value={{ data_batch , historicalData ,batch_status ,batch_start_time}}>
      {children}
    </BatchStatusContext.Provider>
  );
};

export { BatchStatusContext };
export default Batch_Status_MQTT;
