import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { Badge } from '@mui/material';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Stack from '@mui/material/Stack';
import MenuList from '@mui/material/MenuList';
import MenuItem from '@mui/material/MenuItem';
import ListItemText from '@mui/material/ListItemText';
import ListItemIcon from '@mui/material/ListItemIcon';
import Avatar from '@mui/material/Avatar';
import Divider from '@mui/material/Divider';
import { createTheme } from '@mui/material/styles';
import DashboardIcon from '@mui/icons-material/Dashboard';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import { Drawer, List, ListItem} from '@mui/material';
import { AppProvider } from '@toolpad/core/AppProvider';
import { DashboardLayout } from '@toolpad/core/DashboardLayout';
import ManageSearchIcon from '@mui/icons-material/ManageSearch';
import HistoryIcon from '@mui/icons-material/History';
import EventIcon from '@mui/icons-material/Event';
import TopicIcon from '@mui/icons-material/Topic';
import SettingsIcon from '@mui/icons-material/Settings';

import Dashboard from '../page/Dashboard';
import TankHistory from '../page/TankHistory';
import BatchHistory from '../page/BatchHistory';
import Event from '../page/Event';
import Report from '../page/Report';
import Configuration from '../page/Configuration';
import Test from '../page/Test';
import { useTheme } from '@mui/material/styles';
import { useLocation } from "react-router-dom";


import Tooltip from '@mui/material/Tooltip';
import IconButton from '@mui/material/IconButton';
import SearchIcon from '@mui/icons-material/Search';
import TextField from '@mui/material/TextField';
import { ThemeSwitcher } from '@toolpad/core/DashboardLayout';
import NotificationsIcon from '@mui/icons-material/Notifications';
import BugReportIcon from '@mui/icons-material/BugReport';
import { useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import WifiIcon from '@mui/icons-material/Wifi';
import CardDataHistory from '../component/dashboard/CardDataHistory';
import NotifyTemplate from '../component/notify/NotifyTemplate';

import { useDemoRouter } from '@toolpad/core/internal';
import {
  Account,
  AccountPreview,
  AccountPopoverFooter,
  SignOutButton,
} from '@toolpad/core/Account';
import { red } from '@mui/material/colors';
import Cookies from 'js-cookie';

const NAVIGATION = [
  {
    kind: 'header',
    title: 'Main Menu',
  },
  {
    segment: 'dashboard',
    title: 'Dashboard',
    icon: <DashboardIcon />,
  },
  {
    segment: 'TankHistory',
    title: 'Tank History',
    icon: <ManageSearchIcon />,
  },
  
  {
    segment: 'BatchHistory',
    title: 'Batch History',
    icon: <HistoryIcon />,
  },
  
  {
    segment: 'Event',
    title: 'Event',
    icon: <EventIcon />,
  },

  {
    segment: 'Report',
    title: 'Report',
    icon: <TopicIcon />,
  },

  {
    kind: 'divider'
  } ,

  {
    kind: 'header',
    title: 'User Management',
  },

  {
    segment: 'Configuration',
    title: 'Configuration',
    icon: <SettingsIcon />,
  },

  {
    segment: 'Test',
    title: 'Test Componant',
    icon: <BugReportIcon />,
  },
];

const BRANDING = {
  title: 'Petro-Instrument',
  logo: ''
};

const demoTheme = createTheme({
  cssVariables: {
    colorSchemeSelector: 'data-toolpad-color-scheme',
  },
  colorSchemes: { light: true, dark: true },
  breakpoints: {
    values: {
      xs: 0,
      sm: 900,
      md: 900,
      lg: 1200,
      xl: 1536,
    },
  },
});


function AccountSidebarPreview(props) {
  const { handleClick, open, mini } = props;
  return (
    <Stack direction="column" p={0} overflow="hidden">
      <Divider />
      <AccountPreview
        variant={mini ? 'condensed' : 'expanded'}
        handleClick={handleClick}
        open={open}
      />
    </Stack>
  );
}

AccountSidebarPreview.propTypes = {
  /**
   * The handler used when the preview is expanded
   */
  handleClick: PropTypes.func,
  mini: PropTypes.bool.isRequired,
  /**
   * The state of the Account popover
   * @default false
   */
  open: PropTypes.bool,
};


function SidebarFooterAccountPopover() {
  return (
    <Stack direction="column">
      <Typography variant="body2" mx={2} mt={1}>
        Setting
      </Typography>
      <MenuList>

          <MenuItem
          
            component="button"
            sx={{
              justifyContent: 'flex-start',
              width: '100%',
              columnGap: 2,
            }}
          >
            <ListItemIcon>
           <SettingsIcon/>
            </ListItemIcon>
            
            Configuration
            <ListItemText
              sx={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'flex-start',
                width: '100%',
              }}
            
              primaryTypographyProps={{ variant: 'body2' }}
              secondaryTypographyProps={{ variant: 'caption' }}
            />
          </MenuItem>

      </MenuList>
      <Divider />
      <AccountPopoverFooter>
        <SignOutButton />
      </AccountPopoverFooter>
    </Stack>
  );
}

