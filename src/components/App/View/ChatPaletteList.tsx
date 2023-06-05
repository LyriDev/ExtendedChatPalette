import React, { useState, useRef, useEffect ,useContext } from 'react';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import { DataContext } from "../../../providers/App/DataProvider"
import { styled } from '@mui/material/styles';

interface TabPanelProps {
    children?: React.ReactNode;
    index: number;
    focusIndex: number;
}
function TabPanel(props: TabPanelProps) {
    const { children, focusIndex, index, ...other } = props;

    return (
        <div
        role="tabpanel"
        hidden={focusIndex !== index}
        id={`tabpanel-view-${index}`}
        aria-labelledby={`tab-view-${index}`}
        {...other}
        >
        {focusIndex === index && (
            <Box>
                <Typography>{children}</Typography>
            </Box>
        )}
        </div>
    );
}

const NameTd = styled('td')({
    padding: "8px 16px",
    borderRight: "solid 1px rgba(255, 255, 255, 0.08)",
    borderBottom: "solid 1px rgba(255, 255, 255, 0.08)"
});
const MessageTd = styled('td')({
    padding: "8px 16px",
    borderBottom: "solid 1px rgba(255, 255, 255, 0.08)",
    whiteSpace: "nowrap"
});

export default function ChatPaletteList({focusIndex, width, height}: {focusIndex: number, width:number, height: number}){
    const [chatPalettes, setChatPalettes] = useContext(DataContext) || [];

    const headerHeight: number = 97;

    return (
        <div
        style={{
            width: "100%",
            height: `calc(100% - ${headerHeight}px)`,
            overflow: "auto",
            cursor: "auto",
        }}
        >
            <table
            className="palette-table draggable-disable"
            style={{
                borderCollapse: "collapse"
            }}
            >
                <tbody>
                    {chatPalettes?.map((paletteList, listIndex) => (
                        <TabPanel focusIndex={focusIndex} index={listIndex}>
                            <tr><td style={{width: width}} colSpan={2}/></tr>
                            {paletteList?.map((data, paletteIndex) => (
                                (data.isBorder) ? 
                                    (
                                        <tr><td style={{borderBottom: "solid 1px white"}} colSpan={2}></td></tr>
                                    ) : (
                                        (data.messages.length > 0) ? (
                                            data.messages?.map((message, messageIndex) => (
                                                <tr>
                                                    {(messageIndex === 0) && (
                                                        <NameTd
                                                        rowSpan={data.messages.length}
                                                        >
                                                        <div
                                                        style={{
                                                            width: "3rem",
                                                            whiteSpace: ((data.messages.length <= 1) ? "nowrap" : "normal"),
                                                            overflow: "hidden",
                                                            textOverflow: "ellipsis"
                                                        }}>
                                                            {data.characterName}
                                                        </div>
                                                        </NameTd>
                                                    )}
                                                    <MessageTd>
                                                        {message}
                                                    </MessageTd>
                                                </tr>
                                            ))
                                        ):(
                                            <tr>
                                                <NameTd
                                                colSpan={2}
                                                style={{
                                                    maxWidth: "0",
                                                    whiteSpace: "nowrap",
                                                    overflow: "hidden",
                                                    textOverflow: "ellipsis",
                                                }}
                                                >
                                                    {data.characterName}
                                                </NameTd>
                                            </tr>
                                        )
                                    )
                            ))}
                        </TabPanel>
                    ))}
                </tbody>
            </table>
        </div>
    );
}