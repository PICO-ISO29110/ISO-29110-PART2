import React from 'react'
import Breadcrumb from '../component/Breadcrumb'
import Typography from '@mui/material/Typography';
import { Divider ,Chip ,Skeleton , Stack , Box} from '@mui/material';
import TabEvent from '../component/configuration/TabEvent';
const Configuration = () => {
  return (
    <>
    <Breadcrumb breadUrl = '/Configuration'/>
    <Typography variant="h5" gutterBottom sx={{marginTop : 2}}>
    Configuration
      </Typography>

      <Divider sx={{marginTop : 2 , marginBottom : 2}}>
        <Chip label="Admin Configuration" size="small" />
      </Divider>


<TabEvent/>

    </>
  )
}

export default Configuration