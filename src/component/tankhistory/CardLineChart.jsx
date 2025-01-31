import React, { useState, useRef ,useContext } from 'react';
import { Box, Typography, Divider, Button, Popper, Paper, Select, MenuItem, TextField, Stack, RadioGroup, FormControlLabel, Radio } from '@mui/material';
import BroadcastOnPersonalOutlinedIcon from '@mui/icons-material/BroadcastOnPersonalOutlined';
import WatchLaterOutlinedIcon from '@mui/icons-material/WatchLaterOutlined';
import { SparkLineChart } from '@mui/x-charts/SparkLineChart';
import Battery20OutlinedIcon from '@mui/icons-material/Battery20Outlined';
import TimelineOutlinedIcon from '@mui/icons-material/TimelineOutlined';
import { BarChart } from '@mui/x-charts/BarChart';
import { useTheme } from '@mui/material/styles';
import BarChartOutlinedIcon from '@mui/icons-material/BarChartOutlined';
import { LineChart } from '@mui/x-charts/LineChart';
import { TankDataContext } from '../../api/Tank_Volume_MQTT';
import TimelineIcon from '@mui/icons-material/Timeline';
import ViewTankData from '../ViewTankData';

const icons = {
    BroadcastOnPersonalOutlinedIcon: BroadcastOnPersonalOutlinedIcon,
    WatchLaterOutlinedIcon: WatchLaterOutlinedIcon,
    Battery20OutlinedIcon: Battery20OutlinedIcon ,
    TimelineOutlinedIcon: TimelineOutlinedIcon
  };


const CardLineChart = ({seticon ,headerFilter , title}) => {
  const {historicalData} = useContext(TankDataContext);
  // console.log(historicalData)
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

  const generateData = () => {
    const labels = [];
    const seriesData = [];
    for (let i = 0; i < 14; i++) {
      labels.push(`Day ${14 - i}`);
      seriesData.push(Math.floor(Math.random() * 10) + 1); // สุ่มค่า 1-10
    }
    return { labels, seriesData };
  };
  const data = generateData();


  const CardIcon = typeof seticon === 'string' ? icons[seticon] || WatchLaterOutlinedIcon : WatchLaterOutlinedIcon;

//   console.log('Icon name:', seticon, '| Icon component:', CardIcon);
  
// console.log('name', typeof seticon, 'icon', seticon ,);

const theme = useTheme();

  return (
    <>
      <Box 
        variant="rectangular" 
        sx={(theme) => ({
          width: '100%',
          '@media (min-width: 768px)': {
            width: '100%', // สำหรับหน้าจอที่กว้างกว่า 768px
          },
          '@media (min-width: 1386px)': {
            width: '70%', // สำหรับหน้าจอที่กว้างกว่า 1024px
          },

          height: 430,
          borderRadius: 3,
          backgroundColor: theme.palette.background.paper,
          border: '1px solid',
          borderColor: 'grey.300',
          margin: 1,
          padding: 1,
          overflowX: 'auto',
          boxShadow: 'none', // Remove shadow
          // [theme.breakpoints.down('sm')]: {
          //   width: '50%', // Default for small screens
          // },
          // '@media (min-width:300px) and (max-width:330px)': {
          //   width: '60%', // Specific range 300-330px
          // },
          // '@media (min-width:331px) and (max-width:350px)': {
          //   width: '48%', // Specific range 331-350px
          // },
          // '@media (min-width:351px) and (max-width:400px)': {
          //   width: '46%', // Specific range 351-400px
          // },
          // '@media (min-width:401px) and (max-width:800px)': {
          //   width: '93%', // Specific range 401-800px
          // },
          // '@media (min-width:801px) and (max-width:1050px)': {
          //   width: '93%', // Specific range 401-800px
          // },
          // [theme.breakpoints.up('lg')]: {
          //   width: '70%', // For large screens and above
          // },
        })}
      >
        <Box sx={{display :'flex' ,justifyContent : 'space-between'}}>
        <Box sx={{ display: 'flex', padding: 1 }} ref={anchorRef}>
          <TimelineIcon fontSize="large" />
          <Typography variant="h7" sx={{ fontWeight: '700', padding: 1 }}>
            {title}
          </Typography>
        </Box>

        <Box sx={{padding : 1}}>
          <ViewTankData />
        </Box>
        </Box>
        
        
        <Divider/>
        
        <Box sx={{ display: 'flex', padding: 1, cursor: 'pointer', width: '100%', color: '#e5e5e5' }} onClick={() => setOpen((prev) => !prev)}>
          <WatchLaterOutlinedIcon fontSize="small" />
          <Typography fontSize="12px" sx={{ marginLeft: 1, fontWeight: 'Bold' }}>
            Time Filter :  {filterType} 
          </Typography>
        </Box>

        

        <Box sx={{ width: '100%', padding: 1 }}>
  {/* Linechart */}
  <LineChart
    // xAxis={[{
    //   data: historicalData.map(item => item.timestamp), // ใช้ค่า value จาก historicalData
    
    // }]}
    series={[
      {
        data: historicalData.map(item => item.value), // ใช้ค่า value จาก historicalData
      },
    ]}
    height={300}
  />
</Box>
    <Typography fontSize="12px" sx={{ fontWeight: 'Bold', marginTop: -2,  paddingLeft : 3 , color: '#e5e5e5' }}>
        </Typography>
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

export default CardLineChart