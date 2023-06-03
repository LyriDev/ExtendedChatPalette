import React, { useState, useEffect, useContext, useRef, RefObject, createRef } from 'react';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Box from '@mui/material/Box';
import { TabNameContext } from "../../../providers/App/TabNameProvider"

const tabsStyle: React.CSSProperties = {
    backgroundColor: "transparent",
};

function a11yProps(index: number) {
    return {
        id: `ExChatPalette-tab-${index}`,
        'aria-controls': `ExChatPalette-tabpanel-${index}`,
    };
}

export default function TabBarView({focusIndex, setFocusIndex}: {focusIndex: number, setFocusIndex: React.Dispatch<React.SetStateAction<number>>}) {
    const [tabNames, setTabNames] = useContext(TabNameContext) || [];

    const handleTabChange = (event: React.SyntheticEvent, newValue: number) => {
        setFocusIndex(newValue);
    };

    return (
        <Box style={tabsStyle} sx={{ borderBottom: 1, borderColor: 'divider' }}>
            <Tabs
            value={focusIndex}
            textColor="primary"
            variant="scrollable"
            scrollButtons="auto"
            onChange={handleTabChange}
            aria-label="ExChatPalette View Tabs"
            >
                {tabNames?.map((tabName, index) => (
                        <Tab
                        key={index}
                        label={tabName}
                        {...a11yProps(index)}
                        sx={{ padding: '6px 12px', minHeight: "48px" ,minWidth: "0" }}
                    />
                ))}
            </Tabs>
        </Box>
    );
}