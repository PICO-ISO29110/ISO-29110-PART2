import React from 'react'
import Breadcrumb from '../component/Breadcrumb'
import Typography from '@mui/material/Typography';
import { Divider ,Chip ,Skeleton , Stack , Box} from '@mui/material';
import TabEvent from '../component/event/TabEvent';

const Event = () => {
  return (
    <>
    <Breadcrumb breadUrl = '/Event'/>
    <Typography variant="h5" gutterBottom sx={{marginTop : 2}}>
    Event
      </Typography>

      <Divider sx={{marginTop : 2 , marginBottom : 2 ,  width: '100%',}}>
        <Chip label="Alarm & System Event" size="small" />
      </Divider>


<Box>
<TabEvent />
</Box>

    </>
  )
}

export default Event