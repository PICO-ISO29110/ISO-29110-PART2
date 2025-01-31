import React from 'react'
import Breadcrumb from '../component/Breadcrumb'
import Typography from '@mui/material/Typography';
import { Divider ,Chip ,Skeleton , Stack , Box} from '@mui/material';
import DataTable from '../component/batchHistory/DataTable';

const BatchHistory = () => {
  return (
    <>
    <Breadcrumb breadUrl = '/BatchHistory'/>

      <Typography variant="h5" gutterBottom sx={{marginTop : 2}}>
        BatchHistory
      </Typography>


<Divider sx={{marginTop : 2 , marginBottom : 2 ,}}>
        <Chip label="Batch History Data" size="small" />
      </Divider>

<Box >
<DataTable />
</Box>
    </>
  )
}

export default BatchHistory