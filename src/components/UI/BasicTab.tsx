import { useState } from 'react';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Box from '@mui/material/Box';
import { TabPanel } from 'components';

interface BasicTapProps {
  tabLabels: string[];
  tabComponents: JSX.Element[];
}

const BasicTabs = ({ tabLabels, tabComponents }: BasicTapProps) => {
  const [tabValue, setTabValue] = useState(0);

  const handleChange = (_event: React.SyntheticEvent, newValue: number) => {
    setTabValue(newValue);
  };

  return (
    <Box sx={{ width: '100%' }}>
      <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
        <Tabs value={tabValue} onChange={handleChange}>
          {tabLabels.map((label) => (
            <Tab label={label} key={label} />
          ))}
        </Tabs>
      </Box>
      {tabComponents.map((component, index) => (
        // index won't change.
        // eslint-disable-next-line react/no-array-index-key
        <TabPanel value={tabValue} index={index} key={index}>
          {component}
        </TabPanel>
      ))}
    </Box>
  );
};

export default BasicTabs;