const createPreviewComponent = (mini) => {
  function PreviewComponent(props) {
    return <AccountSidebarPreview {...props} mini={mini} />;
  }
  return PreviewComponent;
};

function SidebarFooterAccount({ mini }) {
  const PreviewComponent = React.useMemo(() => createPreviewComponent(mini), [mini]);
  return (
    <Account
      slots={{
        preview: PreviewComponent,
        popoverContent: SidebarFooterAccountPopover,
      }}
      slotProps={{
        popover: {
          transformOrigin: { horizontal: 'left', vertical: 'bottom' },
          anchorOrigin: { horizontal: 'right', vertical: 'bottom' },
          disableAutoFocus: true,
          slotProps: {
            paper: {
              elevation: 0,
              sx: {
                overflow: 'visible',
                filter: (theme) =>
                  `drop-shadow(0px 2px 8px ${theme.palette.mode === 'dark' ? 'rgba(255,255,255,0.10)' : 'rgba(0,0,0,0.32)'})`,
                mt: 1,
                '&::before': {
                  content: '""',
                  display: 'block',
                  position: 'absolute',
                  bottom: 10,
                  left: 0,
                  width: 10,
                  height: 10,
                  bgcolor: 'background.paper',
                  transform: 'translate(-50%, -50%) rotate(45deg)',
                  zIndex: 0,
                },
              },
            },
          },
        },
      }}
    />
  );
}


SidebarFooterAccount.propTypes = {
  mini: PropTypes.bool.isRequired,
};








function ToolbarActionsSearch() {
  

  const theme = useTheme();
  const [isDrawerOpen, setDrawerOpen] = useState(false);

  const toggleDrawer = (open) => (event) => {
    if (
      event.type === 'keydown' &&
      (event.key === 'Tab' || event.key === 'Shift')
    ) {
      return;
    }
    setDrawerOpen(open);
  };
    return (
      <>
     
     {/* <Box
        sx={{
          position: 'relative',
          borderRadius: 50,
          width: 40,
          height: 40,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          transition: 'all 0.3s ease',
          cursor: 'pointer',
          '&:hover': {
            backgroundColor: theme.palette.mode === 'dark' ? 'grey.800' : 'grey.200',
            transform: 'scale(1.01)',
          },
        }}

      >
        <WifiIcon />
        
        <Box
          sx={{
            position: 'absolute',
            top: 0,
            right: 5,
            background: '#55C34D',
            color: 'white',
            width: 8,
            height: 8,
            borderRadius: '50%',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontSize: 12,
          }}
        >
        </Box>
      </Box> */}

     <Box
        sx={{
          position: 'relative',
          borderRadius: 50,
          width: 40,
          height: 40,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          transition: 'all 0.3s ease',
          cursor: 'pointer',
          '&:hover': {
            backgroundColor: theme.palette.mode === 'dark' ? 'grey.800' : 'grey.200',
            transform: 'scale(1.01)',
          },
        }}
        onClick={toggleDrawer(true)} // เปิด Drawer เมื่อคลิก
      >
        <NotificationsIcon />
        
        <Box
          sx={{
            position: 'absolute',
            top: 0,
            right: 5,
            background: '#1565C0',
            color: 'white',
            width: 8,
            height: 8,
            borderRadius: '50%',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontSize: 12,
          }}
        >
        </Box>
      </Box>

   
      <Drawer
        anchor="right"
        open={isDrawerOpen}
        onClose={toggleDrawer(false)} // ปิด Drawer เมื่อคลิกนอก Drawer หรือปิด
      >
        <Box
          sx={{
            width: 420,
            padding: 2,
            display: 'flex',
            flexDirection: 'column',
            marginTop : 8
          }}
        >
       <NotifyTemplate/>
        </Box>
      </Drawer>

    

  
  
      <Stack direction="row" sx={{paddingLeft : 2}}>
        <Tooltip title="Search" enterDelay={1000}>
          <div>
            <IconButton
              type="button"
              aria-label="search"
              sx={{
                display: { xs: 'inline', md: 'none' },
              }}
            >
              <SearchIcon />
            </IconButton>
          </div>
        </Tooltip>
        <TextField
          label="Search"
          variant="outlined"
          size="small"
          slotProps={{
            input: {
              endAdornment: (
                <IconButton type="button" aria-label="search" size="small">
                  <SearchIcon />
                </IconButton>
              ),
              sx: { pr: 0.5 },
            },
          }}
          sx={{ display: { xs: 'none', md: 'inline-block' }, mr: 1 }}
        />
        <ThemeSwitcher />
      </Stack>
      </>
      
    );
  }


  function ToolbarActionsNotify() {
    return (
        // NotificationsIcon


        <div>asdasd</div>
    );
  }



