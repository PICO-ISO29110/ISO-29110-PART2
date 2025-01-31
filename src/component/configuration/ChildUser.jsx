import * as React from 'react';
import { DataGrid } from '@mui/x-data-grid';
import { useRef ,useState } from 'react';
import Paper from '@mui/material/Paper';

import PropTypes from 'prop-types';
import { styled, css, border, borderRadius, height } from '@mui/system';
import TextField from '@mui/material/TextField';
// import { Modal as BaseModal } from '@mui/base/Modal';
import Divider from '@mui/material/Divider';
import { ToastContainer, toast } from 'react-toastify';

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
  height: 560,
  bgcolor: 'background.paper',
  // border: '1px solid #000',
  borderRadius : 1 ,
  // boxShadow: 24,
  p: 4,
};



const paginationModel = { page: 0, pageSize: 5 };

export default function ChildUser({ headerFilter }) {
  const { data } = useUserContext();
// popup create user
const handlePermissionChange = (event) => {
  setPermission(event.target.value);
};

const handleStatusChange = (event) => {
  setStatus(event.target.value);
};


const [email, setEmail] = useState("");
const [firstName, setFirstName] = useState("");
const [lastName, setLastName] = useState("");
const [password, setPassword] = useState("");
const [permission, setPermission] = useState(2);
const [status, setStatus] = useState(false);
const [verifyPassword, setVerifyPassword] = useState("");
const [error, setError] = useState(""); // สำหรับแสดงข้อความผิดพลาด


const handleSubmit = () => {

  if (password !== verifyPassword) {
    setError("Passwords do not match!"); // แสดงข้อความผิดพลาด
    return;
  }

  const formData = {
    email,
    firstName,
    lastName,
    password,
    permission,
    status,
  };
  console.log("Form Data as JSON:", formData);


  fetch('http://100.82.151.125:8000/AddUser', {
    method: 'POST',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      usere_mail: formData.email,
      user_firstname: formData.firstName,
      user_lastname: formData.lastName,
      user_password: formData.password,
      user_status: formData.status,
      user_role_id: formData.permission,
      user_create: data.user_id,
    }),
  })
    .then(response => response.json())
    .then(data => {
      console.log("Response from API:", data);
  
      if (data.status === 'true') {
        toast.success(data.message || "User added successfully", {
          position: "top-right",
          autoClose: 5000,
        });
        handleClose();
        fetchUserTable();
      } else if (data.status === 'error') {
        toast.error(data.message || "An error occurred", {
          position: "top-right",
          autoClose: 5000,
        });
      } else {
        console.warn("Unexpected response format:", data);
      }
    })
    .catch(error => {
      console.error("Error sending data to API:", error);
      toast.error("Failed to connect to API", {
        position: "top-right",
        autoClose: 5000,
      });
    });
  

};


