import * as React from 'react';
import Box from '@mui/material/Box';
import Tab from '@mui/material/Tab';
import TabContext from '@mui/lab/TabContext';
import TabList from '@mui/lab/TabList';
import TabPanel from '@mui/lab/TabPanel';
import ChildAlarm from './ChildAlarm';
import ChildUser from './ChildUser';
import ChildNotify from './ChildNotify';



export default function TabEvent() {
  const [value, setValue] = React.useState('1');

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <>
    <Box sx={{ width: '100%',typography: 'body1' }}>
      <TabContext value={value}>
        <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
          <TabList onChange={handleChange} aria-label="lab API tabs example">
            <Tab label="User" value="1" />
            <Tab label="Alarm" value="2" />
            <Tab label="Notify" value="3" />

          </TabList>
        </Box>
        <TabPanel value="1">
        <ChildUser/>
          </TabPanel>
        <TabPanel value="2">
        <ChildAlarm/>
        </TabPanel>
        <TabPanel value="3">
        <ChildNotify/>
        </TabPanel> 
      </TabContext>
    </Box>
    </>
    
  );
}
