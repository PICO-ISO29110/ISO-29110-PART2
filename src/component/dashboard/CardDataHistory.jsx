import React, { useState, useRef , useEffect , useContext} from 'react';
import { Box, Typography, Divider, Button, Popper, Paper, Select, MenuItem, TextField, Stack, RadioGroup, FormControlLabel, Radio ,CircularProgress} from '@mui/material';
import BroadcastOnPersonalOutlinedIcon from '@mui/icons-material/BroadcastOnPersonalOutlined';
import WatchLaterOutlinedIcon from '@mui/icons-material/WatchLaterOutlined';
import { SparkLineChart } from '@mui/x-charts/SparkLineChart';
import Battery20OutlinedIcon from '@mui/icons-material/Battery20Outlined';
import TimelineOutlinedIcon from '@mui/icons-material/TimelineOutlined';
import { useTheme } from '@mui/material/styles';
import mqtt from "mqtt";
import { TankDataContext } from '../../api/Tank_Volume_MQTT';

const icons = {
    BroadcastOnPersonalOutlinedIcon: BroadcastOnPersonalOutlinedIcon,
    WatchLaterOutlinedIcon: WatchLaterOutlinedIcon,
    Battery20OutlinedIcon: Battery20OutlinedIcon ,
    TimelineOutlinedIcon: TimelineOutlinedIcon
  };


const CardDataHistory = ({seticon ,headerFilter , title }) => {
  const { data_tank , historicalData} = useContext(TankDataContext);
  const [lastUpdated, setLastUpdated] = useState("");
    const [open, setOpen] = useState(false);
  const [filterType, setFilterType] = useState('realtime');
  const [lastDuration, setLastDuration] = useState('30min');
  const [startTime, setStartTime] = useState(null);
  const [stopTime, setStopTime] = useState(null);
  const [interval, setInterval] = useState("today");
  const [samplingInterval, setSamplingInterval] = useState('5sec');
  const [queryData ,setQueryData] = useState({
    filterType: "interval",
    data: "today",
    samplingInterval: "30min"
  })

  // console.log(queryData)
  // console.log(seticon)
  const anchorRef = useRef(null);
  const CardIcon = typeof seticon === 'string' ? icons[seticon] || WatchLaterOutlinedIcon : WatchLaterOutlinedIcon;

//   console.log('Icon name:', seticon, '| Icon component:', CardIcon);
// console.log('name', typeof seticon, 'icon', seticon ,);
const theme = useTheme();


    useEffect(() => {
      // ฟังก์ชันจะทำงานเมื่อ batch_status เปลี่ยนแปลง
      const currentTime = new Date().toLocaleTimeString(); // แปลงเวลาปัจจุบันเป็นข้อความ (รูปแบบ HH:MM:SS)
      setLastUpdated(currentTime); // อัปเดตเวลาใน state
    }, [data_tank]); // ใช้ batch_status เป็น dependency



  return (
    <>
      <Box 
        variant="rectangular" 
        sx={{
          width: { xs: '100%', md: '46%', lg: '23.8%' },
          height: 310,
          borderRadius: 3,
          margin: 1,
          backgroundColor: theme.palette.background.paper,
          border: '1px solid',
          borderColor: 'grey.300',
        }} 
      >
        <Box sx={{ display: 'flex', padding: 1 }} ref={anchorRef}>
          <CardIcon fontSize="large" />
          <Typography variant="h7" sx={{ fontWeight: '700', padding: 1 }}>
            {title}
          </Typography>
        </Box>
        <Divider />
        
        <Box sx={{ display: 'flex', padding: 1, cursor: 'pointer', width: '100%', color: '#e5e5e5' }} onClick={() => setOpen((prev) => !prev)}>
          <WatchLaterOutlinedIcon fontSize="small" />
          <Typography fontSize="12px" sx={{ marginLeft: 1, fontWeight: 'Bold' }}>
            Time Filter : {filterType}
          </Typography>
        </Box>

       <Box  sx={{ 
                   display: 'flex', 
                   justifyContent: 'center', 
                   alignItems: 'center', 
                   height: 112 
                 }}>
          <Typography fontSize="60px" sx={{ marginLeft: 1, fontWeight: 'Bold' }}>
            {data_tank}
          </Typography>
        </Box>

        <Stack direction="row" sx={{ display: 'block', width: '100%', paddingLeft: 3, paddingTop: 3 }}>
        <Box sx={{ flexGrow: 1 }}>
          <SparkLineChart
            data={historicalData.map(item => item.value)} // Pass only the value array
            xAxis={{
              scaleType: 'linear',
              data: historicalData.map(item => item.timestamp), // Pass timestamps
              valueFormatter: (value) => value.toISOString().slice(11, 19), // แสดงเฉพาะเวลา HH:MM:SS
            }}
            height={40}
            showTooltip
            showHighlight
          />
        </Box>
        <Typography fontSize="12px" sx={{ fontWeight: 'Bold', marginTop: 1, color: '#e5e5e5' }}>
          Last Update : {lastUpdated}
        </Typography>
      </Stack>
      </Box>

      {/* Popper for Filter Options */}
      <Popper open={open} anchorEl={anchorRef.current} placement="bottom-start" sx={{ zIndex: 1 }}>
        <Paper sx={{ padding: 2, width: '350' ,  marginLeft : { xs: '0px', md: '80px', lg: '80px' } , marginTop : '30px'}}>
          <Typography variant="h6">{headerFilter}</Typography>
          
           <RadioGroup value={filterType} onChange={(e) => setFilterType(e.target.value)}>
                      <FormControlLabel value="realtime" control={<Radio />} label="Realtime" />
           
          
                    </RadioGroup>
          
                    <Typography fontSize="12px" sx={{ fontWeight: 'Bold', marginTop: 1 }}>Every</Typography>
                    <Select
                      value={samplingInterval}
                      onChange={(e) => setSamplingInterval(e.target.value)}
                      fullWidth
                      sx={{ mt: 1 }}
                      disabled
                    >
                      <MenuItem value={'5sec'}>5 Sec</MenuItem>
                    </Select>
          
                    <Box sx={{ display: 'flex', justifyContent: 'flex-end', marginTop: 2 }}>
                      <Button onClick={() => setOpen(false)}>Cancel</Button>
                      <Button
                        onClick={() => {
                          if (filterType === 'last') {
                            const result = {
                              filterType: filterType,
                              data: lastDuration,
                              samplingInterval: samplingInterval
                            };
                            setQueryData(result)
                            console.log(result);  
                          } else if (filterType === 'period') {
                            const result = {
                              filterType: filterType,
                              data: `${startTime} to ${stopTime}`,
                              startTime :startTime ,
                              stoptime :stopTime,
                              samplingInterval: samplingInterval
                            };
                            setQueryData(result)
                            console.log(result);  
                          } else if (filterType === 'interval') {
                            const result = {
                              filterType: filterType,
                              data: interval,
                              samplingInterval: samplingInterval
                            };
                            setQueryData(result)
                            console.log(result);  
                          }
                          setOpen(false);
                        }}
                        variant="contained"
                        sx={{ marginLeft: 1 }}
                      >
                        Apply
                      </Button>
                    </Box>
                  </Paper>
                </Popper>
    </>
  )
}

export default CardDataHistory