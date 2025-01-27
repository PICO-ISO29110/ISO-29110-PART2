import React, { useState, useRef, useEffect } from 'react';
import { Box, Typography, Divider, Button, Popper, Paper, Select, MenuItem, TextField, Stack, RadioGroup, FormControlLabel, Radio } from '@mui/material';
import BroadcastOnPersonalOutlinedIcon from '@mui/icons-material/BroadcastOnPersonalOutlined';
import WatchLaterOutlinedIcon from '@mui/icons-material/WatchLaterOutlined';
import { SparkLineChart } from '@mui/x-charts/SparkLineChart';
import Battery20OutlinedIcon from '@mui/icons-material/Battery20Outlined';
import TimelineOutlinedIcon from '@mui/icons-material/TimelineOutlined';
import { BarChart } from '@mui/x-charts/BarChart';
import { useTheme } from '@mui/material/styles';
import BarChartOutlinedIcon from '@mui/icons-material/BarChartOutlined';
import { ChartsReferenceLine } from '@mui/x-charts/ChartsReferenceLine';

const icons = {
  BroadcastOnPersonalOutlinedIcon: BroadcastOnPersonalOutlinedIcon,
  WatchLaterOutlinedIcon: WatchLaterOutlinedIcon,
  Battery20OutlinedIcon: Battery20OutlinedIcon,
  TimelineOutlinedIcon: TimelineOutlinedIcon
};

