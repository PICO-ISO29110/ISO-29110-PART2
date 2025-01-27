// import React, { useState, useEffect } from 'react';
// import {
//   Box,
//   Button,
//   Typography,
//   Grid,
//   Card,
//   CardContent,
//   CardActions,
//   ToggleButton,
//   ToggleButtonGroup,
//   Badge,
//   Pagination,
// } from '@mui/material';

// const TestServerSideGrid = () => {
//   const [alignment, setAlignment] = useState('web');
//   const [alarms, setAlarms] = useState([]);
//   const [currentPage, setCurrentPage] = useState(1);
//   const [itemsPerPage] = useState(4); // จำนวนรายการต่อหน้า
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);

//   const handleChange = (event, newAlignment) => {
//     setAlignment(newAlignment);
//   };

//   const fetchAlarms = async () => {
//     try {
//       const response = await fetch('http://127.0.0.1:8000/get-device-alarms');
//       if (!response.ok) {
//         throw new Error(`HTTP error! status: ${response.status}`);
//       }
//       const data = await response.json();
//       setAlarms(data.alarms);
//       setLoading(false);
//     } catch (error) {
//       setError(error.message);
//       setLoading(false);
//     }
//   };

//   useEffect(() => {
//     fetchAlarms();
//   }, []);

//   const indexOfLastItem = currentPage * itemsPerPage;
//   const indexOfFirstItem = indexOfLastItem - itemsPerPage;
//   const currentItems = alarms.slice(indexOfFirstItem, indexOfLastItem); // แสดงข้อมูลเฉพาะหน้าปัจจุบัน

//   const handlePageChange = (event, value) => {
//     setCurrentPage(value);
//   };

//   return (
//     <>
//       <ToggleButtonGroup
//         color="primary"
//         value={alignment}
//         exclusive
//         onChange={handleChange}
//         aria-label="Platform"
//       >
//         <Badge badgeContent={4} color="secondary">
//           <ToggleButton value="web">Volume Alarm</ToggleButton>
//         </Badge>
//         <Badge badgeContent={12} color="success">
//           <ToggleButton value="android">Batch Alarm</ToggleButton>
//         </Badge>
//         <Badge badgeContent={1} color="secondary">
//           <ToggleButton value="ios">Level Alarm</ToggleButton>
//         </Badge>
//       </ToggleButtonGroup>

//       <Grid container spacing={2} sx={{ width: '65%', marginTop: 0.1, display : 'block'}}>
//         {currentItems.map((alarm) => (
//           <Grid item xs={12} sm={6} md={4} key={alarm.device_volume_record_id}>
//             <Card>
//               <CardContent>
//                 <Typography gutterBottom variant="h5" component="div">
//                   Alarm Volume
//                 </Typography>
//                 <Typography variant="body2" sx={{ color: 'text.secondary' }}>
//                   {alarm.device_alarm_message}
//                 </Typography>
//               </CardContent>
//               <CardActions sx={{ justifyContent: 'end' }}>
//                 <Button size="small">Dismiss</Button>
//                 <Button size="small">Acknowledge</Button>
//               </CardActions>
//             </Card>
//           </Grid>
//         ))}
//       </Grid>

//       <Box sx={{ display: 'flex', justifyContent: 'start', marginTop: 2 }}>
//         <Pagination
//           count={Math.ceil(alarms.length / itemsPerPage)} // จำนวนหน้าทั้งหมด
//           page={currentPage} // หน้าปัจจุบัน
//           onChange={handlePageChange}
//           color="primary"
//         />
//       </Box>
//     </>
//   );
// };

// export default TestServerSideGrid;






import * as React from 'react';
import Box from '@mui/material/Box';
import { ResponsiveChartContainer } from '@mui/x-charts/ResponsiveChartContainer';
import { LinePlot } from '@mui/x-charts/LineChart';

import { ChartsXAxis } from '@mui/x-charts/ChartsXAxis';
import { ChartsYAxis } from '@mui/x-charts/ChartsYAxis';
import { ChartsReferenceLine } from '@mui/x-charts/ChartsReferenceLine';

const timeData = [
  new Date(2023, 7, 31),
  new Date(2023, 7, 31, 12),
  new Date(2023, 8, 1),
  new Date(2023, 8, 1, 12),
  new Date(2023, 8, 2),
  new Date(2023, 8, 2, 12),
  new Date(2023, 8, 3),
  new Date(2023, 8, 3, 12),
  new Date(2023, 8, 4),
];

const y1 = [5, 5, 10, 90, 85, 70, 30, 25, 25];
const y2 = [90, 85, 70, 25, 23, 40, 45, 40, 50];

const config = {
  series: [
    { type: 'line', data: y1 },
    { type: 'line', data: y2 },
  ],
  height: 400,
  xAxis: [
    {
      data: timeData,
      scaleType: 'time',
      valueFormatter: (date) =>
        date.getHours() === 0
          ? date.toLocaleDateString('fr-FR', {
              month: '2-digit',
              day: '2-digit',
            })
          : date.toLocaleTimeString('fr-FR', {
              hour: '2-digit',
            }),
    },
  ],
};

export default function TestServerSideGrid() {
  return (
    <Box sx={{ width: '100%', maxWidth: 600 }}>
      <ResponsiveChartContainer {...config}>
        <LinePlot />
        <ChartsReferenceLine
          x={new Date(2023, 8, 2, 9)}
          lineStyle={{ strokeDasharray: '10 5' }}
          labelStyle={{ fontSize: '10' }}
          label={`Wake up\n9AM`}
          labelAlign="start"
        />
        <ChartsReferenceLine y={100} label="Middle value" labelAlign="end" />
        <ChartsXAxis />
        <ChartsYAxis />
      </ResponsiveChartContainer>
    </Box>
  );
}