// Dashbarod



function DashboardLayoutAccountSidebar(props) {



  const [content, setContent] = useState(< Dashboard/>); // Set initial content to FilterProduct
  const { window } = props;
  const [pathname, setPathname] = React.useState('/dashboard');
  // const [dataApi, SetDataApi] = React.useState([]);
  const navigate = useNavigate();

  const router = React.useMemo(() => {
    return {
      pathname,
      searchParams: new URLSearchParams(),
      navigate: (path) => setPathname(String(path)),
    };
  }, [pathname]);


  // console.log(demoSession)

  useEffect(() => {
    // toast.success('Welcome to Dashboard');
  }, []); // ใส่ [] เพื่อให้ทำงานครั้งเดียวเมื่อ Component ถูก mount



  useEffect(() => {
    switch (pathname) {
      case '/TankHistory':
        setContent(<TankHistory />);
        break;
      case '/BatchHistory':
        setContent(<BatchHistory />);
        break;
      case '/Event':
        setContent(<Event />);
        break;
      case '/Report':
        setContent(<Report />);
        break;
      case '/Configuration':
        setContent(<Configuration />);
        break;

        case '/Test':
          setContent(<Test />);
          break;
      default:
        setContent(<Dashboard />); // ถ้าไม่ตรงกับ path ที่ระบุ ก็จะกลับไปที่ Dashboard
        break;
    }
  }, [pathname]); // เมื่อ pathname เปลี่ยน จะทำให้ useEffect ทำงานใหม่
  


  // Remove this const when copying and pasting into your project.
  const demoWindow = window !== undefined ? window() : undefined;


const [dataApi, setDataApi] = React.useState(null); // สมมติว่าข้อมูลจะถูกตั้งค่าในภายหลัง
const [session, setSession] = React.useState(null);




React.useEffect(() => {
  const token = Cookies.get('token'); 

  if (token) {
    fetch(`http://100.82.151.125:8000/get_user_data/?token=${token}`, {
      method: 'GET',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
    })
      .then(response => {
        if (!response.ok) {
          throw new Error('Failed to fetch user data');
        }
        return response.json();
      })
      .then(data => {
        console.log('User Data:', data);
        setDataApi(data);
      })
      .catch(error => {
        console.error('Error fetching user data:', error);
        navigate('/');
      });
  } else {
    console.log('No token found. Redirecting to home...');
    // toast.error('No token found. Redirecting to home...');
    navigate("/", { state: { toastMessage: "No token found. Redirecting to home..." } });
  }
}, [pathname]);


React.useEffect(() => {
  if (dataApi) {
    const demoSession = {
      user: {
        name: dataApi.user_firstname + ' ' + dataApi.user_lastname,
        email: dataApi.usere_mail, // แก้ไข typo เป็น usere_mail -> user_email
        image: '',
      },
    };
    setSession(demoSession);
    console.log('Session updated:', demoSession); // ตรวจสอบค่าที่อัปเดต
  }
}, [dataApi]);



  const authentication = React.useMemo(() => {
    
    return {
      signIn: () => {
        setSession(demoSession);
      },
      signOut: () => {
        navigate('/');
      },
    };
  }, []);




function DemoPageContent({ pathname }) {
  return (
    <Box
      sx={{
        py: 4,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        textAlign: 'center',
      }}
    >
      {/* <Typography>Dashboard content for {pathname}</Typography> */}
      
    </Box>
  );
}

DemoPageContent.propTypes = {
  pathname: PropTypes.string.isRequired,
  
};


  return (
    <>
    <AppProvider
      navigation={NAVIGATION}
      router={router}
      theme={demoTheme}
      window={demoWindow}
      authentication={authentication}
      session={session}
      branding={BRANDING}
    >   
      <DashboardLayout defaultSidebarCollapsed
        slots={{ toolbarAccount: () => null, sidebarFooter: SidebarFooterAccount ,toolbarActions: ToolbarActionsSearch, }}
      >
        {/* <DemoPageContent pathname={pathname} />  */}
     <Box sx={{padding : 2}}>
        {content }
        </Box>
       
     </DashboardLayout>
                
                        

     </AppProvider>
     <ToastContainer/>
     </>
  );
}

DashboardLayoutAccountSidebar.propTypes = {
  window: PropTypes.func,
};

export default DashboardLayoutAccountSidebar;
