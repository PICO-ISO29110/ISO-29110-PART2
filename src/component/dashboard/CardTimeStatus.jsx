import React, { useState, useRef, useContext, useEffect } from 'react';
import { Box, Typography, Divider, Button, Popper, Paper, Select, MenuItem, TextField, Stack, RadioGroup, FormControlLabel, Radio ,CircularProgress } from '@mui/material';
import BroadcastOnPersonalOutlinedIcon from '@mui/icons-material/BroadcastOnPersonalOutlined';
import WatchLaterOutlinedIcon from '@mui/icons-material/WatchLaterOutlined';
import { SparkLineChart } from '@mui/x-charts/SparkLineChart';
import AccessAlarmOutlinedIcon from '@mui/icons-material/AccessAlarmOutlined';
import { useTheme } from '@mui/material/styles';
import { BatchStatusContext } from '../../api/Batch_Status_MQTT';

const CardTimeStatus = () => {
  const { batch_start_time } = useContext(BatchStatusContext); // ดึง batch_start_time จาก context
  const [open, setOpen] = useState(false);
  const [duration, setDuration] = useState('wait data'); // State สำหรับเก็บค่าคำนวณ duration
  const [filterType, setFilterType] = useState('last');
  const theme = useTheme();
  const anchorRef = useRef(null);

  // useEffect ใช้สำหรับทำงานที่เกี่ยวข้องกับ batch_start_time และเวลา
  useEffect(() => {
    const calculateDuration = () => {
      const now = new Date();
      const startTimed = new Date(batch_start_time);

      if (isNaN(startTimed.getTime())) {
        // console.error("ไม่สามารถแปลง batch_start_time เป็น Date ได้", batch_start_time);
        return;
      }

      // Adjust time -7 ชั่วโมง
      startTimed.setHours(startTimed.getHours() - 7);

      // คำนวณช่วงเวลา
      const durationInMinutes = Math.floor((now.getTime() - startTimed.getTime()) / 60000);

      // แปลง duration เป็น hr/min ตามที่ต้องการ
      let durationText = '';
      if (durationInMinutes >= 60) {
        const hours = Math.floor(durationInMinutes / 60);
        durationText = `${hours} hr`;
      } else {
        durationText = `${durationInMinutes} min`;
      }

      setDuration(durationText); // Set state หลังจากคำนวณเสร็จสิ้น
    };

    calculateDuration();
  }, [batch_start_time]); // useEffect จะทำงานหาก batch_start_time เปลี่ยนแปลง

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
          <AccessAlarmOutlinedIcon fontSize="large" />
          <Typography variant="h7" sx={{ fontWeight: '700', padding: 1 }}>
            Batch Start Time
          </Typography>
        </Box>
        <Divider />
        
        <Box 
          sx={{ 
            display: 'flex', 
            padding: 1, 
            cursor: 'pointer', 
            width: '100%', 
            color: '#e5e5e5', 
            justifyContent: 'end' 
          }}
          onClick={() => setOpen(prev => !prev)} 
        >
          <WatchLaterOutlinedIcon fontSize="small" />
          <Typography fontSize="12px" sx={{ marginLeft: 1, fontWeight: 'Bold' }}>
            Batch Duration: {duration}
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
{batch_start_time ? (
        <Typography fontSize="40px" sx={{ marginLeft: 1, fontWeight: "bold" }}>
          {(() => {
            const date = new Date(batch_start_time);
            const formattedDate = date.toLocaleDateString("en-CA", {
              year: "numeric",
              month: "2-digit",
              day: "2-digit",
            });
            const formattedTime = date.toLocaleTimeString("en-CA", {
              hour: "2-digit",
              minute: "2-digit",
              hour12: false,
            });

            return `${formattedDate} ${formattedTime}`;
          })()}
        </Typography>
      ) : (
        <CircularProgress sx={{ marginLeft: 1 }} />
      )}
</Box>
        
        <Stack 
          direction="row" 
          sx={{ 
            display: 'block', 
            width: '100%', 
            paddingLeft: 3, 
            paddingTop: 3 
          }}
        >
          <Typography fontSize="12px" sx={{ fontWeight: 'Bold', marginTop: 1, color: '#e5e5e5' }}>
          </Typography>
        </Stack>
      </Box>
    </>
  );
};

export default CardTimeStatus;
