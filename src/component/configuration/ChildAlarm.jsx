import * as React from 'react';
import { DataGrid } from '@mui/x-data-grid';
import { useRef ,useState } from 'react';
import Paper from '@mui/material/Paper';

import PropTypes from 'prop-types';
import { styled, css, border, borderRadius, height } from '@mui/system';
import TextField from '@mui/material/TextField';
// import { Modal as BaseModal } from '@mui/base/Modal';
import Divider from '@mui/material/Divider';
import Backdrop from '@mui/material/Backdrop';
import Fade from '@mui/material/Fade';
import { Stack , Chip , IconButton ,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
   Box ,Button ,Popper ,Typography  ,RadioGroup ,FormControlLabel  ,Radio,Select ,MenuItem  ,Modal ,Grid ,FormControl  ,InputLabel } from '@mui/material';
import FilterAltIcon from '@mui/icons-material/FilterAlt';
import GetAppIcon from '@mui/icons-material/GetApp';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import { useEffect } from 'react';
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import { ToastContainer, toast } from 'react-toastify';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 1000,
  // height: 560,
  bgcolor: 'background.paper',
  // border: '1px solid #000',
  borderRadius : 1 ,
  // boxShadow: 24,
  p: 4,
};



const paginationModel = { page: 0, pageSize: 5 };

