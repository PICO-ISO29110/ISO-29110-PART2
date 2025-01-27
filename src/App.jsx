import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './template/Login';
import Dashboard from './template/Dashboard';
import Test from './page/Test';
import Batch_Status_MQTT from './api/Batch_Status_MQTT';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/test" element={<Test />} />
        <Route path="/api" element={<Batch_Status_MQTT />} />
      </Routes>
    </Router>
  );
}

export default App;