import tankImage from '../../image/tank_water_rm.png'; 
import Tankbeer from '../../svg/tankbeer';
import React, { useState, useRef, useEffect, useContext } from 'react';
import { Box, Typography, Divider, useTheme } from '@mui/material';
import MonitorIcon from '@mui/icons-material/Monitor';
import { TankDataContext } from '../../api/Tank_Volume_MQTT';
import ViewTankData from '../ViewTankData';
import RemoveRedEyeIcon from '@mui/icons-material/RemoveRedEye';
const Test = () => {
  const { data_tank } = useContext(TankDataContext);
  const anchorRef = useRef(null);
  const theme = useTheme();
  const [level, setLevel] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      // console.log('data_tank:', data_tank); // ตรวจสอบค่าที่เข้ามา
      if (data_tank !== undefined && data_tank !== null && !isNaN(data_tank)) {
        setLevel(Math.floor(data_tank / 12)); // คำนวณระดับน้ำจากข้อมูล
      } else {
        setLevel(0); // กำหนดค่าพื้นฐานเมื่อข้อมูลไม่ถูกต้อง
      }
    }, 2000); // อัปเดตทุก 2 วินาที

    return () => clearInterval(interval); // ลบ interval เมื่อคอมโพเนนต์ถูกยกเลิก
  }, [data_tank]);

  return (
    <>
      <Box 
        sx={{
          width: { xs: '100%', md: '70%', lg: '32%' },
          height: 430,
          borderRadius: 3,
          margin: 1,
          backgroundColor: theme.palette.background.paper, // ใช้สีจากธีม
          border: '1px solid',
          borderColor: 'grey.300',
        }} 
      >
        <Box sx={{display:'flex', justifyContent : 'space-between'}}>
        <Box sx={{ display: 'flex', padding: 1 }} ref={anchorRef}>
          <MonitorIcon fontSize="large" />
          <Typography variant="h7" sx={{ fontWeight: '700', padding: 1 }}>
            Tank Moniter
          </Typography>
        </Box>
        <Box sx={{padding : 1}}>
          <ViewTankData/>
        </Box>
        </Box>
        
        <Divider />
        <Tankbeer level={level} />
      </Box>
    </>
  );
};

export default Test;
