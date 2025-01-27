import React from 'react'
import Breadcrumb from '../component/Breadcrumb'
import Typography from '@mui/material/Typography';
import { Divider ,Chip ,Skeleton , Stack , Box, Button , TextField} from '@mui/material';
import CardLineChart from '../component/tankhistory/CardLineChart';
import CardPieChart from '../component/tankhistory/CardPieChart';
import FilterAltIcon from '@mui/icons-material/FilterAlt';
import GetAppIcon from '@mui/icons-material/GetApp';
import DataTable from '../component/tankhistory/DataTable';
import BarChartHistory from '../component/dashboard/BarChartHistory';
import Tank_Volume_MQTT from '../api/Tank_Volume_MQTT';

const TankHistory = () => {
  return (
    <>

    
    <Breadcrumb  breadUrl = '/TankHistory' />
    <Typography variant="h5" gutterBottom sx={{marginTop : 2}}>
    TankHistory
      </Typography>

      {/* <Typography variant="h5" gutterBottom sx={{ display: 'flex', justifyContent: 'center', fontWeight: 'bold' }}>
  Tank Data
</Typography> */}

<Divider sx={{marginTop : 2 , marginBottom : 2 ,  width:'100%',}}>
        <Chip label=" Tank Data" size="small" />
      </Divider>
<Box sx={{    display: 'flex', 
    flexWrap: 'wrap', }}>
<Tank_Volume_MQTT>
<CardLineChart headerFilter = 'Filter Realtime Line Chart' title ='Realtime Line Chart'/>
</Tank_Volume_MQTT>
<CardPieChart headerFilter = 'Filter Pie Chart' title ='Pie Chart (Per Week)'/>
</Box>

<Divider sx={{marginTop : 2 , marginBottom : 2 ,  width:'100%',}}>
        <Chip label=" Tank Raw Data History" size="small" />
      </Divider>
  <DataTable />
  


    </>
    
  )
}

export default TankHistory