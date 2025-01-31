import * as React from 'react';
import { DataGrid } from '@mui/x-data-grid';
import { useRef ,useState } from 'react';
import Paper from '@mui/material/Paper';
import { ToastContainer, toast } from 'react-toastify';
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
import { useUserContext } from '../../template/userContent';


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

export default function ChildNotify({ headerFilter }) {
 const { data } = useUserContext();
// popup create user
const handlePermissionChange = (event) => {
  setPermission(event.target.value);
};

const handleStatusChange = (event) => {
  setStatus(event.target.value);
};

const [userIdForEdit , setUserIdForEdit] = useState();
const [Token, setToken] = useState("");
const [TokenName, setTokenName] = useState("");
const [status, setStatus] = useState(true);
const [selectedUserId, setSelectedUserId] = useState(null);
const [error, setError] = useState(""); // สำหรับแสดงข้อความผิดพลาด





//  Modual Popup
const [openModualEdit, setOpenModualEdit] = React.useState(false);
const [openPopupConfirm, setOpenConfirmPopup] = useState(false);
const handleOpenEdit = () => setOpenModualEdit(true);
const handleCloseEdit = () => setOpenModualEdit(false);

const [openModual, setOpenModual] = React.useState(false);
const handleOpen = () => setOpenModual(true);
const handleClose = () => setOpenModual(false);
  const [open, setOpen] = useState(false);
  const [filterType, setFilterType] = useState('last');
  const [lastDuration, setLastDuration] = useState('30min');
  const [rowss , setRowss] = useState([]);
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

  const fetchNotifyTable = () => {
    fetch("http://100.82.151.125:8000/GetNotifyTable/")
    .then(response => response.json())
    .then(data => {
      console.log('api : ',data);
      
      setRowss(  data.device_notify_table ?
        
        data.device_notify_table.map((item) => ({

        notify_id: item.notify_id, 
        notify_token: item.notify_token , 
        notify_name: item.notify_name ,
        notify_create_at: item.notify_create_at  , 
        notify_create_by : item.notify_create_by, 
        notify_status: item.notify_status, 
        
      }))
    : []
    );
    })
    .catch(error => console.error('Error fetching data:', error)); // Log ข้อผิดพลาด (ถ้ามี)
  };

  const handleSubmit = async () => {

    const formData = {
      notifyname : Token,
      linetoken : TokenName,
      notifystatus : status,
      usercreate : data.user_id
    };
  
    fetch('http://100.82.151.125:8000/InsertNotify/', {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(formData),
    })
  
      .then(response => response.json())  
      .then(data => {
        // console.log("Response from API:", data);
        if (data.status === 'true'){
          // console.log("Response from API:", data);
          handleClose();
          fetchNotifyTable();
          toast.success(data.message);
        } else if (data.status === 'error') {
          toast.error(data.message);
        }
        
      })
      .catch(error => {
        console.error("Error sending data to API:", error);
      });

  };

  useEffect(() => {
    fetch("http://100.82.151.125:8000/GetNotifyTable/")
      .then(response => response.json())
      .then(data => {
        console.log('api : ',data);
        
        setRowss(  data.device_notify_table ?
          
          data.device_notify_table.map((item) => ({

          notify_id: item.notify_id, 
          notify_token: item.notify_token , 
          notify_name: item.notify_name ,
          notify_create_at: item.notify_create_at  , 
          notify_create_by : item.notify_create_by, 
          notify_status: item.notify_status, 
          
        }))
      : []
      );
      })
      .catch(error => console.error('Error fetching data:', error)); // Log ข้อผิดพลาด (ถ้ามี)
  }, []);


  const filteredRows = rowss.filter((row) => {
    // console.log(row);
    return (
      (row.notify_token ? row.notify_token.toString().toLowerCase() : '').includes(searchQuery.toLowerCase()) || // ค้นหาด้วยชื่ออุปกรณ์
      (row.notify_name ? row.notify_name.toString().toLowerCase() : '').includes(searchQuery.toLowerCase()) || // ค้นหาด้วยระยะทางอุปกรณ์
      (row.notify_create_at ? row.notify_create_at.toString().toLowerCase() : '').includes(searchQuery.toLowerCase()) 
    );
  });

  const handleFilterClick = () => {
    setOpen((prevOpen) => !prevOpen);
  };





  const handleEdit = async (id) => {
    console.log("Edit row with ID:", id);

    setUserIdForEdit(id)
    handleOpenEdit();

    try {
      const response = await fetch('http://100.82.151.125:8000/get_notify_id/', {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          NotifyID: id
        }),
      });
  
      if (response.ok) {
        const data = await response.json();
        console.log("User data:", data);
        setToken(data.AlarmData[0].notify_token)
        setTokenName(data.AlarmData[0].notify_name)
        setStatus(data.AlarmData[0].notify_status)

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
          const response = await fetch('http://100.82.151.125:8000/DeleteNotifyID/', {
            method: 'POST',
            headers: {
              'Accept': 'application/json',
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              "notifyID": id,
              "notifyDelete": data.user_id
            }),
          });
    
            const data = await response.json();
            if (data.status === 'true') {
              toast.success(data.message || "User added successfully", {
                position: "top-right",
                autoClose: 5000,
              });
              // handleCloseEdit();
              fetchNotifyTable();
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



// console.log(userIdForEdit)




const handleSubmitEdit = () => {

  const formData = {
    "notifyid": userIdForEdit,
    "notifyname": TokenName,
    "linetoken": Token,
    "notifystatus": true,
    "usercreate": data.user_id
  }
  console.log("Form Data as JSON:", formData);


  fetch('http://100.82.151.125:8000/UpdateNotify/', {
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
      if (data.status === 'true'){
        handleCloseEdit(false)
        fetchNotifyTable();
        toast.success(data.message);
      } else if (data.status === 'error') {
        toast.error(data.message);
      }
      
    })
    .catch(error => {
      console.error("Error sending data to API:", error);
    });
  

  // console.log('editcheck')
};



  const onclosePopupEdit = () => {


    setToken('');
    setTokenName('');
    setStatus(true);
    // setPassword('');
    // setVerifyPassword('');
    // setPermission('');
    // setStatus(true); // ค่าเริ่มต้นให้เป็น true (Enable)

    // setUserIdForEdit();

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





  return (
    <>




    
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

        <Box
  sx={{
    margin: 1,
    
  }}
>


<DataGrid
  rows={filteredRows}
  columns={[
    { field: "notify_id", headerName: "ID", width: 200 },
    { field: "notify_token", headerName: "Token", width: 350 },
    { field: "notify_name", headerName: "Notify Name", width: 350 },
    { field: "notify_create_at", headerName: "Create At", width: 300 },
    // { field: "notify_create_by", headerName: "Create By", width: 300 },
    {
          field: "notify_status",
          headerName: "Status",
          width: 250,
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
                onClick={() => handleEdit(params.row.notify_id)}
                color="primary"
                aria-label="edit"
              >
                <EditIcon />
              </IconButton>
              {/* ปุ่มลบ */}
              <IconButton
                onClick={() => handleConfirmPopupOpen(params.row.notify_id)} // Open dialog with user ID
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
  getRowId={(row) => row.notify_id}  // Use device_batch_id as the row id
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
                setOpen(false); // Close the Popper when submit is clicked
              }}
            >
              Submit
            </Button>
          </Paper>
        </Popper>
    
        <Modal
        open={openModual}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography sx = {{textAlign : 'center'}} id="modal-modal-title" variant="h6" component="h2">
            Create Notify
          </Typography>
        <Divider/>

        <Box sx={{padding : 2, marginTop : 2, textAlign : 'center'}}>

        <Grid container spacing={1} sx={{marginBottom : 2}}>
      <Grid item xs={12}>
      <TextField
                label="Token"
                variant="outlined"
                fullWidth
                value={Token}
                onChange={(e) => setToken(e.target.value)}
              />
      </Grid>
    </Grid>
        
        <Grid container spacing={2} sx={{marginBottom : 2}}>
      <Grid item xs={6}>
      <TextField
                label="Notify Name"
                variant="outlined"
                fullWidth
                value={TokenName}
                onChange={(e) => setTokenName(e.target.value)}
              />
      </Grid>
       <Grid item xs={6}>
           <FormControl fullWidth>
       <InputLabel id="demo-simple-select-label">Status</InputLabel>
       <Select
         labelId="demo-simple-select-label"
         id="demo-simple-select"
        
         label="status"
         value={status}
         onChange={(e) => setStatus(e.target.value)}
       >
         <MenuItem value={true}>Enable</MenuItem>
         <MenuItem value={false}>Disble</MenuItem>
       </Select>
     </FormControl>
           </Grid>

    </Grid>

    <Grid container spacing={2} sx={{ marginBottom: 2 }}>
  
  
      {/* Status Dropdown */}

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



      {/* edit */}


      <Modal
        open={openModualEdit}
        onClose={onclosePopupEdit}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography sx = {{textAlign : 'center'}} id="modal-modal-title" variant="h6" component="h2">
            Edit Notify
          </Typography>
        <Divider/>

        <Box sx={{padding : 2, marginTop : 2, textAlign : 'center'}}>

        <Grid container spacing={1} sx={{marginBottom : 2}}>
      <Grid item xs={12}>
      <TextField
                label="Token"
                variant="outlined"
                fullWidth
                value={Token}
                onChange={(e) => setToken(e.target.value)}
              />
      </Grid>
    </Grid>
        
        <Grid container spacing={2} sx={{marginBottom : 2}}>
      <Grid item xs={6}>
      <TextField
                label="Notify Name"
                variant="outlined"
                fullWidth
                value={TokenName}
                onChange={(e) => setTokenName(e.target.value)}
              />
      </Grid>
       <Grid item xs={6}>
           <FormControl fullWidth>
       <InputLabel id="demo-simple-select-label">Status</InputLabel>
       <Select
         labelId="demo-simple-select-label"
         id="demo-simple-select"
        
         label="status"
         value={status}
         onChange={(e) => setStatus(e.target.value)}
       >
         <MenuItem value={true}>Enable</MenuItem>
         <MenuItem value={false}>Disble</MenuItem>
       </Select>
     </FormControl>
           </Grid>

    </Grid>

    <Grid container spacing={2} sx={{ marginBottom: 2 }}>
  
  
      {/* Status Dropdown */}

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
