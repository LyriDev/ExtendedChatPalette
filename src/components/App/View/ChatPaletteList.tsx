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
});
const MessageTd = styled('td')({
    padding: "8px 16px",
    whiteSpace: "nowrap"
});

export default function ChatPaletteList({focusIndex, width, height}: {focusIndex: number, width: number, height: number}) {
    const [chatPalettes, setChatPalettes] = useContext(DataContext) || [];

    const headerHeight: number = 97;
    const tableRef = useRef<HTMLTableElement>(null); // table要素を保管するためのref
    const [tableHeight, setTableHeight] = useState<number>(280 -headerHeight); // tableの高さ
    const [heightDifference, setHeightDifference] = useState<number>(0); // ChatPaletteListとtableの高さの差

    useEffect(()=>{
        const newTableHeight: number = tableRef.current?.getBoundingClientRect().height || 280;
        setTableHeight(newTableHeight)
    },[tableRef])
    useEffect(()=>{
        const newHeightDifference: number = height - headerHeight - tableHeight;
        if(newHeightDifference > 0){
            setHeightDifference(newHeightDifference);
        }else{
            setHeightDifference(0);
        }
        console.log(
`${Boolean(newHeightDifference > 0)}

height: ${height}
tableHeight: ${tableHeight}
heightDifference: ${newHeightDifference}

height - headerHeight - tableFirstHeight
${height} - ${headerHeight} - ${tableHeight}
`
        )
    },[height])

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
                height: `${tableHeight}px`,
                borderCollapse: "collapse"
            }}
            >
                <tbody>
                    {chatPalettes?.map((paletteList, listIndex) => (
                        <TabPanel focusIndex={focusIndex} index={listIndex}>
                            <tr><td colSpan={2} style={{width: `${width}px`}}></td></tr>
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
                                                            textOverflow: "ellipsis",
                                                            color: (paletteIndex === paletteList.length - 1)?"red":"white"
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
                            <tr><td><div style={{height: `${heightDifference}px`}}></div></td><td></td></tr>
                        </TabPanel>
                    ))}
                </tbody>
            </table>
        </div>
    );
}