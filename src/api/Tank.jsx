// *******************************Test connect ******************************


// import React, { useEffect, useState, useRef } from "react";

// const WebSocketComponent = () => {
//   const [messages, setMessages] = useState([]);
//   const [inputMessage, setInputMessage] = useState("");
//   const [status, setStatus] = useState("Disconnected");
//   const socketRef = useRef(null);

//   useEffect(() => {
//     socketRef.current = new WebSocket("ws://100.82.151.125:8000/ws");

//     socketRef.current.onopen = () => {
//       setStatus("Connected");
//     };

//     socketRef.current.onmessage = (event) =>
//       setMessages((prev) => [...prev, event.data]);

//     socketRef.current.onclose = () => setStatus("Disconnected");

//     return () => {
//       socketRef.current?.close();
//     };
//   }, []);

//   const sendMessage = () => {
//     if (socketRef.current?.readyState === WebSocket.OPEN && inputMessage.trim()) {
//       socketRef.current.send(inputMessage);
//       setInputMessage("");
//     }
//   };

//   return (
//     <div>
//       <h1>WebSocket Demo</h1>
//       <p>Status: {status}</p>
//       <div>
//         <input
//           type="text"
//           value={inputMessage}
//           onChange={(e) => setInputMessage(e.target.value)}
//         />
//         <button onClick={sendMessage}>Send</button>
//       </div>
//       <h3>Messages from server:</h3>
//       <ul>
//         {messages.map((msg, index) => (
//           <li key={index}>{msg}</li>
//         ))}
//       </ul>
//     </div>
//   );
// };

// export default WebSocketComponent;



import React, { useEffect, useState, useRef } from "react";

const WebSocketComponent = () => {
  const [status, setStatus] = useState("Disconnected");
  const [serverData, setServerData] = useState({
    device_id: '',
    device_batch_status: '',
    device_distance: '',
    device_tank_volume: '',
    device_timestamp: '',
    reset_count: '',
  });

  const socketRef = useRef(null);
  // console.log(serverData)

  useEffect(() => {
    // Connect to WebSocket server
    socketRef.current = new WebSocket("ws://100.82.151.125:8000/ws_query");

    socketRef.current.onopen = () => {
      setStatus("Connected");
      console.log("WebSocket connected");
      socketRef.current.send("get_device_data");
      console.log("Sent: get_device_data");
    };

    // Handle messages from WebSocket server
    socketRef.current.onmessage = (event) => {
      console.log("Received raw data:", event.data);
    
      try {
        const receivedData = JSON.parse(event.data);
        console.log("Parsed Data:", receivedData);
    
          setServerData({
            device_id: receivedData[0].device_id,
            device_batch_status: receivedData[0].device_batch_status,
            device_distance: receivedData[0].device_distance,
            device_tank_volume: receivedData[0].device_tank_volume,
            device_timestamp: receivedData[0].device_timestamp,
            reset_count: receivedData[0].reset_count,
          });
          console.log("State set successfully:", receivedData[0]); // Debug log

      } catch (error) {
        console.error("Error parsing JSON string:", error);
      }
    };

    socketRef.current.onclose = () => {
      setStatus("Disconnected");
      console.log("WebSocket connection closed");
    };

    return () => {
      socketRef.current?.close();
    };
  }, []);

  return (
    <div>
      <h1>WebSocket Database Demo</h1>
      <p>Status: {status}</p>
      <h3>Latest Data from server:</h3>
      <ul>
        <li>Device ID: {serverData.device_id}</li>
        <li>Batch Status: {serverData.device_batch_status ? "Active" : "Inactive"}</li>
        <li>Distance: {serverData.device_distance} km</li>
        <li>Tank Volume: {serverData.device_tank_volume} L</li>
        <li>Timestamp: {serverData.device_timestamp}</li>
        <li>Reset Count: {serverData.reset_count}</li>
      </ul>
    </div>
  );
};

export default WebSocketComponent;