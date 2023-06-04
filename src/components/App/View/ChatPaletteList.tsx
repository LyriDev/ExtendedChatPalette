import React, { useContext } from 'react';
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
    boxSizing: "border-box",
    padding: "8px 16px",
    border: "solid 1px red",
    textOverflow: "ellipsis"
});
const MessageTd = styled('td')({
    boxSizing: "border-box",
    padding: "8px 16px",
    border: "solid 1px red",
    whiteSpace: "nowrap"
});

export default function ChatPaletteList({focusIndex}: {focusIndex: number}) {
    const [chatPalettes, setChatPalettes] = useContext(DataContext) || [];

    React.useEffect(()=>{
        console.log(chatPalettes)
    },[])

    return (
        <table
        className="palette-table draggable-disable"
        style={{
            width: "100%",
            height: "calc(100% - 97px)",
            overflow: "auto",
            cursor: "auto",
        }}
        >
            <tbody>
                {chatPalettes?.map((paletteList, listIndex) => (
                    <TabPanel focusIndex={focusIndex} index={listIndex}>
                        {paletteList?.map((data, paletteIndex) => (
                            (data.isBorder) ? 
                                (
                                    <tr><td style={{border: "solid 1px blue"}} colSpan={2}></td></tr>
                                ) : (
                                    (data.messages.length > 0) ? (
                                        data.messages?.map((message, messageIndex) => (
                                            <tr>
                                                {(messageIndex === 0) && (
                                                    <NameTd
                                                    rowSpan={data.messages.length}
                                                    style={{
                                                        whiteSpace: ((data.messages.length <= 1) ? "nowrap" : "normal")
                                                    }}>
                                                        {data.characterName}
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
                                            style={{whiteSpace: "nowrap"}}
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
    );
}