import React, { useState, useEffect } from 'react';
import {
  Box,
  Button,
  Typography,
  Grid,
  Card,
  CardContent,
  CardActions,
  ToggleButton,
  ToggleButtonGroup,
  Badge,
  Pagination,
} from '@mui/material';
import { ToastContainer, toast } from 'react-toastify';
import { useUserContext } from '../../template/userContent';
const NotifyTemplate = () => {
  const { data } = useUserContext();
  const [alignment, setAlignment] = useState('Volume');
  const [select , setSelect] = useState('')
  const [alarms, setAlarms] = useState([]);
  const [alarmsLevel, setAlarmsLevel] = useState([]);
  const [alarmsBatch, setAlarmsBatch] = useState([]);
  const [alarmsCount, setAlarmsCount] = useState(0);
  const [alarmsLevelCount, setAlarmsLevelCount] = useState(0);
  const [alarmsBatchCount, setAlarmsBatchCount] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const [sumAlarm] = useState(alarmsCount+alarmsLevelCount+alarmsBatchCount);
  const [itemsPerPage] = useState(4); // จำนวนรายการต่อหน้า
  
  const [currentPageLevel, setCurrentPageLevel] = useState(1);
  const [itemsPerPageLevel] = useState(4); // จำนวนรายการต่อหน้า

  const [currentPageBatch, setCurrentPageBatch] = useState(1);
  const [itemsPerPageBatch] = useState(4); // จำนวนรายการต่อหน้า

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);


  // console.log(alarms)

  const handleChange = (event, newAlignment) => {
    setAlignment(newAlignment);
  };

  const fetchAlarmsVlume = async () => {
    try {
      const response = await fetch('http://100.82.151.125:8000/get-device-alarms');
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data = await response.json();
      console.log('asasdas')
      setAlarms(data.alarms);
      setLoading(false);
      setAlarmsCount(data.count);
    } catch (error) {
      setError(error.message);
      setLoading(false);
    }
  };

  const fetchAlarmsLevel = async () => {
    try {
      const response = await fetch('http://100.82.151.125:8000/get-device-alarms-level');
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data = await response.json();
      setAlarmsLevel(data.alarms);
      setLoading(false);
      setAlarmsLevelCount(data.count);
    } catch (error) {
      setError(error.message);
      setLoading(false);
    }
  };

  
  const fetchAlarmsBatch = async () => {
    try {
      const response = await fetch('http://100.82.151.125:8000/get-device-alarms-batch');
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data = await response.json();
      setAlarmsBatch(data.alarms);
      setLoading(false);
      setAlarmsBatchCount(data.count);
    } catch (error) {
      setError(error.message);
      setLoading(false);
    }
  };



  useEffect(() => {
    fetchAlarmsVlume();
    fetchAlarmsLevel();
    fetchAlarmsBatch();
  }, []);

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = alarms.slice(indexOfFirstItem, indexOfLastItem); // แสดงข้อมูลเฉพาะหน้าปัจจุบัน



  const indexOfLastItemLevel = currentPageLevel * itemsPerPageLevel;
  const indexOfFirstItemLevel = indexOfLastItemLevel - itemsPerPageLevel;
  const currentItemsLevelLevel = alarmsLevel.slice(indexOfFirstItemLevel, indexOfLastItemLevel);



  const indexOfLastItemBatch = currentPageBatch * itemsPerPageBatch;
  const indexOfFirstItemBatch = indexOfLastItemBatch - itemsPerPageBatch;
  const currentItemsBatch = alarmsBatch.slice(indexOfFirstItemBatch, indexOfLastItemBatch);


  const handlePageChange = (event, value) => {
    setCurrentPage(value);
  };


  const handleDismiss = (id) => {
    console.log('Dismissed ID:', id);
    // ทำสิ่งที่ต้องการต่อ เช่น เรียก API เพื่ออัปเดตสถานะ
  };
  
  const handleAcknowledge = (id,userId) => {
    console.log('Acknowledged ID:', id);
    // ทำสิ่งที่ต้องการต่อ เช่น เรียก API เพื่ออัปเดตสถานะ

    fetch('http://100.82.151.125:8000/Update_Actknowlage_vloume/', {
          method: 'POST',
          headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            "NotifyID": id ,
            "userId" : userId
          }),
        })
      
          .then(response => response.json())  // แปลงผลลัพธ์เป็น JSON
          .then(data => {
            console.log("Response from API:", data);
            if(data.status === 'ok') {
              fetchAlarmsVlume();
              // toast.success(data.message);

            }
            
          })
          .catch(error => {
            console.error("Error sending data to API:", error);
          });
        
  
  };

  const handleAcknowledge2 = (id,userId) => {
    console.log('Acknowledged ID:', id);
    // ทำสิ่งที่ต้องการต่อ เช่น เรียก API เพื่ออัปเดตสถานะ
    fetch('http://100.82.151.125:8000/Update_Actknowlage_batch/', {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        "NotifyID": id ,
            "userId" : userId
      }),
    })
  
      .then(response => response.json())  // แปลงผลลัพธ์เป็น JSON
      .then(data => {
        console.log("Response from API:", data);
        if(data.status === 'ok') {
     
          fetchAlarmsBatch();
          // toast.success(data.message);

        }
        
      })
      .catch(error => {
        console.error("Error sending data to API:", error);
      });


  };




  const handleAcknowledge3 = (id,userId) => {
    console.log('Acknowledged ID:', id);
    // ทำสิ่งที่ต้องการต่อ เช่น เรียก API เพื่ออัปเดตสถานะ

    fetch('http://100.82.151.125:8000/Update_Actknowlage_level/', {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        "NotifyID": id ,
        "userId" : userId
      }),
    })
  
      .then(response => response.json())  // แปลงผลลัพธ์เป็น JSON
      .then(data => {
        console.log("Response from API:", data);
        if(data.status === 'ok') {
          fetchAlarmsLevel();
          // toast.success(data.message);

        }
        
      })
      .catch(error => {
        console.error("Error sending data to API:", error);
      });


  };


  

  return (
    <>
      <ToggleButtonGroup
        color="primary"
        value={alignment}
        exclusive
        onChange={handleChange}
        aria-label="Platform"
      >
        <Badge badgeContent={alarmsCount} color="secondary">
          <ToggleButton value="Volume">Volume Alarm</ToggleButton>
        </Badge>
        <Badge badgeContent={alarmsBatchCount} color="success">
          <ToggleButton value="Batch">Batch Alarm</ToggleButton>
        </Badge>
        <Badge badgeContent={alarmsLevelCount} color="secondary">
          <ToggleButton value="Level">Level Alarm</ToggleButton>
        </Badge>
      </ToggleButtonGroup>


{/* Volume Alarm */}
{alignment === 'Volume' && (
  <>
    <Grid container spacing={2} sx={{ width: '100%', padding: 2, margin: 0, display: 'block' }}>
      {currentItems && currentItems.length > 0 ? (
        currentItems.map((alarm) => (
          <Grid item key={alarm.device_volume_record_id}>
            <Card sx={{ marginBottom: 0.5 }}>
              <CardContent>
                <Typography gutterBottom variant="h5" component="div">
                 Volume Alarm
                </Typography>
                <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                  {alarm.device_alarm_message}
                </Typography>
              </CardContent>
              <CardActions sx={{ justifyContent: 'end' }}>
                <Button size="small" onClick={() => handleDismiss(alarm.device_volume_record_id)}>
                  Dismiss
                </Button>
                <Button size="small" onClick={() => handleAcknowledge(alarm.device_volume_record_id , data.user_id)}>
                  Acknowledge
                </Button>
              </CardActions>
            </Card>
          </Grid>
        ))
      ) : (
        <Typography variant="body2" color="text.secondary">
          No alarms to display.
        </Typography>
      )}
    </Grid>

    {alarms && alarms.length > 0 && (
      <Box sx={{ display: 'flex', justifyContent: 'start', marginTop: 2 }}>
        <Pagination
          count={Math.ceil(alarms.length / itemsPerPage)} // จำนวนหน้าทั้งหมด
          page={currentPage} // หน้าปัจจุบัน
          onChange={handlePageChange}
          color="primary"
        />
      </Box>
    )}
  </>
)}





{/* Batch Alarm */}
{alignment === 'Batch' && (
  <>
    <Grid container spacing={2} sx={{ width: '100%', padding: 2, margin: 0 }}>
      {currentItemsBatch.length > 0 ? (
        currentItemsBatch.map((alarm, index) => (
          <Grid item key={`${alarm.alarm_batch_record_id}-${index}`}>
            <Card sx={{ marginBottom: 0.5 }}>
              <CardContent>
                <Typography gutterBottom variant="h5" component="div">
                  Batch Alarm
                </Typography>
                <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                  {alarm.alarm_batch_record_message}
                </Typography>
              </CardContent>
              <CardActions sx={{ justifyContent: 'end' }}>
                <Button size="small" onClick={() => handleDismiss(alarm.alarm_batch_record_id)}>
                  Dismiss
                </Button>
                <Button size="small" onClick={() => handleAcknowledge2(alarm.device_volume_record_id , data.user_id)}>
                  Acknowledge
                </Button>
              </CardActions>
            </Card>
          </Grid>
        ))
      ) : (
        <Typography variant="body2" color="text.secondary">
          No alarms to display.
        </Typography>
      )}
    </Grid>

    {alarmsBatch.length > 0 && (
      <Box sx={{ display: 'flex', justifyContent: 'start', marginTop: 2 }}>
        <Pagination
          count={Math.ceil(alarmsBatch.length / itemsPerPageBatch)}
          page={currentPageBatch}
          onChange={handlePageChange}
          color="primary"
        />
      </Box>
    )}
  </>
)}



{/* Level Alarm */}
{alignment === 'Level' && (
  <>
    <Grid container spacing={2} sx={{ width: '100%', padding: 2, margin: 0, display: 'block' }}>
      {currentItemsLevelLevel && currentItemsLevelLevel.length > 0 ? (
        currentItemsLevelLevel.map((alarm) => (
          <Grid item key={alarm.device_level_record_id}>
            <Card sx={{ marginBottom: 0.5 }}>
              <CardContent>
                <Typography gutterBottom variant="h5" component="div">
                  Level Alarm
                </Typography>
                <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                  {alarm.device_alarm_message}
                </Typography>
              </CardContent>
              <CardActions sx={{ justifyContent: 'end' }}>
                <Button size="small" onClick={() => handleDismiss(alarm.device_level_record_id)}>
                  Dismiss
                </Button>
                <Button size="small" onClick={() => handleAcknowledge3(alarm.device_volume_record_id , data.user_id)}>
                  Acknowledge
                </Button>
              </CardActions>
            </Card>
          </Grid>
        ))
      ) : (
        <Typography variant="body2" color="text.secondary">
          No alarms to display.
        </Typography>
      )}
    </Grid>

    {alarmsLevel && alarmsLevel.length > 0 && (
      <Box sx={{ display: 'flex', justifyContent: 'start', marginTop: 2 }}>
        <Pagination
          count={Math.ceil(alarmsLevel.length / itemsPerPageLevel)} // จำนวนหน้าทั้งหมด
          page={currentPageLevel} // หน้าปัจจุบัน
          onChange={handlePageChange}
          color="primary"
        />
      </Box>
    )}
  </>
)}

<ToastContainer/>
    </>
  );
};

export default NotifyTemplate;
