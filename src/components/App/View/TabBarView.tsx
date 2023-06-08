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

interface TabBarViewProps {
    focusIndex: number;
    setFocusIndex: React.Dispatch<React.SetStateAction<number>>;
    chatPaletteListRef: React.MutableRefObject<HTMLDivElement | null>;
    setYCoord: (tabIndex: number, yCoord: number) => void;
}
export default function TabBarView(props: TabBarViewProps) {
    const { focusIndex, setFocusIndex, chatPaletteListRef, setYCoord } = props;

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
                        className="draggable-disable"
                        onClick={() => {
                            if((focusIndex === index) && (chatPaletteListRef.current)){
                                const scrollToOptions: object = {
                                    top: 0,
                                    behavior: "smooth"
                                }
                                chatPaletteListRef.current.scrollTo(scrollToOptions);
                            }else{
                                if(chatPaletteListRef.current?.scrollTop){
                                    setYCoord(focusIndex, chatPaletteListRef.current.scrollTop);
                                }
                            }
                        }}
                    />
                ))}
            </Tabs>
        </Box>
    );
}