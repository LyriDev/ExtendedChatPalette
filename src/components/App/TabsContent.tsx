import React, { useState, useContext } from 'react';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import { styled, createTheme, ThemeProvider } from '@mui/material/styles';
import TextareaContent from "./TextareaContent"
import { TabNameContext } from "./../../providers/App/TabNameProvider"
import { TextContext } from "./../../providers/App/TextProvider"

interface TabPanelProps {
    children?: React.ReactNode;
    index: number;
    value: number;
}

const tabsStyle: React.CSSProperties = {
    backgroundColor: '#212121',
    boxShadow: "0px 2px 4px -1px rgba(0,0,0,0.2),0px 4px 5px 0px rgba(0,0,0,0.14),0px 1px 10px 0px rgba(0,0,0,0.12)"
};

function TabPanel(props: TabPanelProps) {
    const { children, value, index, ...other } = props;

    return (
        <div
        role="tabpanel"
        hidden={value !== index}
        id={`simple-tabpanel-${index}`}
        aria-labelledby={`simple-tab-${index}`}
        style={{

            maxWidth: "600px",
        }}
        {...other}
        >
        {value === index && (
            <Box>
                <Typography>{children}</Typography>
            </Box>
        )}
        </div>
    );
}

const theme = createTheme({
    palette: {
        primary: {
            main: '#fff', // プライマリーカラーを白色に設定
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

export default function TabsContent() {
    const resourceTabNames = useContext(TabNameContext);
    const resourceTexts = useContext(TextContext);

    const [value, setValue] = useState(0);

    const handleChange = (event: React.SyntheticEvent, newValue: number) => {
        setValue(newValue);
    };

    return (
        <ThemeProvider theme={theme}>
            <Box sx={{ width: '100%' } }>
                <Box style={tabsStyle} sx={{ borderBottom: 1, borderColor: 'divider' }}>
                    <Tabs
                    value={value}
                    textColor="primary"
                    indicatorColor="primary"
                    onChange={handleChange}
                    aria-label="basic tabs example"
                    >
                        {resourceTabNames?.[0].map((tabName, index) => (
                            <Tab key={index} label={tabName} {...a11yProps(index)} />
                        ))}
                    </Tabs>
                </Box>
                {resourceTexts?.[0].map((text, index) => (
                    <TabPanel value={value} index={index}>
                        <TextareaContent index={index}/>
                    </TabPanel>
                ))}
            </Box>
        </ThemeProvider>
    );
}