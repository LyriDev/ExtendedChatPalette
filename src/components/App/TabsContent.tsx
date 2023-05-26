import * as React from 'react';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import { styled, createTheme, ThemeProvider } from '@mui/material/styles';

interface TabPanelProps {
    children?: React.ReactNode;
    index: number;
    value: number;
}

const textareaStyle: React.CSSProperties = {
    backgroundColor: 'rgba(255, 255, 255, 0.09)',
    borderRadius: '4px',
    margin: "8px 24px"
};

function TabPanel(props: TabPanelProps) {
    const { children, value, index, ...other } = props;

    return (
        <div
        role="tabpanel"
        hidden={value !== index}
        id={`simple-tabpanel-${index}`}
        aria-labelledby={`simple-tab-${index}`}
        {...other}
        >
        {value === index && (
            <Box>
                <Typography style={textareaStyle}>{children}</Typography>
            </Box>
        )}
        </div>
    );
}

const theme = createTheme({
    palette: {
        primary: {
        main: '#fff', // プライマリーカラーを赤色に設定
        },
    },
    typography: {
        button: {
        textTransform: "none",
        fontWeight: 'bold'
        },
    },
    components: {
        MuiTab: {
        styleOverrides: {
            root: {
            color: '#bdbdbd', // 非アクティブなタブの文字色を指定
            },
        },
        },
        MuiTabs: {
        styleOverrides: {
            indicator: {
            backgroundColor: '#f50057', // 下線の色を赤に設定
            }
        }
        }
    }
});

function a11yProps(index: number) {
    return {
        id: `simple-tab-${index}`,
        'aria-controls': `simple-tabpanel-${index}`,
    };
}

export default function TabsContent({ headerStyle }: { headerStyle: React.CSSProperties }) {
    const [value, setValue] = React.useState(0);

    const handleChange = (event: React.SyntheticEvent, newValue: number) => {
        setValue(newValue);
    };

    return (
        <ThemeProvider theme={theme}>
            <Box sx={{ width: '100%' } }>
                <Box style={headerStyle} sx={{ borderBottom: 1, borderColor: 'divider' }}>
                    <Tabs
                    value={value}
                    textColor="primary"
                    indicatorColor="primary"
                    onChange={handleChange}
                    aria-label="basic tabs example"
                    >
                        <Tab label="Item One" {...a11yProps(0)} />
                        <Tab label="Item Two" {...a11yProps(1)} />
                        <Tab label="Item Three" {...a11yProps(2)} />
                    </Tabs>
                </Box>
                <TabPanel value={value} index={0}>
                Item One
                </TabPanel>
                <TabPanel value={value} index={1}>
                Item Two
                </TabPanel>
                <TabPanel value={value} index={2}>
                Item Three
                </TabPanel>
            </Box>
        </ThemeProvider>
    );
}