const BarChartHistory = ({ seticon, headerFilter, title }) => {
  const [lastUpdated, setLastUpdated] = useState("");
  const [open, setOpen] = useState(false);
  const [startTime, setStartTime] = useState('');
  const [stopTime, setStopTime] = useState('');
  const [filterType, setFilterType] = useState('period');
  const [lastDuration, setLastDuration] = useState('30min');
  const [interval, setInterval] = useState('today');
  const [samplingInterval, setSamplingInterval] = useState('30min');
  const [queryData, setQueryData] = useState({
    filterType: 'interval',
    data: 'today',
    samplingInterval: '30min'
  });

  const [apiData, setApiData] = useState({ labels: [], seriesData: [] }); // สถานะสำหรับข้อมูล API
  const anchorRef = useRef(null);

  const theme = useTheme();

  useEffect(() => {
    const currentDate = new Date();
    const startDate = new Date();
    startDate.setDate(currentDate.getDate() - 14); // ลบ 14 วันจากวันที่ปัจจุบัน

    const formatDate = (date) => {
      const year = date.getFullYear();
      const month = String(date.getMonth() + 1).padStart(2, '0');
      const day = String(date.getDate()).padStart(2, '0');
      const hours = String(date.getHours()).padStart(2, '0');
      const minutes = String(date.getMinutes()).padStart(2, '0');
      return `${year}-${month}-${day}T${hours}:${minutes}`;
    };

    setStartTime(formatDate(startDate));
    setStopTime(formatDate(currentDate));

    // ดึงข้อมูลทันทีเมื่อเข้าหน้าแรก
    setQueryData({
      filterType: 'period',
      data: `${formatDate(startDate)} to ${formatDate(currentDate)}`,
      startTime: formatDate(startDate),
      stopTime: formatDate(currentDate),
      samplingInterval: '30min',
    });
  }, []); // ทำงานครั้งแรกเมื่อโหลดหน้าเว็บ

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('http://100.82.151.125:8000/query_data_consumption', {
          method: 'POST',
          headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            filterType: queryData.filterType,
            data: queryData.data,
            startTime: queryData.startTime,
            stoptime: queryData.stopTime,
            samplingInterval: samplingInterval,
          }),
        });

        if (!response.ok) {
          throw new Error('HTTP error: ' + response.status);
        }

        const result = await response.json();

        if (result.data && Array.isArray(result.data)) {
          const labels = result.data.map((item) => {
            const date = new Date(item.consumption_timestamp);
            const year = date.getFullYear();
            const month = String(date.getMonth() + 1).padStart(2, '0');
            const day = String(date.getDate()).padStart(2, '0');
            return `${year}-${month}-${day}`;
          });

          const seriesData = result.data.map((item) => item.consumption_volume);
          setApiData({ labels, seriesData });
        } else {
          console.error('Unexpected response format', result);
        }
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    // ดึงข้อมูลทุกครั้งที่ queryData หรือ samplingInterval เปลี่ยน
    if (queryData.startTime && queryData.stopTime) {
      fetchData();
    }
  }, [queryData, samplingInterval]); // ค่าของ queryData และ samplingInterval จะถูกใช้งานในการดึงข้อมูลใหม่

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

  const handleApplyFilter = () => {
    let newQueryData = {};
    if (filterType === 'last') {
      newQueryData = {
        filterType: filterType,
        data: lastDuration,
        samplingInterval: samplingInterval
      };
    } else if (filterType === 'period') {
      newQueryData = {
        filterType: filterType,
        data: `${startTime} to ${stopTime}`,
        startTime: startTime,
        stopTime: stopTime,
        samplingInterval: samplingInterval
      };
    } else if (filterType === 'interval') {
      newQueryData = {
        filterType: filterType,
        data: interval,
        samplingInterval: samplingInterval
      };
    }

    setQueryData(newQueryData);
    setOpen(false); // ปิด Popper หลังจากกด Apply
  };


    useEffect(() => {
      // ฟังก์ชันจะทำงานเมื่อ batch_status เปลี่ยนแปลง
      const currentTime = new Date().toLocaleTimeString(); // แปลงเวลาปัจจุบันเป็นข้อความ (รูปแบบ HH:MM:SS)
      setLastUpdated(currentTime); // อัปเดตเวลาใน state
    }, [queryData]); // ใช้ batch_status เป็น dependency

  return (
    <>
      <Box
        variant="rectangular"
        sx={{
          width: { xs: '100%', md: '94%', lg: '65%' },
          height: 430,
          borderRadius: 3,
          margin: 1,
          backgroundColor: theme.palette.background.paper,
          border: '1px solid',
          borderColor: 'grey.300',
        }}
      >
        <Box sx={{ display: 'flex', padding: 1 }} ref={anchorRef}>
          <BarChartOutlinedIcon fontSize="large" />
          <Typography variant="h7" sx={{ fontWeight: '700', padding: 1 }}>
            {title}
          </Typography>
        </Box>
        <Divider />

        <Box sx={{ display: 'flex', padding: 1, cursor: 'pointer', width: '100%', color: '#e5e5e5' }} onClick={() => setOpen((prev) => !prev)}>
          <WatchLaterOutlinedIcon fontSize="small" />
          <Typography fontSize="12px" sx={{ marginLeft: 1, fontWeight: 'Bold' }}>
            Time Filter : Type {queryData.filterType} {queryData.data}
          </Typography>
        </Box>

        <Box sx={{ width: '100%', padding: 3 }}>
          <Stack direction="row" sx={{ display: 'block', width: '100%', paddingLeft: 3 }}>
            <BarChart xAxis={[{ scaleType: 'band', data: apiData.labels }]} series={[{ data: apiData.seriesData }]}
             height={280} />
             
          </Stack>
        </Box>
        <Typography fontSize="12px" sx={{ fontWeight: 'Bold', marginTop: -2, paddingLeft: 3, color: '#e5e5e5' }}>
          Last Update : {lastUpdated}
        </Typography>
      </Box>

      {/* Popper for Filter Options */}
      <Popper open={open} anchorEl={anchorRef.current} placement="bottom-start" sx={{ zIndex: 1 }}>
        <Paper sx={{ padding: 2, width: '350', marginLeft: { xs: '0px', md: '80px', lg: '80px' }, marginTop: '30px' }}>
          <Typography variant="h6">{headerFilter}</Typography>

          <RadioGroup value={filterType} onChange={(e) => setFilterType(e.target.value)}>
            <FormControlLabel value="period" control={<Radio />} label="Time Period" />
            {filterType === 'period' && (
              <>
                <Box sx={{ display: 'block', padding: 1 }}>
                  <TextField
                    sx={{ width: '100%' }}
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
                    sx={{ marginTop: 2, width: '100%' }}
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
                </Box>
              </>
            )}
          </RadioGroup>

          <Box sx={{ display: 'flex', justifyContent: 'flex-end', marginTop: 2 }}>
            <Button onClick={() => setOpen(false)}>Cancel</Button>
            <Button onClick={handleApplyFilter} variant="contained" sx={{ marginLeft: 1 }}>
              Apply
            </Button>
          </Box>
        </Paper>
      </Popper>
    </>
  );
};

export default BarChartHistory;
