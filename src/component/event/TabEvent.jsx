import * as React from 'react';
import Box from '@mui/material/Box';
import Tab from '@mui/material/Tab';
import TabContext from '@mui/lab/TabContext';
import TabList from '@mui/lab/TabList';
import TabPanel from '@mui/lab/TabPanel';
import ChildAlarmLevel from './ChildAlarmLevel';
import ChildAlarmVolune from './ChildAlarmVolune';
import ChildSystemEvent from './ChildSystemEvent';
import ChildAlarmBatch from './ChildAlarmBatch';



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
            <Tab label="System Event" value="1" />
            <Tab label="Alarm Volume" value="2" />
            <Tab label="Alarm Level" value="3" />
            <Tab label="Alarm Batch" value="4" />
          </TabList>
        </Box>
        <TabPanel value="1">
        <ChildSystemEvent/>
          </TabPanel>
        <TabPanel value="2">
        <ChildAlarmVolune/>
        </TabPanel>
        <TabPanel value="3">
        <ChildAlarmLevel/>
        </TabPanel>
        <TabPanel value="4">
        <ChildAlarmBatch/>
        </TabPanel>
      
      </TabContext>
    </Box>
    </>
    
  );
}
