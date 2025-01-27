import React from 'react'
import Breadcrumb from '../component/Breadcrumb'
import Typography from '@mui/material/Typography';
import { BarChart } from '@mui/x-charts/BarChart';
import Skeleton from '@mui/material/Skeleton';
import Stack from '@mui/material/Stack';
import CardDataHistory from '../component/dashboard/CardDataHistory';
import CardStatus from '../component/dashboard/CardStatus';
import CardTimeStatus from '../component/dashboard/CardTimeStatus';
import BarChartHistory from '../component/dashboard/BarChartHistory';
import Tankbeer from '../component/dashboard/TankBeerMonitering';
import CardDataHistoryBatch from '../component/dashboard/CardDataHistoryBatch';
import { useState } from 'react';
import Tank_Volume_MQTT from '../api/Tank_Volume_MQTT';
import Batch_Status_MQTT from '../api/Batch_Status_MQTT';
const Dashboard = () => {
 
  // console.log(tankVolume)
  return (
    <>
      <Breadcrumb breadUrl='/Dashboard'/>
      <Typography variant="h5" gutterBottom sx={{marginTop : 2}}>
        Dashboard
      </Typography>
      <Stack direction="row" flexWrap="wrap" style={{}}>

<Batch_Status_MQTT>
  <CardStatus />
  <CardTimeStatus />
<CardDataHistoryBatch seticon = 'TimelineOutlinedIcon' headerFilter ='Batch Volume Filter' title = 'Batch Volume'/>
</Batch_Status_MQTT>

  <Tank_Volume_MQTT>
  <CardDataHistory seticon = 'Battery20OutlinedIcon' headerFilter ='Tank Balance Filter' title = 'Tank Balance' />
  </Tank_Volume_MQTT>
 

</Stack>

<Stack direction="row" flexWrap="wrap" >
  <BarChartHistory headerFilter ='Batch Consumption Filter' title = 'Batch Consumption (Batch Per Day)'/>
  <Tank_Volume_MQTT>
  <Tankbeer/>
  </Tank_Volume_MQTT>
</Stack>
      
    </>
  )
}

export default Dashboard;