export default function ChildAlarm({ headerFilter }) {

// popup create user
const handlePermissionChange = (event) => {
  setPermission(event.target.value);
};

const handleStatusChange = (event) => {
  setStatus(event.target.value);
};

const [AlarmId , setAlarmId] = useState();
const [Alarm_Name, setAlarm_Name] = useState("");
const [Alarm_type , setAlarm_type ] = useState("batchToLong");
const [device_name, setdevice_name] = useState(1);
const [Batch_id, setBatch_id] = useState(1);
const [Start_time, setStart_time] = useState("");
const [End_time, setEnd_time] = useState("");
const [Volume_low, setVolume_low] = useState(0);
const [Volume_height, setVolume_height] = useState(0); 
const [Level_low, setLevel_low] = useState(0);
const [Level_height, setLevel_height] = useState(0); 
const [Notify_Selected, setNotify_Selected] = useState(1); 
const [Set_Batch_Duration, setSet_Batch_Duration] = useState(""); 
const [latestBatch, setLatestBatch] = useState(null); 
const [latestBatch2, setLatestBatch2] = useState(null); 




//  Modual Popup

const [openModual, setOpenModual] = React.useState(false);
const handleOpen = () => setOpenModual(true);
const handleClose = () => setOpenModual(false);



// edit
const [openModualEdit, setOpenModualEdit] = React.useState(false);
const handleOpenEdit = () => setOpenModualEdit(true);
const handleCloseEdit = () => setOpenModualEdit(false);



// popup
  const [openPopupConfirm, setOpenConfirmPopup] = useState(false);
  const [open, setOpen] = useState(false);
  const [selectedUserId, setSelectedUserId] = useState(null);
  const [userIdForEdit , setUserIdForEdit] = useState();

  const [filterType, setFilterType] = useState('last');
  const [rowss , setRowss] = useState([]);
  const [lastDuration, setLastDuration] = useState('30min');
  const [startTime, setStartTime] = useState(null);
  const [stopTime, setStopTime] = useState(null);
  const [interval, setInterval] = useState("today");
  const [samplingInterval, setSamplingInterval] = useState('30min');
  const [queryData ,setQueryData] = useState({
    filterType: "interval",
    data: "today",
    samplingInterval: "30min"
  })
  const anchorRef = useRef(null);
  const [searchQuery, setSearchQuery] = React.useState('');
  // console.log(queryData)
  const handleSearchChange = (event) => {
    setSearchQuery(event.target.value);
    // console.log(event.target.value)
  };

const fetchALarmTable = () => {
  fetch("http://100.82.151.125:8000/GetAlarmTable/")
      .then(response => response.json())
      .then(data => {
       
        
        setRowss(  data.device_alarm_table ?
          
          data.device_alarm_table.map((item) => ({

          device_alarm_id: item.device_alarm_id, 
          device_alarm_type: item.device_alarm_type , 
          device_alarm_name: item.device_alarm_name ,
          device_check_start_time: item.device_check_start_time  , 
          device_check_stop_time : item.device_check_stop_time, 
          notify_id: item.notify_id, 
          device_alarm_status: item.device_alarm_status, 
        }))
      : []
      );
      })
      .catch(error => console.error('Error fetching data:', error));
}

  useEffect(() => {
    fetchALarmTable();
  }, []);

  


  const filteredRows = rowss.filter((row) => {
    return (
      (row.device_alarm_type?.toString().toLowerCase() || '').includes(searchQuery.toLowerCase()) || // ค้นหาด้วยชื่ออุปกรณ์
      (row.device_alarm_name?.toString().toLowerCase() || '').includes(searchQuery.toLowerCase()) || // ค้นหาด้วยระยะทางอุปกรณ์
      (row.device_check_start_time?.toString().toLowerCase() || '').includes(searchQuery.toLowerCase()) || // ค้นหาด้วยเวลา
      (row.device_check_stop_time?.toString().toLowerCase() || '').includes(searchQuery.toLowerCase()) || // ค้นหาด้วยสถานะ
      (row.notify_id?.toString().toLowerCase() || '').includes(searchQuery.toLowerCase()) || // ค้นหาด้วย notify_id
      (row.device_alarm_status?.toString().toLowerCase() || '').includes(searchQuery.toLowerCase()) // ค้นหาด้วย device_alarm_status
    );
  });
  

  const handleFilterClick = () => {
    setOpen((prevOpen) => !prevOpen);
  };


  
  const onclosePopupEdit = () => {
    // setEmail('');
    // setFirstName('');
    // setLastName('');
    // setPassword('');
    // setVerifyPassword('');
    // setPermission('');
    // setStatus(true); 

    setUserIdForEdit();

    handleCloseEdit(false)

  }

  const handleConfirmPopupOpen = (userId) => {
    setSelectedUserId(userId);
    setOpenConfirmPopup(true);
  }

const handlecloseConfirmPopup = () => {
  setSelectedUserId(null);
  setOpenConfirmPopup(false);
}

const handleConfirmDelete = () => {
  handleDelete(selectedUserId);
  setOpenConfirmPopup(false);
}

const handleEdit = async (id) => {
  console.log("Edit row with ID:", id);
  setUserIdForEdit(id)
  handleOpenEdit();

  try {
    const response = await fetch('http://100.82.151.125:8000/get_alarm_id/', {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        AlarmID: id
      }),
    });

    if (response.ok) {
      const data = await response.json();
      console.log("data:", data);
      setAlarm_Name(data.AlarmData[0].device_alarm_name)
      setAlarm_type(data.AlarmData[0].device_alarm_type)
      setdevice_name(data.AlarmData[0].device_id)
      setLatestBatch2(data.AlarmData[0].device_batch_id)
      setStart_time(data.AlarmData[0].device_check_start_time)
      setEnd_time(data.AlarmData[0].device_check_stop_time)
      setVolume_low(data.AlarmData[0].device_volume_low)
      setVolume_height(data.AlarmData[0].device_volume_high)
      setLevel_low(data.AlarmData[0].device_level_low_limit)
      setLevel_height(data.AlarmData[0].device_level_high_limit)
      setNotify_Selected(data.AlarmData[0].notify_id)
      setSet_Batch_Duration(data.AlarmData[0].device_batch_duration_set)
      
    } else {
      console.error("Error fetching user data:", response.statusText);
    }
  } catch (error) {
    console.error("Error:", error);
  }

};

const handleDelete = async (id) => {
  console.log("Delete row with ID:", id);

try {
      const response = await fetch('http://100.82.151.125:8000/DeleteAlarmID/', {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          "alarmID": id,
  "AlarmDeleteID": 1
        }),
      });

        const data = await response.json();
        if (data.status === 'true') {
          toast.success(data.message || "User added successfully", {
            position: "top-right",
            autoClose: 5000,
          });
          // handleCloseEdit();
          fetchALarmTable();
        } else if (data.status === 'error') {
          toast.error(data.message || "An error occurred", {
            position: "top-right",
            autoClose: 5000,
          });
        } else {
          console.warn("Unexpected response format:", data);
        }

    } catch (error) {
      console.error("Error:", error);
    }
  };


