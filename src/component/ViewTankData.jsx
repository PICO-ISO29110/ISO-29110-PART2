import React, { useState } from 'react';
import { Box, Button, Typography, Modal, Divider, TextField ,FormControl ,InputLabel ,Select ,MenuItem  } from '@mui/material';
import { LineChart } from '@mui/x-charts/LineChart';
import { useTheme } from '@mui/material/styles';
import html2canvas from 'html2canvas'; // สำหรับการแปลงกราฟเป็นภาพ
import Papa from 'papaparse'; // สำหรับการแปลงข้อมูลเป็น CSV
import { toast , ToastContainer } from 'react-toastify';
import RemoveRedEyeIcon from '@mui/icons-material/RemoveRedEye';
import RestoreIcon from '@mui/icons-material/Restore';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: {
    xs: '90%', // ความกว้าง 90% สำหรับหน้าจอเล็ก
    sm: '80%', // ความกว้าง 80% สำหรับหน้าจอกลาง
    md: 1200,  // ความกว้างคงที่สำหรับหน้าจอใหญ่
  },
  bgcolor: 'background.paper',
  height: {
    xs: '80vh', // ปรับความสูงสัมพันธ์หน้าจอ
    sm: '85vh',
    md: 700,    // ความสูงคงที่สำหรับหน้าจอใหญ่
  },
  p: 4,
};



const uData = [4000, 3000, 2000, 2780, 1890, 2390, 3490];
const pData = [2400, 1398, 9800, 3908, 4800, 3800, 4300];
const xLabels = [
  'Page A',
  'Page B',
  'Page C',
  'Page D',
  'Page E',
  'Page F',
  'Page G',
];




const ViewTankData = () => {
  const [open, setOpen] = useState(false);
  const [startTime, setStartTime] = useState(null);
  const [stopTime, setStopTime] = useState(null);
  const theme = useTheme();
  const [xAxisData , setxAxisData] = useState([]);
  const [seriesData , setseriesData] = useState([]);
  const [every , setEvery] = useState('30');
  const handleOpen = () => setOpen(true);

  const handleClose = () => {
    setOpen(false); // ปิด modal หรือ state อื่นๆ
    setxAxisData([]); // เซ็ต xAxisData เป็น array ว่าง
    setseriesData([]); 
  };

  // ฟังก์ชัน Export ข้อมูลเป็น CSV


  // ฟังก์ชัน Export กราฟเป็นรูปภาพ
  const exportChartAsImage = () => {
    html2canvas(document.querySelector("#line-chart")).then((canvas) => {
      const img = canvas.toDataURL('image/png');
      const link = document.createElement('a');
      link.href = img;
      link.download = 'chart.png';
      link.click();
    });
  };


  const FetchDataTankHistory = async (startTime , stopTime ,every) => {

                toast.loading("Plese Wiate Data...", {
                  toastId: "123", // ตั้ง ID ให้กับ Toast
                  autoClose: false, // ปิดการปิด Toast อัตโนมัติ
                  closeOnClick: false, // ปิดเมื่อคลิก
                  draggable: false, // ปิดการลาก
                });

    try {
      const response = await fetch('http://100.82.151.125:8000/get_tank_data/', {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          "startTime": startTime,
          "stopTime": stopTime,
          "every": every

        }),
      });
  
      if (response.ok) {
        const data = await response.json();
        console.log("data:", data);
        
        const xAxisData = data.AlarmData.map(item => item.device_timestamp);
        const seriesData = data.AlarmData.map(item => item.device_tank_volume);
        setxAxisData(xAxisData)
        setseriesData(seriesData)

        // setTankData()
        toast.dismiss("123");
      } else {
        // console.error("Error fetching user data:", response.statusText);
      }
    } catch (error) {
      console.error("Error:", error);
    }
  
  };

  const exportDataToCSV = () => {
    if (xAxisData.length === 0 || seriesData.length === 0) {
      toast.error("No data available to export!");
      return;
    }
  
    const formattedData = xAxisData.map((date, index) => ({
      date,
      value: seriesData[index],
    }));
  
    const csv = Papa.unparse(formattedData);
    const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = 'data.csv';
    link.click();
  };

  return (
<>
      <RemoveRedEyeIcon fontSize='small' onClick={handleOpen} sx={{cursor : 'pointer', marginTop : 1}}/>
      {/* <Button onClick={handleOpen}>Open modal</Button> */}
      
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Box sx={{ marginLeft: 2  , display :'flex' , justifyContent : 'space-between'}}>
            <Box >
            <Typography variant="h4" gutterBottom>
              Line Chart
            </Typography>

            </Box>
            <Box>

            <Box sx={{ display: 'flex', justifyContent: 'flex-start', marginBottom: 2 }}>
            <Button variant="outlined" onClick={exportDataToCSV} sx={{ marginRight: 2 }}>
              Export Data as CSV
            </Button>
            <Button variant="outlined" onClick={exportChartAsImage}>
              Export Chart as Image
            </Button>

          </Box>
            </Box>
          </Box>
          <Divider sx={{ marginBottom: 2 }} />


          <Box sx={{ display: 'flex' }}>
            <Box sx={{ margin: 2, width: '21%', height: '100%' }}>
              <Box sx={{ display: 'flex', flexDirection: 'column', paddingRight: 1, width: 200 }}>
                <TextField
                  sx={{ marginBottom: 2 }}
                  id="outlined-start-time"
                  label="Start Date"
                  type="datetime-local"
                  value={startTime}
                  onChange={(e) => setStartTime(e.target.value)}
                  slotProps={{
                    inputLabel: {
                      shrink: true,
                    },
                  }}
                />
                <TextField
                  sx={{ marginTop: 2 }}
                  id="outlined-stop-time"
                  label="Stop Date"
                  type="datetime-local"
                  value={stopTime}
                  onChange={(e) => setStopTime(e.target.value)}
                  slotProps={{
                    inputLabel: {
                      shrink: true,
                    },
                  }}
                />
<Divider sx={{marginTop : 2}}/>
                 <FormControl fullWidth variant="outlined" sx={{marginTop : 2}}>
              <InputLabel id="permission-label">Every</InputLabel>
              <Select
                labelId="permission-label"
                id="permission-select"
              
                label="Every"
                value={every}
                onChange={(e) => setEvery(e.target.value)}
              >
                <MenuItem value="5">5 min</MenuItem>
                <MenuItem value="30">30 min</MenuItem>
                <MenuItem value="60">60 min</MenuItem>
              </Select>
            </FormControl>



<Button onClick={() => FetchDataTankHistory(startTime, stopTime ,every)} variant='contained' sx={{marginTop:2}}>Apply</Button>

              </Box>
            </Box>

            <Box
              sx={{
                margin: 2,
                width: '100%',
                height: '100%',
                borderRadius: 3,
                margin: 1,
                backgroundColor: theme.palette.background.paper,
                border: '1px solid',
                borderColor: 'grey.300',
              }}
            >
              <div id="line-chart">
              <LineChart
  sx={{ width: '100%' }}
  height={560}
      series={[
        { data: seriesData, label: 'value' , showMark: false,},
      ]}
      xAxis={[{ scaleType: 'point', data: xAxisData }]}
      
    />
              </div>
            </Box>
          </Box>
        </Box>
      </Modal>
      <ToastContainer />
      </>

  );
};

export default ViewTankData;
