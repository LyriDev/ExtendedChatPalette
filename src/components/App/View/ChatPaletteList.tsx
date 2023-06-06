import React, { useState, useEffect, useContext } from 'react';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import { DataContext } from "../../../providers/App/DataProvider"
import { styled } from '@mui/material/styles';
import { changeName, changeMessage, clickSubmitButton, MessageData, sendMessagesWithDelay } from "./../../../data/sendCcfoliaMessage"
import { ChatPalette } from "./../../../data/DataModel"

// ココフォリアのメッセージを送信する関数
function sendCcfoliaMessage(data: ChatPalette){
    if(data.isBorder === true) return; // ボーダー用のデータは無視する
    if(data.messages.length > 0){
        if(data.messages.length === 1){
            // メッセージが1つのとき
            const isChangedName: boolean = (data.characterName) ? changeName(data.characterName) : false //キャラ名を変更する
            const isChangedMessage: boolean = changeMessage(data.messages[0]) // メッセージを変更する
            if(!isChangedName && !isChangedMessage){
                // キャラ名・メッセージ、どちらも変更なければ送信する
                clickSubmitButton()
            }
        }else{
            // メッセージが複数のとき、
            const messageDataArray: MessageData[] = new Array
            data.messages.map((message, index) => {
                const currentData: MessageData = {
                    characterName: data.characterName || "",
                    messageText: message
                }
                messageDataArray.push(currentData)
            })
            sendMessagesWithDelay(messageDataArray)
        }
    }else{
        // メッセージ配列が空なら、名前だけ変更する
        changeName(data.characterName || "")
    }
}

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
    borderBottom: "solid 1px #989898",
    whiteSpace: "nowrap"
});

export default function ChatPaletteList({focusIndex, width, height, enableExDodge}: {focusIndex: number, width:number, height: number, enableExDodge: boolean}){
    const [chatPalettes, setChatPalettes] = useContext(DataContext) || [];

    const otherHeight: number = 48 + 49 + Number(enableExDodge)*48;

    const [hoveredRow, setHoveredRow] = useState<number|null>(null);
    function handleMouseEnter(index: number){
        setHoveredRow(index);
    };
    function handleMouseLeave(){
        setHoveredRow(null);
    };
    const [isClickedArray, setIsClickedArray] = useState<boolean[][]>([][]);
    useEffect(() => {
        const newArrayArray: boolean[][] = new Array;
        chatPalettes?.map((paletteList, listIndex) => (
            paletteList?.map((data, paletteIndex) => (
                data.messages?.map((message, messageIndex) => (
                    
                ))
            ))
        ))
    }, [chatPalettes])

    return (
        <div
        className="draggable-disable"
        style={{
            width: "100%",
            height: `calc(100% - ${otherHeight}px)`,
            overflow: "auto",
            cursor: "auto",
        }}
        >
            <table
            className="palette-table"
            style={{
                borderCollapse: "collapse",
                userSelect: "none"
            }}
            >
                <tbody>
                    {chatPalettes?.map((paletteList, listIndex) => (
                        <TabPanel focusIndex={focusIndex} index={listIndex}>
                            <tr><td style={{width: width}} colSpan={2}/></tr>
                            {paletteList?.map((data, paletteIndex) => (
                                (data.isBorder) ? 
                                    (
                                        <tr><td style={{borderBottom: "solid 2px #fff"}} colSpan={2}></td></tr>
                                    ) : (
                                        (data.messages.length > 0) ? (
                                            data.messages?.map((message, messageIndex) => (
                                                <tr
                                                style={{
                                                    backgroundColor: ((hoveredRow === paletteIndex) ? "rgba(255, 255, 255, 0.08)" : ""),
                                                    cursor: "pointer",
                                                }}
                                                onMouseEnter={() => handleMouseEnter(paletteIndex)}
                                                onMouseLeave={() => {handleMouseLeave()}}
                                                onClick={()=>sendCcfoliaMessage(data)}
                                                >
                                                    {(messageIndex === 0) && (
                                                        <NameTd
                                                        rowSpan={data.messages.length}
                                                        style={{
                                                            borderRight: "solid 1px #989898",
                                                            borderBottom: ((paletteList[paletteIndex+1]?.isBorder) ? "none" : "solid 1px #989898")
                                                        }}
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
                                                        <div
                                                        style={{
                                                            whiteSpace: "pre"
                                                        }}
                                                        >
                                                            {message}
                                                        </div>
                                                    </MessageTd>
                                                </tr>
                                            ))
                                        ):(
                                            <tr
                                            style={{
                                                backgroundColor: ((hoveredRow === paletteIndex) ? "rgba(255, 255, 255, 0.08)" : ""),
                                                cursor: "pointer",
                                            }}
                                            onMouseEnter={() => handleMouseEnter(paletteIndex)}
                                            onMouseLeave={handleMouseLeave}
                                            onClick={()=>sendCcfoliaMessage(data)}
                                            >
                                                <NameTd
                                                colSpan={2}
                                                style={{
                                                    maxWidth: "0",
                                                    whiteSpace: "nowrap",
                                                    overflow: "hidden",
                                                    textOverflow: "ellipsis",
                                                    borderBottom: ((paletteList[paletteIndex+1]?.isBorder) ? "none" : "solid 1px #989898")
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