const checkpopup = () => {
  toast.success('tsettt');
}



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

  const handleFilterClick = () => {
    setOpen((prevOpen) => !prevOpen);
  };

  const fetchUserTable = () => {
    fetch("http://100.82.151.125:8000/GetUserTable/")
      .then(response => response.json())
      .then(data => {
        // console.log('api : ',data);
  console.log(data)
        setRowss(
          data.user_table
            ? data.user_table.map((item) => ({
                user_id: item.user_id,
                user_firstname: item.user_firstname,
                user_lastname: item.user_lastname,
                usere_mail: item.usere_mail,
                user_role_name: item.user_role_name,
                user_createat: item.user_createat,
                user_status: item.user_status,
              }))
            : []
        );
      })
      .catch(error => console.error('Error fetching data:', error)); 
  };
  

  useEffect(() => {
    fetchUserTable();
  }, []);

  const handleEdit = async (id) => {
    console.log("Edit row with ID:", id);
    setUserIdForEdit(id)
    handleOpenEdit();

    try {
      const response = await fetch('http://100.82.151.125:8000/get_user_id/', {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          userId: id
        }),
      });
  
      if (response.ok) {
        const data = await response.json();
        console.log("User data:", data);
        setEmail(data.userData[0].usere_mail)
        setFirstName(data.userData[0].user_firstname)
        setLastName(data.userData[0].user_lastname)
        setPassword(data.userData[0].user_password)
        setPermission(data.userData[0].user_role_id)
        setStatus(data.userData[0].user_status)
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
      const response = await fetch('http://100.82.151.125:8000/DeleteUserID/', {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          "userID": id,
          "UserDeleteBy": data.user_id
        }),
      });

        const data = await response.json();
        if (data.status === 'true') {
          toast.success(data.message || "User added successfully", {
            position: "top-right",
            autoClose: 5000,
          });
          // handleCloseEdit();
          fetchUserTable();
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

  const onclosePopupEdit = () => {
    setEmail('');
    setFirstName('');
    setLastName('');
    setPassword('');
    setVerifyPassword('');
    setPermission('');
    setStatus(true); // ค่าเริ่มต้นให้เป็น true (Enable)

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


const handleSubmitEdit = () => {

  // if (password !== verifyPassword) {
  //   setError("Passwords do not match!"); // แสดงข้อความผิดพลาด
  //   return;
  // }

  const formData = {
    user_id: userIdForEdit,
    user_email : email,
    user_firstname: firstName,
    user_lastname: lastName,
    user_password: password,
    user_status: status,
    user_role_id: permission,
    user_create: data.user_id
  };


  // console.log("Form Data as JSON:", formData);


  fetch('http://100.82.151.125:8000/UpdateUser/', {
    method: 'POST',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      user_id: formData.user_id, 
      user_email: formData.user_email,
      user_firstname: formData.user_firstname,
      user_lastname: formData.user_lastname,
      user_password: formData.user_password,
      user_status: formData.user_status,  
      user_role_id: formData.user_role_id  ,
      user_create : formData.user_create
    }),
  })
    .then(response => response.json())  // แปลงผลลัพธ์เป็น JSON
    .then(data => {
      // console.log("Response from API:", data);
      if (data.status === 'true') {
        toast.success(data.message || "User added successfully", {
          position: "top-right",
          autoClose: 5000,
        });
        handleCloseEdit();
        fetchUserTable();
      } else if (data.status === 'error') {
        toast.error(data.message || "An error occurred", {
          position: "top-right",
          autoClose: 5000,
        });
      } else {
        console.warn("Unexpected response format:", data);
      }
      
    })
    .catch(error => {
      console.error("Error sending data to API:", error);
    });
  

//   console.log('editcheck')


};


  const filteredRows = rowss.filter((row) => {
    // console.log(row);
    return (
      (row.user_firstname ? row.user_firstname.toString().toLowerCase() : '').includes(searchQuery.toLowerCase()) || // ค้นหาด้วยชื่ออุปกรณ์
      (row.user_lastname ? row.user_lastname.toString().toLowerCase() : '').includes(searchQuery.toLowerCase()) || // ค้นหาด้วยระยะทางอุปกรณ์
      (row.usere_mail ? row.usere_mail.toString().toLowerCase() : '').includes(searchQuery.toLowerCase()) || // ค้นหาด้วยเวลา
      (row.user_role_name ? row.user_role_name.toString().toLowerCase() : '').includes(searchQuery.toLowerCase()) // ค้นหาด้วยสถานะ
    );
  });



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
    { field: "user_id", headerName: "ID", width: 120 },
    { field: "user_firstname", headerName: "First Name", width: 200 },
    { field: "user_lastname", headerName: "Last Name", width: 200 },
    { field: "usere_mail", headerName: "Email", width: 300 },
    { field: "user_role_name", headerName: "Role", width: 180 },
    { field: "user_createat", headerName: "Create At", width: 300 },
    {
      field: "user_status",
      headerName: "Status",
      width: 150,
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
            onClick={() => handleEdit(params.row.user_id)}
            color="primary"
            aria-label="edit"
          >
            <EditIcon />
          </IconButton>
          {/* ปุ่มลบ */}
          <IconButton
            onClick={() => handleConfirmPopupOpen(params.row.user_id)} // Open dialog with user ID
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
  getRowId={(row) => row.user_id}  
  
/>
</Box>


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


        <Popper open={open} anchorEl={anchorRef.current} placement="bottom-start" sx={{ zIndex: 1 }}>
          <Paper sx={{ padding: 2, width: '350px', marginLeft: { xs: '0px', md: '80px' }, marginTop: '30px' }}>
            <Typography variant="h6">{headerFilter}</Typography>


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



        {/* add user */}
    
        <Modal
        open={openModual}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography sx = {{textAlign : 'center'}} id="modal-modal-title" variant="h6" component="h2">
            Create User
          </Typography>
        <Divider/>

        <Box sx={{padding : 2, marginTop : 2, textAlign : 'center'}}>

        <Grid container spacing={1} sx={{marginBottom : 2}}>
      <Grid item xs={12}>
      <TextField
                label="Email"
                variant="outlined"
                fullWidth
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
      </Grid>
    </Grid>
        
        <Grid container spacing={2} sx={{marginBottom : 2}}>
      <Grid item xs={6}>
      <TextField
                label="First Name"
                variant="outlined"
                fullWidth
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
              />
      </Grid>
      <Grid item xs={6}>
      <TextField
                label="Last Name"
                variant="outlined"
                fullWidth
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
              />
      </Grid>
    </Grid>
    <Grid container spacing={1} sx={{marginBottom : 2}}>
      <Grid item xs={12}>
      <TextField
                label="Password"
                variant="outlined"
                fullWidth
                value={password}
                type = "password"
                onChange={(e) => setPassword(e.target.value)}
              />
      </Grid>
    </Grid>
    <Grid container spacing={1} sx={{marginBottom : 2}}>
      <Grid item xs={12}>
        <TextField
          id="outlined-basic"
          label="Verify Password"
          variant="outlined"
          type = "password"
          value={verifyPassword}
          onChange={(e) => setVerifyPassword(e.target.value)}
          error={password !== verifyPassword && verifyPassword !== ""} // แสดง error เมื่อไม่ตรง
          helperText={
            password !== verifyPassword && verifyPassword !== ""
              ? "Passwords do not match!"
              : ""
          } 
          fullWidth
          
        />
      </Grid>
    </Grid>

    <Grid container spacing={2} sx={{ marginBottom: 2 }}>
      {/* Permission Dropdown */}
      <Grid item xs={6}>
        <FormControl fullWidth variant="outlined">
          <InputLabel id="permission-label">Permission</InputLabel>
          <Select
            labelId="permission-label"
            id="permission-select"
           
            label="permission"
            value={permission}
            onChange={(e) => setPermission(e.target.value)}
          >
            <MenuItem value= '1'>Admin</MenuItem>
            <MenuItem value="2">Editor</MenuItem>
            
          </Select>
        </FormControl>
      </Grid>

      {/* Status Dropdown */}
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

        </Box>
        <Divider/>
        <Box sx={{display: 'flex' , justifyContent: 'space-between', marginTop : 1}}>
        <Button onClick={handleClose}>Cancel</Button>
      <Button size="large" variant="outlined" onClick={handleSubmit}>Submit</Button>

    </Box>
        
        </Box>
    
      </Modal>



{/* Edit */}

      <Modal
        open={openModualEdit}
        onClose={onclosePopupEdit}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography sx = {{textAlign : 'center'}} id="modal-modal-title" variant="h6" component="h2">
            Edit User
          </Typography>
        <Divider/>

        <Box sx={{padding : 2, marginTop : 2, textAlign : 'center'}}>

        <Grid container spacing={1} sx={{marginBottom : 2}}>
      <Grid item xs={12}>
      <TextField
                label="Email"
                variant="outlined"
                fullWidth
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
      </Grid>
    </Grid>
        
        <Grid container spacing={2} sx={{marginBottom : 2}}>
      <Grid item xs={6}>
      <TextField
                label="First Name"
                variant="outlined"
                fullWidth
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
              />
      </Grid>
      <Grid item xs={6}>
      <TextField
                label="Last Name"
                variant="outlined"
                fullWidth
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
              />
      </Grid>
    </Grid>
    <Grid container spacing={1} sx={{marginBottom : 2}}>
      <Grid item xs={12}>
      <TextField
                label="Password"
                variant="outlined"
                fullWidth
                value={password}
                type = "password"
                onChange={(e) => setPassword(e.target.value)}
              />
      </Grid>
    </Grid>
    <Grid container spacing={1} sx={{marginBottom : 2}}>
      <Grid item xs={12}>
        <TextField
          id="outlined-basic"
          label="Verify Password"
          variant="outlined"
          type = "password"
          value={verifyPassword}
          onChange={(e) => setVerifyPassword(e.target.value)}
          error={password !== verifyPassword && verifyPassword !== ""} // แสดง error เมื่อไม่ตรง
          helperText={
            password !== verifyPassword && verifyPassword !== ""
              ? "Passwords do not match!"
              : ""
          } 
          fullWidth
          
        />
      </Grid>
    </Grid>

    <Grid container spacing={2} sx={{ marginBottom: 2 }}>
      {/* Permission Dropdown */}
      <Grid item xs={6}>
        <FormControl fullWidth variant="outlined">
          <InputLabel id="permission-label">Permission</InputLabel>
          <Select
            labelId="permission-label"
            id="permission-select"
           
            label="permission"
            value={permission}
            onChange={(e) => setPermission(e.target.value)}
          >
            <MenuItem value= '1'>Admin</MenuItem>
            <MenuItem value="2">Editor</MenuItem>
            
          </Select>
        </FormControl>
      </Grid>

      {/* Status Dropdown */}
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


