import React, { useEffect ,useRef ,useState } from 'react';
import { Button ,Box  ,Typography ,Modal ,Divider ,Stack   } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import BroadcastOnPersonalOutlinedIcon from '@mui/icons-material/BroadcastOnPersonalOutlined';
import WatchLaterOutlinedIcon from '@mui/icons-material/WatchLaterOutlined';
// import { SparkLineChart } from '@mui/x-charts/SparkLineChart';
import PowerSettingsNewOutlinedIcon from '@mui/icons-material/PowerSettingsNewOutlined';
import { LineChart } from '@mui/x-charts/LineChart';
import html2canvas from 'html2canvas';



const Report = ({ id, openpopup, closePopup }) => {
     const anchorRef = useRef(null);
      const theme = useTheme();
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  
  const handleClose = () => setOpen(false);
  const [batchid , setBatchid] = useState();
  const [batch_id , setBatch_id] = useState();
  const [batchStartTime , setBatchStartTime] = useState();
  const [batchStartVolume , setBatchStartVolume] = useState();
  const [batchStopTime , setBatchStopTime] = useState();
  const [batchStopVolume , setBatchStopVolume] = useState();


  
  const [batchDuration , setBatchDuration] = useState();
  const [batchVolume , setBatchVolume] = useState();
  const [batchData , setBatchData] = useState([]);

console.log(id ,openpopup)
  useEffect(() => {
    setOpen(openpopup)
    setBatchid(id)

  })

  const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 1500,
    bgcolor: 'background.paper',
    // border: 'px solid #000',
    
    p: 2,
  };

  useEffect(() => {
    // setOpen()
  })


  const calculateDuration = (start, stop) => {
    const startTime = new Date(start);
    const stopTime = new Date(stop);

    const diffInSeconds = Math.floor((stopTime - startTime) / 1000);

    const hours = Math.floor(diffInSeconds / 3600);
    const minutes = Math.floor((diffInSeconds % 3600) / 60);
    const seconds = diffInSeconds % 60;

    return `${String(hours).padStart(2, "0")}:${String(minutes).padStart(2, "0")}:${String(seconds).padStart(2, "0")}`;
  };

  useEffect(() => {
    if (batchStartTime && batchStopTime) {

      // console.log(batchStartTime +'---------' +batchStopTime)
      setBatchDuration(calculateDuration(batchStartTime ,batchStopTime));
    }
  }, [batchStartTime, batchStopTime]);



  const distance = batchData.map(item => item.device_distance);
  const volume = batchData.map(item => item.device_tank_volume);
  const timestamp = batchData.map(item => item.device_timestamp);


  // console.log(timestamp)


  const uData = distance
const pData = volume
const xLabels = timestamp



useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("http://100.82.151.125:8000/Get_report_by_id", {
          method: "POST",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            ReportId: batchid,
          }),
        });
  
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
  
        const dataapi = await response.json();
        console.log("API Response:", dataapi);
  
        if (!dataapi.alarms || dataapi.alarms.length === 0) {
          console.error("Error: No alarms data found.");
          return;
        }
  
        setBatch_id(dataapi.alarms[0]?.device_batch_id || "N/A");
        setBatchStartTime(dataapi.alarms[0]?.device_batch_start_time || "N/A");
        setBatchStartVolume(dataapi.alarms[0]?.device_batch_start_volume || 0);
        setBatchStopTime(dataapi.alarms[0]?.device_batch_end_time || "N/A");
        setBatchStopVolume(dataapi.alarms[0]?.device_batch_end_volume || 0);
        setBatchVolume(dataapi.alarms[0]?.device_batch_value || 0);
        setBatchData(dataapi.data || []);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
  
    if (batchid) {
      fetchData();
    }
  }, [batchid]); // เพิ่ม dependency array ให้ useEffect ทำงานเมื่อ batchid เปลี่ยนค่า



    const handlepng = () => {
      const element = document.getElementById('capture'); // เลือก Element ที่ต้องการจะจับภาพ
      if (element) {
        html2canvas(element).then((canvas) => {
          const link = document.createElement('a');
          link.href = canvas.toDataURL('image/png');
          link.download = 'report.png';
          link.click();
        });
      }
    };



  return (
    <>


    {/* popup */}
    <Modal
        open={open}
        onClose={closePopup}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        
        <Box sx={style}>
          <Box sx={{display:'flex' , justifyContent : 'space-between' ,marginBottom : 2}}>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            Batch Viewer
          </Typography>
          <Button onClick = {handlepng} variant="outlined"> Generate Report To PDF</Button>
          </Box>
        <Divider sx={{marginBottom : 2}}/>
          
        <div id="capture">
          <Box sx={{display:'flex'}}>
          <Box 
        variant="rectangular" 
        sx={{
          width: { xs: '100%', md: '46%', lg: '23.8%' },
          height: 220,
          borderRadius: 3,
          margin: 1,
          backgroundColor: theme.palette.background.paper, // ใช้สีจากธีม
          border: '1px solid',
          borderColor: 'grey.300',
        }} 
      >

        <Box sx={{display:'flex' , justifyContent :'space-between'}}>
        <Box sx={{ display: 'flex', padding: 1 }} ref={anchorRef}>
          {/* <BroadcastOnPersonalOutlinedIcon fontSize="large" /> */}
          <Typography variant="h7" sx={{ fontWeight: '700', padding: 1 }}>
            Batch Number ID
          </Typography>
        </Box>
        <Box sx={{padding : 1 , marginTop :2}}>
<Typography fontSize="12px" sx={{ marginLeft: 1, fontWeight: 'Bold', display: 'flex', alignItems: 'center' }}>
  <Box
    sx={{
      width: 10,
      height: 10,
      borderRadius: '50%',
      marginRight: 1,
      
      animation: 'blink 1s infinite',
      '@keyframes blink': {
        '0%': { opacity: 1 },
        '50%': { opacity: 0 },
        '100%': { opacity: 1 },
      },
    }}
  />
    </Typography>
</Box>
        </Box>


       

        <Divider />
{/*         
        <Box sx={{ display: 'flex', padding: 0, cursor: 'pointer', width: '100%', color: '#e5e5e5', justifyContent: 'center' }}>
        <Typography sx={{ fontWeight: '700', padding: 1 ,fontSize :15}}>
            Batch ID Number 
          </Typography> 
        </Box> */}

        <Box sx={{ display: 'flex', padding: 0, cursor: 'pointer', width: '100%',  justifyContent: 'center' }}>
        <Typography variant= 'h3' sx={{ fontWeight: '700', paddingTop: 5 }}>
            {batch_id}
          </Typography> 
        </Box>



        <Box 
          sx={{ 
            display: 'flex', 
            justifyContent: 'center', 
            alignItems: 'center', 
            height: 150 
          }}
        >
          {
          // batch_status.batch_power 
          'sad'
           ? (
          
        <Typography
          fontSize="60px"
          sx={{ marginLeft: 1, fontWeight: "bold" }}
        >
          {/* {batch_status.batch_power} */}
        </Typography>
      ) : (
        <CircularProgress sx={{ marginLeft: 1 }} />
      )}
        </Box>

           
      </Box>

      <Box 
        variant="rectangular" 
        sx={{
          width: { xs: '100%', md: '46%', lg: '23.8%' },
          height: 220,
          borderRadius: 3,
          margin: 1,
          backgroundColor: theme.palette.background.paper, // ใช้สีจากธีม
          border: '1px solid',
          borderColor: 'grey.300',
        }} 
      >

        <Box sx={{display:'flex' , justifyContent :'space-between'}}>
        <Box sx={{ display: 'flex', padding: 1 }} ref={anchorRef}>
          {/* <BroadcastOnPersonalOutlinedIcon fontSize="large" /> */}
          <Typography variant="h7" sx={{ fontWeight: '700', padding: 1 }}>
            Batch Start
          </Typography>
        </Box>
        <Box sx={{padding : 1 , marginTop :2}}>
<Typography fontSize="12px" sx={{ marginLeft: 1, fontWeight: 'Bold', display: 'flex', alignItems: 'center' }}>
  <Box
    sx={{
      width: 10,
      height: 10,
      borderRadius: '50%',
      marginRight: 1,
      
      animation: 'blink 1s infinite',
      '@keyframes blink': {
        '0%': { opacity: 1 },
        '50%': { opacity: 0 },
        '100%': { opacity: 1 },
      },
    }}
  />
    </Typography>
</Box>
        </Box>


       

        <Divider />


        <Box>
        <Box sx={{ display: 'flex', paddingLeft: 2 ,paddingTop : 2 , cursor: 'pointer', width: '100%', color: '#b2b2b2', justifyContent: 'start' }}>
          Batch Start Time   
        </Box>
        <Typography variant="h5" sx={{ fontWeight: '700', paddingLeft: 3 }}>
           {batchStartTime}
          </Typography>
        </Box>

        <Box>
        <Box sx={{ display: 'flex', paddingLeft: 2 ,paddingTop : 1 , cursor: 'pointer', width: '100%', color: '#b2b2b2', justifyContent: 'start' }}>
          Batch Start Volume   
        </Box>
        <Typography variant="h5" sx={{ fontWeight: '700', paddingLeft: 3 }}>
           {batchStartVolume}
          </Typography>
        </Box>


        <Box 
          sx={{ 
            display: 'flex', 
            justifyContent: 'center', 
            alignItems: 'center', 
            height: 150 
          }}
        >
          {
          // batch_status.batch_power 
          'sad'
           ? (
          
        <Typography
          fontSize="60px"
          sx={{ marginLeft: 1, fontWeight: "bold" }}
        >
          {/* {batch_status.batch_power} */}
        </Typography>
      ) : (
        <CircularProgress sx={{ marginLeft: 1 }} />
      )}
        </Box>

           
      </Box>

      <Box 
        variant="rectangular" 
        sx={{
          width: { xs: '100%', md: '46%', lg: '23.8%' },
          height: 220,
          borderRadius: 3,
          margin: 1,
          backgroundColor: theme.palette.background.paper, // ใช้สีจากธีม
          border: '1px solid',
          borderColor: 'grey.300',
        }} 
      >

        <Box sx={{display:'flex' , justifyContent :'space-between'}}>
        <Box sx={{ display: 'flex', padding: 1 }} ref={anchorRef}>
          {/* <BroadcastOnPersonalOutlinedIcon fontSize="large" /> */}
          <Typography variant="h7" sx={{ fontWeight: '700', padding: 1 }}>
            Batch Stop
          </Typography>
        </Box>
        <Box sx={{padding : 1 , marginTop :2}}>
<Typography fontSize="12px" sx={{ marginLeft: 1, fontWeight: 'Bold', display: 'flex', alignItems: 'center' }}>
  <Box
    sx={{
      width: 10,
      height: 10,
      borderRadius: '50%',
      marginRight: 1,
      
      animation: 'blink 1s infinite',
      '@keyframes blink': {
        '0%': { opacity: 1 },
        '50%': { opacity: 0 },
        '100%': { opacity: 1 },
      },
    }}
  />
    </Typography>
</Box>
        </Box>


       

        <Divider />

        <Box>
        <Box sx={{ display: 'flex', paddingLeft: 2 ,paddingTop : 2 , cursor: 'pointer', width: '100%', color: '#b2b2b2', justifyContent: 'start' }}>
          Batch Start Time   
        </Box>
        <Typography variant="h5" sx={{ fontWeight: '700', paddingLeft: 3 }}>
           {batchStopTime}
          </Typography>
        </Box>

        <Box>
        <Box sx={{ display: 'flex', paddingLeft: 2 ,paddingTop : 1 , cursor: 'pointer', width: '100%', color: '#b2b2b2', justifyContent: 'start' }}>
          Batch Start Volume   
        </Box>
        <Typography variant="h5" sx={{ fontWeight: '700', paddingLeft: 3 }}>
           {batchStopVolume}
          </Typography>
        </Box>


        <Box 
          sx={{ 
            display: 'flex', 
            justifyContent: 'center', 
            alignItems: 'center', 
            height: 150 
          }}
        >
          {
          // batch_status.batch_power 
          'sad'
           ? (
          
        <Typography
          fontSize="60px"
          sx={{ marginLeft: 1, fontWeight: "bold" }}
        >
          {/* {batch_status.batch_power} */}
        </Typography>
      ) : (
        <CircularProgress sx={{ marginLeft: 1 }} />
      )}
        </Box>

           
      </Box>



      <Box 
        variant="rectangular" 
        sx={{
          width: { xs: '100%', md: '46%', lg: '23.8%' },
          height: 220,
          borderRadius: 3,
          margin: 1,
          backgroundColor: theme.palette.background.paper, // ใช้สีจากธีม
          border: '1px solid',
          borderColor: 'grey.300',
        }} 
      >





        <Box sx={{display:'flex' , justifyContent :'space-between'}}>
        <Box sx={{ display: 'flex', padding: 1 }} ref={anchorRef}>
          {/* <BroadcastOnPersonalOutlinedIcon fontSize="large" /> */}
          <Typography variant="h7" sx={{ fontWeight: '700', padding: 1 }}>
            Batch Duration
          </Typography>
        </Box>
        <Box sx={{padding : 1 , marginTop :2}}>
<Typography fontSize="12px" sx={{ marginLeft: 1, fontWeight: 'Bold', display: 'flex', alignItems: 'center' }}>
  <Box
    sx={{
      width: 10,
      height: 10,
      borderRadius: '50%',
      marginRight: 1,
      
      animation: 'blink 1s infinite',
      '@keyframes blink': {
        '0%': { opacity: 1 },
        '50%': { opacity: 0 },
        '100%': { opacity: 1 },
      },
    }}
  />
    </Typography>
</Box>
        </Box>

        <Divider />
        
        <Box sx={{ display: 'flex', padding: 1, cursor: 'pointer', width: '100%', color: '#b2b2b2', justifyContent: 'end' }} >
        Unit : Time
        </Box>

        <Box sx={{display :'flex' , justifyContent : 'center'}}>
        <Typography variant= 'h3' sx={{ fontWeight: '700', }}>
           {batchDuration }
          </Typography> 
          </Box>
        <Box 
          sx={{ 
            display: 'flex', 
            justifyContent: 'center', 
            alignItems: 'center', 
            height: 150 
          }}
        >
          {
          // batch_status.batch_power 
          'sad'
           ? (
          
        <Typography
          fontSize="60px"
          sx={{ marginLeft: 1, fontWeight: "bold" }}
        >
          {/* {batch_status.batch_power} */}
        </Typography>
      ) : (
        <CircularProgress sx={{ marginLeft: 1 }} />
      )}
        </Box>

           
      </Box>



      
      <Box 
        variant="rectangular" 
        sx={{
          width: { xs: '100%', md: '46%', lg: '23.8%' },
          height: 220,
          borderRadius: 3,
          margin: 1,
          backgroundColor: theme.palette.background.paper, // ใช้สีจากธีม
          border: '1px solid',
          borderColor: 'grey.300',
        }} 
      >

        <Box sx={{display:'flex' , justifyContent :'space-between'}}>
        <Box sx={{ display: 'flex', padding: 1 }} ref={anchorRef}>
          {/* <BroadcastOnPersonalOutlinedIcon fontSize="large" /> */}
          <Typography variant="h7" sx={{ fontWeight: '700', padding: 1 }}>
            Batch Volume Total
          </Typography>
        </Box>
        <Box sx={{padding : 1 , marginTop :2}}>
<Typography fontSize="12px" sx={{ marginLeft: 1, fontWeight: 'Bold', display: 'flex', alignItems: 'center' }}>
  <Box
    sx={{
      width: 10,
      height: 10,
      borderRadius: '50%',
      marginRight: 1,
      
      animation: 'blink 1s infinite',
      '@keyframes blink': {
        '0%': { opacity: 1 },
        '50%': { opacity: 0 },
        '100%': { opacity: 1 },
      },
    }}
  />
    </Typography>
</Box>
        </Box>

        <Divider />
        
        <Box sx={{ display: 'flex', padding: 1, cursor: 'pointer', width: '100%', color: '#b2b2b2', justifyContent: 'end' }} >
        Unit : Liter
        </Box>

        <Box sx={{display :'flex' , justifyContent : 'center'}}>
        <Typography variant= 'h3' sx={{ fontWeight: '700', }}>
           {batchVolume}
          </Typography> 
          </Box>

        <Box 
          sx={{ 
            display: 'flex', 
            justifyContent: 'center', 
            alignItems: 'center', 
            height: 150 
          }}
        >
          {
          // batch_status.batch_power 
          'sad'
           ? (
          
        <Typography
          fontSize="60px"
          sx={{ marginLeft: 1, fontWeight: "bold" }}
        >
          {/* {batch_status.batch_power} */}
        </Typography>
      ) : (
        <CircularProgress sx={{ marginLeft: 1 }} />
      )}
        </Box>

           
      </Box>


      </Box>

    <Box  sx={{
          width: { xs: '100%', md: '46%', lg: '99%' },
          height: 400,
          borderRadius: 3,
          margin: 1,
          backgroundColor: theme.palette.background.paper, // ใช้สีจากธีม
          border: '1px solid',
          borderColor: 'grey.300',
          p:2  }}>
    
    <LineChart
      width= '1500'
      height={400}
      series={[
        { data: pData, label: 'Volume' , showMark: false,},
        { data: uData, label: 'Distance', showMark: false, },
      ]}
      xAxis={[{ scaleType: 'point', data: xLabels }]}
    />

    </Box>
    </div>
        </Box>
 



      </Modal>
    </>
  );
};

export default Report;