import React, { useEffect, useState, createContext } from "react";
import mqtt from "mqtt";
import { Typography, CircularProgress, Box } from "@mui/material";


// สร้าง Context
const TankDataContext = createContext();

const Tank_Volume_MQTT = ({ children }) => {

    
    const [data_tank, setData_tank] = useState('Wait Data');
const [historicalData, setHistoricalData] = useState([]);

useEffect(() => {
  const host = "mqtt://100.82.151.125";
  const port = 1884;
  const topic = "NAY/ISO-29110/TANK";

  const client = mqtt.connect(host, { port });

  client.on("connect", () => {
    // console.log("Connected to MQTT Broker");
    client.subscribe(topic, (err) => {
      if (err) {
        // console.error("Subscription error:", err);
      } else {
        console.log(`Subscribed to topic: ${topic}`);
      }
    });
  });

  client.on("message", (receivedTopic, message) => {
    try {
      const dataJson = JSON.parse(message);
      const device_tank_volume = dataJson[0].device_tank_volume;
      const timestamp = new Date(Date.now() + 7 * 60 * 60 * 1000);
      // console.log('Received tank volume:', device_tank_volume);

      // อัปเดต data_tank และ historicalData
      setData_tank(device_tank_volume);

      setHistoricalData((prevData) => [
        ...prevData.slice(-15), // เก็บข้อมูลล่าสุด 10 ค่า
        { timestamp, value: device_tank_volume },
      ]);
    } catch (error) {
      console.error("Error parsing MQTT message", error);
    }
  });

  return () => {
    client.end();
  };
}, []);


  return (
    <TankDataContext.Provider value={{ data_tank , historicalData }}>
      {/* <div>
        <h1>Tank Volume MQTT</h1>
        <p>Received Data: {data}</p>
      </div> */}
      {children}
    </TankDataContext.Provider>
  );
};

export { TankDataContext };
export default Tank_Volume_MQTT;