const handleSubmitEdit = () => {


  const formData = {
    
      "alarm_id": userIdForEdit,
      "eventName": Alarm_Name,
      "starttimes": Start_time,
      "endtimes": End_time,
      "alarmtype": Alarm_type,
      "notifyselect": Notify_Selected,
      "devicelevellows": Level_low,
      "devicelevelhighs": Level_height,
      "devicevolumelows": Volume_low,
      "devicevolumehighs": Volume_height,
      "batchDurationSets": Set_Batch_Duration,
      "selectBatchs": latestBatch2,
      "datausercreate": 1
    
  };


  console.log(formData)


  // // console.log("Form Data as JSON:", formData);


  fetch('http://100.82.151.125:8000/UpdateAlarm/', {
    method: 'POST',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(formData),
  })
    .then(response => response.json())  // แปลงผลลัพธ์เป็น JSON
    .then(data => {
      console.log("Response from API:", data);


      if (data.status === 'success'){
        handleCloseEdit(false)
        fetchALarmTable();
        toast.success(data.message);
      } else if (data.status === 'error') {
        toast.error(data.message);
      }


      
    })
    .catch(error => {
      console.error("Error sending data to API:", error);
    });
  

  console.log('editcheck')


};





// get notify select detail

const [notifyData, setNotifyData] = useState([]); // เก็บข้อมูลจาก API
  // ดึงข้อมูลจาก API
  useEffect(() => {
    fetch("http://100.82.151.125:8000/GetNotifyTable/")
      .then((response) => response.json())
      .then((data) => {
        if (data && Array.isArray(data.device_notify_table)) {
          setNotifyData(data.device_notify_table);
          // ตั้งค่า default เป็น notify_id ของรายการแรก
          if (data.device_notify_table.length > 0) {
            setNotify_Selected(data.device_notify_table[0].notify_id);
          }
        }
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  }, []);



  // get Batch select detail

  useEffect(() => {
    fetch("http://100.82.151.125:8000/GetBatch/")
      .then((response) => response.json())
      .then((data) => {
        console.log(data)
        if (data && Array.isArray(data.device_batch_table
        )) {
          // เรียงลำดับข้อมูลตาม device_batch_id (มาก -> น้อย)
          const sortedData = data.device_batch_table.sort(
            (a, b) => b.device_batch_id - a.device_batch_id
          );
          // เลือก batch ที่มี id มากที่สุด
          const latest = sortedData[0];
          if (latest) {
            setLatestBatch(latest);
            setBatch_id(latest.device_batch_id); // กำหนดค่าเริ่มต้น
          }
        }
      })
      .catch((error) => {
        console.error("Error fetching batch data:", error);
      });
  }, []);


// get device select detail

  const [deviceName, setDeviceName] = useState(""); // เก็บค่า device_name
  const [devices, setDevices] = useState([]); // เก็บข้อมูลอุปกรณ์จาก API



  useEffect(() => {
    fetch("http://100.82.151.125:8000/Device/")
      .then((response) => response.json())
      .then((data) => {
        if (data && Array.isArray(data.device_batch_table)) {
          const deviceList = data.device_batch_table;
          setDevices(deviceList); // เก็บข้อมูลใน state
          if (deviceList.length > 0) {
            setDeviceName(deviceList[0].device_id); // ตั้งค่าอุปกรณ์แรกเป็น default
          }
        }
      })
      .catch((error) => {
        console.error("Error fetching devices:", error);
      });
  }, []);
  

  const handleSubmit = () => {
    const formData = {
      Alarm_Name,
      Alarm_type,
      device_name,
      Batch_id,
      Start_time,
      End_time,
      Volume_low,
      Volume_height,
      Level_low,
      Level_height,
      Notify_Selected ,
      Set_Batch_Duration
    };
    console.log("Form Data as JSON:",(formData));
    
    const formatTime = (time) => {
      return time.replace('T', ' ') + ":00"; 
    };
    
    const formattedStartTime = formatTime(Start_time);  // เช่น "2025-01-21 10:47:00"
    const formattedEndTime = formatTime(End_time);  // เช่น "2025-01-25 10:47:00"
   
    
  console.log(formattedStartTime)
    fetch('http://100.82.151.125:8000/Add_device_alarm', {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        "eventName": Alarm_Name,
        "namedevice": device_name,
        "alarmtype": Alarm_type,
        "devicelevellows": Level_low,
        "devicelevelhighs": Level_height,
        "devicevolumelows": Volume_low,
        "devicevolumehighs": Volume_height,
        "starttimes": formattedStartTime,
        "endtimes": formattedEndTime,
        "notifyselect": Notify_Selected,
        "selectBatchs": Batch_id,
        "batchDurationSets": Set_Batch_Duration,
        "datausercreate": 1
      }),
    })
  
      .then(response => response.json())  // แปลงผลลัพธ์เป็น JSON
      .then(data => {
        console.log("Response from API:", data);
        if (data.status === 'success'){
          console.log("Response from API:", data);
          handleClose();
          fetchALarmTable();
          toast.success(data.message);
        } else if (data.status === 'error') {
          toast.error(data.message);
        }
        
      })
      .catch(error => {
        console.error("Error sending data to API:", error);
      });
    
  
  };



  return (
    <>
      <Box sx={{ width: '100%' }}>
        <Stack direction="row" sx={{ display: 'flex', justifyContent: 'space-between', width: '100%'}}>
          <TextField 
            label="Search"
            variant="outlined"
            fullWidth
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            sx={{
              width: { xs: '80px', md: '200px', lg: '200px' },
              height: 10,
              borderRadius: 3,
              margin: 1,
            }} 
          />

          <Box sx={{ display: 'flex' }}>
            <Button 
            onClick={handleOpen}
              variant="contained" 
              startIcon={<AddCircleIcon />}
              sx={{
                width: { xs: '80px', md: '200px', lg: '120px' },
                height: 50,
                borderRadius: 3,
                margin: 1,
              }} 
            >
              <Box  sx={{paddingTop :'2px'}}>
              ADD
              </Box>
   </Button>
            
  
          </Box>
        </Stack>

        {/* Data Grid */}
        <Box
  sx={{
    margin: 1,
    
  }}
>

<DataGrid
  rows={filteredRows}
  columns={[
    { field: "device_alarm_id", headerName: "ID", width: 150 },
    { field: "device_alarm_type", headerName: "Device Name", width: 200 },
    { field: "device_alarm_name", headerName: "Device Distance", width: 250 },
    { field: "device_check_start_time", headerName: "Tank Volume", width: 300 },
    
    { field: "device_check_stop_time", headerName: "Timestamp", width: 250 },
    
    { field: "notify_id", headerName: "Notify", width: 120 },
   {
         field: "device_alarm_status",
         headerName: "Status",
         width: 220,
         renderCell: (params) => (
           <Chip
             label={params.value ? "Enable" : "Disable"}
             color={params.value ? "success" : "error"}
             variant="outlined"
             style={{
               fontWeight: "bold",
               borderRadius: "16px",
               padding: "4px 12px",
             }}
           />
         ),
       },

    {
      field: "manage",
      headerName: "Manage",
      width: 200,
      renderCell: (params) => (
        <Box>
          {/* ปุ่มแก้ไข */}
          <IconButton
            onClick={() => handleEdit(params.row.device_alarm_id)}
            color="primary"
            aria-label="edit"
          >
            <EditIcon />
          </IconButton>
          {/* ปุ่มลบ */}
          <IconButton
            onClick={() => handleConfirmPopupOpen(params.row.device_alarm_id)} // Open dialog with user ID
            color="error"
            aria-label="delete"
          >
            <DeleteIcon />
          </IconButton>
        </Box>
      ),
    }
  ]}
  pageSize={10}
  checkboxSelection
  sx={{ height: 540 }}
  getRowId={(row) => row.device_alarm_id}  
/>
</Box>

        {/* Popper for Filter Options */}
        <Popper open={open} anchorEl={anchorRef.current} placement="bottom-start" sx={{ zIndex: 1 }}>
          <Paper sx={{ padding: 2, width: '350px', marginLeft: { xs: '0px', md: '80px' }, marginTop: '30px' }}>
            <Typography variant="h6">{headerFilter}</Typography>

            {/* RadioGroup for Filter Type */}
            <RadioGroup 
              value={queryData.filterType} 
              onChange={(e) => setQueryData({ ...queryData, filterType: e.target.value })}
            >
              <FormControlLabel value="period" control={<Radio />} label="Time Period" />
              {queryData.filterType === 'period' && (
                <>
                  <Box sx={{ display: 'block', padding: 1 }}>
                    <TextField
                      sx={{ width: '100%' }}
                      id="outlined-start-time"
                      label="Start Date"
                      type="datetime-local"
                      value={startTime}
                      onChange={(e) => setStartTime(e.target.value)}
                      inputLabel={{ shrink: true }}
                    />
                    <TextField
                      sx={{ marginTop: 2, width: '100%' }}
                      id="outlined-stop-time"
                      label="Stop Date"
                      type="datetime-local"
                      value={stopTime}
                      onChange={(e) => setStopTime(e.target.value)}
                      inputLabel={{ shrink: true }}
                    />
                  </Box>
                </>
              )}

              <FormControlLabel value="interval" control={<Radio />} label="Interval" />
              {queryData.filterType === 'interval' && (
                <Select
                  value={queryData.data}
                  onChange={(e) => setQueryData({ ...queryData, data: e.target.value })}
                  fullWidth 
                  sx={{ mt: 1 }}
                >
                  <MenuItem value="today">Today</MenuItem>
                  <MenuItem value="dayAgo">Day Ago</MenuItem>
                  <MenuItem value="weekAgo">Week Ago</MenuItem>
                  <MenuItem value="monthAgo">Month Ago</MenuItem>
                </Select>
              )}
            </RadioGroup>

    
            <Button 
              variant="contained" 
              sx={{ marginTop: 2, width: '100%' }} 
              onClick={() => {
                setOpen(false); 
              }}
            >
              Submit
            </Button>
          </Paper>
        </Popper>
    

    {/* add */}
        <Modal
        open={openModual}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography sx = {{textAlign : 'center'}} id="modal-modal-title" variant="h6" component="h2">
            Create Alarm
          </Typography>
        <Divider/>

        <Box sx={{padding : 2, marginTop : 2, textAlign : 'center'}}>

        <Grid container spacing={1} sx={{marginBottom : 2}}>
      <Grid item xs={12}>
      <TextField
                label="Alarm Name"
                variant="outlined"
                fullWidth
                value={Alarm_Name}
                onChange={(e) => setAlarm_Name(e.target.value)}
              />
      </Grid>
    </Grid>
        

    


      <Grid container spacing={1} sx={{marginBottom : 2}}>
      <Grid item xs={12}>
        <FormControl fullWidth variant="outlined">
          <InputLabel id="permission-label">Alarm Type</InputLabel>
          <Select
            labelId="permission-label"
            id="permission-select"
           
            label="Alarm Type"
            value={Alarm_type}
            onChange={(e) => setAlarm_type(e.target.value)}
          >
            <MenuItem value="batchToLong">Batch to long</MenuItem>
            <MenuItem value="alarmVolumeSet">Set Alarm Volume</MenuItem>
            <MenuItem value="alarmLevelSet">Set Alarm Level</MenuItem>
          </Select>
        </FormControl>
      </Grid>
    </Grid>



    <Grid container spacing={1} sx={{ marginBottom: 2 }}>
      <Grid item xs={12}>
        <FormControl fullWidth variant="outlined">
          <InputLabel id="device-label">Name Device</InputLabel>
          <Select
            labelId="device-label"
            id="device-select"
            label="Name Device"
            value={deviceName}
            onChange={(e) => setDeviceName(e.target.value)}
          >
            {devices.map((device) => (
              <MenuItem key={device.device_id} value={device.device_id}>
                {device.device_name}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </Grid>
    </Grid>




    {Alarm_type === "batchToLong" && latestBatch && (
        <Grid container spacing={1} sx={{ marginBottom: 2 }}>
          <Grid item xs={12}>
            <FormControl fullWidth variant="outlined">
              <InputLabel id="batch-label">Select Batch ID</InputLabel>
              <Select
                labelId="batch-label"
                id="batch-select"
                label="Select Batch ID"
                value={Batch_id}
                disabled // ป้องกันการเลือกค่า
              >
                <MenuItem value={latestBatch.device_batch_id}>
                  {latestBatch.device_batch_id}
                </MenuItem>
              </Select>
            </FormControl>
          </Grid>
        </Grid>
      )}


{Alarm_type == "batchToLong" && (
    <Grid container spacing={1} sx={{marginBottom : 2}}>
    <Grid item xs={12}>
      <TextField
                label="Set Batch Duration"
                variant="outlined"
                fullWidth
                type='time'
                value={Set_Batch_Duration}
                onChange={(e) => setSet_Batch_Duration(e.target.value)}
                InputLabelProps={{
                  shrink: true, // กำหนดให้ label อยู่ด้านบนเสมอ
                }}
              />
      </Grid>
    </Grid>
    )}



{/* Set Alarm Volume */}
{Alarm_type == "alarmVolumeSet" && (
    <Grid container spacing={2} sx={{ marginBottom: 2 }}>
      {/* Permission Dropdown */}
      <Grid item xs={6}>
      <TextField
                label="Device Volume Low"
                variant="outlined"
                fullWidth
                type='number'
                value={Volume_low}
                onChange={(e) => setVolume_low(e.target.value)}
                InputLabelProps={{
                  shrink: true, // กำหนดให้ label อยู่ด้านบนเสมอ
                }}
              />
      </Grid>

      {/* Status Dropdown */}
      <Grid item xs={6}>
      <TextField
                label="Device Volume High"
                variant="outlined"
                fullWidth
                type='number'
                value={Volume_height}
                onChange={(e) => setVolume_height(e.target.value)}
                InputLabelProps={{
                  shrink: true, // กำหนดให้ label อยู่ด้านบนเสมอ
                }}
              />
      </Grid>
    </Grid>
)}




    {Alarm_type == "alarmLevelSet" && (
    <Grid container spacing={2} sx={{ marginBottom: 2 }}>
      {/* Permission Dropdown */}
      <Grid item xs={6}>
      <TextField
                label="Device Level Low"
                variant="outlined"
                fullWidth
                type='number'
                value={Level_low}
                onChange={(e) => setLevel_low(e.target.value)}
                InputLabelProps={{
                  shrink: true, // กำหนดให้ label อยู่ด้านบนเสมอ
                }}
              />
      </Grid>

      {/* Status Dropdown */}
      <Grid item xs={6}>
      <TextField
                label="Device Level High"
                variant="outlined"
                fullWidth
                type='number'
                value={Level_height}
                onChange={(e) => setLevel_height(e.target.value)}
                InputLabelProps={{
                  shrink: true, // กำหนดให้ label อยู่ด้านบนเสมอ
                }}
              />
      </Grid>
    </Grid>

              )}





    <Grid container spacing={2} sx={{ marginBottom: 2 }}>
      {/* Permission Dropdown */}
      <Grid item xs={6}>
      <TextField
                label="Start Time"
                variant="outlined"
                fullWidth
                type='datetime-local'
                value={Start_time}
                onChange={(e) => setStart_time(e.target.value)}
                InputLabelProps={{
                  shrink: true, // กำหนดให้ label อยู่ด้านบนเสมอ
                }}
              />
      </Grid>

      {/* Status Dropdown */}
      <Grid item xs={6}>
      <TextField
                label="End Time"
                variant="outlined"
                fullWidth
                type='datetime-local'
                value={End_time}
                onChange={(e) => setEnd_time(e.target.value)}
                InputLabelProps={{
                  shrink: true, // กำหนดให้ label อยู่ด้านบนเสมอ
                }}
              />
      </Grid>
    </Grid>


    <Grid container spacing={1} sx={{ marginBottom: 2 }}>
      <Grid item xs={12}>
        <FormControl fullWidth variant="outlined">
          <InputLabel id="permission-label">Notify Selected</InputLabel>
          <Select
            labelId="permission-label"
            id="permission-select"
            label="Notify Selected"
            value={Notify_Selected}
            onChange={(e) => setNotify_Selected(e.target.value)}
          >
            {notifyData.map((item) => (
              <MenuItem key={item.notify_id} value={item.notify_id}>
                {item.notify_name}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </Grid>
    </Grid>


{/* 
    <Box sx={{display: 'flex' , justifyContent: 'space-between' , background : '#EBEBEB'}}>
    <Button size="large">Cancle</Button>
      <Button size="large" variant="outlined">Submit</Button>

    </Box> */}
        
        </Box>
        <Divider/>
        <Box sx={{display: 'flex' , justifyContent: 'space-between', marginTop : 1}}>
        <Button onClick={handleClose}>Cancel</Button>
      <Button size="large" variant="outlined" onClick={handleSubmit}>Submit</Button>

    </Box>
        
        </Box>
    
      </Modal>




{/*  Confirm Delete */}
<Dialog
        open={openPopupConfirm}
        onClose={handlecloseConfirmPopup}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">Confirm Deletion</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            Are you sure you want to delete this user? This action cannot be undone.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handlecloseConfirmPopup} color="primary">
            Cancel
          </Button>
          <Button onClick={handleConfirmDelete} color="error" autoFocus>
            Delete
          </Button>
        </DialogActions>
      </Dialog>







      {/* edit */}

      <Modal
        open={openModualEdit}
        onClose={onclosePopupEdit}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography sx = {{textAlign : 'center'}} id="modal-modal-title" variant="h6" component="h2">
            Edit Alarm
          </Typography>
        <Divider/>

        <Box sx={{padding : 2, marginTop : 2, textAlign : 'center'}}>

        <Grid container spacing={1} sx={{marginBottom : 2}}>
      <Grid item xs={12}>
      <TextField
                label="Alarm Name"
                variant="outlined"
                fullWidth
                value={Alarm_Name}
                onChange={(e) => setAlarm_Name(e.target.value)}
              />
      </Grid>
    </Grid>
        

      <Grid container spacing={1} sx={{marginBottom : 2}}>
      <Grid item xs={12}>
        <FormControl fullWidth variant="outlined">
          <InputLabel id="permission-label">Alarm Type</InputLabel>
          <Select
            labelId="permission-label"
            id="permission-select"
           
            label="Alarm Type"
            value={Alarm_type}
            onChange={(e) => setAlarm_type(e.target.value)}
          >
            <MenuItem value="batchToLong">Batch to long</MenuItem>
            <MenuItem value="alarmVolumeSet">Set Alarm Volume</MenuItem>
            <MenuItem value="alarmLevelSet">Set Alarm Level</MenuItem>
          </Select>
        </FormControl>
      </Grid>
    </Grid>



   <Grid container spacing={1} sx={{ marginBottom: 2 }}>
      <Grid item xs={12}>
        <FormControl fullWidth variant="outlined">
          <InputLabel id="device-label">Name Device</InputLabel>
          <Select
            labelId="device-label"
            id="device-select"
            label="Name Device"
            value={deviceName}
            onChange={(e) => setDeviceName(e.target.value)}
          >
            {devices.map((device) => (
              <MenuItem key={device.device_id} value={device.device_id}>
                {device.device_name}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </Grid>
    </Grid>




    {Alarm_type === "batchToLong" && latestBatch2 && (
        <Grid container spacing={1} sx={{ marginBottom: 2 }}>
          <Grid item xs={12}>
            <FormControl fullWidth variant="outlined">
              <InputLabel id="batch-label">Select Batch ID</InputLabel>
              <Select
                labelId="batch-label"
                id="batch-select"
                label="Select Batch ID"
                value={latestBatch2}
                disabled // ป้องกันการเลือกค่า
              >
                <MenuItem value={latestBatch2}>
                  {latestBatch2}
                </MenuItem>
              </Select>
            </FormControl>
          </Grid>
        </Grid>
      )}

{Alarm_type == "batchToLong" && (
    <Grid container spacing={1} sx={{marginBottom : 2}}>
    <Grid item xs={12}>
      <TextField
                label="Set Batch Duration"
                variant="outlined"
                fullWidth
                type='time'
                value={Set_Batch_Duration}
                onChange={(e) => setSet_Batch_Duration(e.target.value)}
                InputLabelProps={{
                  shrink: true, // กำหนดให้ label อยู่ด้านบนเสมอ
                }}
              />
      </Grid>
    </Grid>
    )}



{/* Set Alarm Volume */}
{Alarm_type == "alarmVolumeSet" && (
    <Grid container spacing={2} sx={{ marginBottom: 2 }}>
      {/* Permission Dropdown */}
      <Grid item xs={6}>
      <TextField
                label="Device Volume Low"
                variant="outlined"
                fullWidth
                type='number'
                value={Volume_low}
                onChange={(e) => setVolume_low(e.target.value)}
                InputLabelProps={{
                  shrink: true, // กำหนดให้ label อยู่ด้านบนเสมอ
                }}
              />
      </Grid>

      {/* Status Dropdown */}
      <Grid item xs={6}>
      <TextField
                label="Device Volume High"
                variant="outlined"
                fullWidth
                type='number'
                value={Volume_height}
                onChange={(e) => setVolume_height(e.target.value)}
                InputLabelProps={{
                  shrink: true, // กำหนดให้ label อยู่ด้านบนเสมอ
                }}
              />
      </Grid>
    </Grid>
)}




    {Alarm_type == "alarmLevelSet" && (
    <Grid container spacing={2} sx={{ marginBottom: 2 }}>
      {/* Permission Dropdown */}
      <Grid item xs={6}>
      <TextField
                label="Device Level Low"
                variant="outlined"
                fullWidth
                type='number'
                value={Level_low}
                onChange={(e) => setLevel_low(e.target.value)}
                InputLabelProps={{
                  shrink: true, // กำหนดให้ label อยู่ด้านบนเสมอ
                }}
              />
      </Grid>

      {/* Status Dropdown */}
      <Grid item xs={6}>
      <TextField
                label="Device Level High"
                variant="outlined"
                fullWidth
                type='number'
                value={Level_height}
                onChange={(e) => setLevel_height(e.target.value)}
                InputLabelProps={{
                  shrink: true, // กำหนดให้ label อยู่ด้านบนเสมอ
                }}
              />
      </Grid>
    </Grid>

              )}





    <Grid container spacing={2} sx={{ marginBottom: 2 }}>
      {/* Permission Dropdown */}
      <Grid item xs={6}>
      <TextField
                label="Start Time"
                variant="outlined"
                fullWidth
                type='datetime-local'
                value={Start_time}
                onChange={(e) => setStart_time(e.target.value)}
                InputLabelProps={{
                  shrink: true, // กำหนดให้ label อยู่ด้านบนเสมอ
                }}
              />
      </Grid>

      {/* Status Dropdown */}
      <Grid item xs={6}>
      <TextField
                label="End Time"
                variant="outlined"
                fullWidth
                type='datetime-local'
                value={End_time}
                onChange={(e) => setEnd_time(e.target.value)}
                InputLabelProps={{
                  shrink: true, // กำหนดให้ label อยู่ด้านบนเสมอ
                }}
              />
      </Grid>
    </Grid>


    <Grid container spacing={1} sx={{ marginBottom: 2 }}>
      <Grid item xs={12}>
        <FormControl fullWidth variant="outlined">
          <InputLabel id="permission-label">Notify Selected</InputLabel>
          <Select
            labelId="permission-label"
            id="permission-select"
            label="Notify Selected"
            value={Notify_Selected}
            onChange={(e) => setNotify_Selected(e.target.value)}
          >
            {notifyData.map((item) => (
              <MenuItem key={item.notify_id} value={item.notify_id}>
                {item.notify_name}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </Grid>
    </Grid>


{/* 
    <Box sx={{display: 'flex' , justifyContent: 'space-between' , background : '#EBEBEB'}}>
    <Button size="large">Cancle</Button>
      <Button size="large" variant="outlined">Submit</Button>

    </Box> */}
        
        </Box>
        <Divider/>
        <Box sx={{display: 'flex' , justifyContent: 'space-between', marginTop : 1}}>
        <Button onClick={onclosePopupEdit}>Cancel</Button>
      <Button size="large" variant="outlined" onClick={handleSubmitEdit}>Submit</Button>

    </Box>
        
        </Box>
    
      </Modal>



      </Box>
      <ToastContainer/>
    </>
  );
}
