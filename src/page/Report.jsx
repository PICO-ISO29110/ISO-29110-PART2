import React from 'react'
import Breadcrumb from '../component/Breadcrumb'
import Typography from '@mui/material/Typography';
import { Divider ,Chip ,Skeleton , Stack , Box} from '@mui/material';
import DataTable from '../component/report/DataTable';

const Report = () => {
  return (
    <>
    <Breadcrumb breadUrl = '/Report'/>
    <Typography variant="h5" gutterBottom sx={{marginTop : 2}}>
    Report
      </Typography>

      
<Divider sx={{marginTop : 2 , marginBottom : 2 ,  width: '100%',}}>
        <Chip label="Report Management" size="small" />
      </Divider>

<Box>
<DataTable />
</Box>


    </>
  )
}

export default Report