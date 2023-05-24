import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { AppBar, Tabs, Tab, Typography, Box } from '@mui/material';
import { styled, createTheme, ThemeProvider } from '@mui/material/styles';

const TabPanelRoot = styled('div')(({ theme }) => ({
  flexGrow: 1,
  backgroundColor: theme.palette.background.paper,
}));

const TabPanelContent = styled(Box)(({ theme }) => ({
  padding: theme.spacing(3),
}));

function TabPanel(props: { children: React.ReactNode; index: number; value: number }) {
  const { children, value, index, ...other } = props;

  return (
    <TabPanelRoot
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <TabPanelContent>
          <Typography>{children}</Typography>
        </TabPanelContent>
      )}
    </TabPanelRoot>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.any.isRequired,
  value: PropTypes.any.isRequired,
};

const theme = createTheme({
  typography: {
    button: {
      textTransform: "none",
    },
  },
});

export default function SimpleTabs() {
  const [value, setValue] = useState(0);

  const handleChange = (event: React.ChangeEvent<{}>, newValue: number) => {
    setValue(newValue);
  };

  return (
    <ThemeProvider theme={theme}>
      <TabPanelRoot>
        <AppBar position="static">
          <Tabs value={value} onChange={handleChange} aria-label="simple tabs example">
            <Tab label="Item One" {...a11yProps(0)} />
            <Tab label="Item Two" {...a11yProps(1)} />
            <Tab label="Item Three" {...a11yProps(2)} />
          </Tabs>
        </AppBar>
        <TabPanel value={value} index={0}>
          Item One
        </TabPanel>
        <TabPanel value={value} index={1}>
          Item Two
        </TabPanel>
        <TabPanel value={value} index={2}>
          Item Three
        </TabPanel>
      </TabPanelRoot>
    </ThemeProvider>
  );
}

function a11yProps(index: number) {
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`,
  };
}
