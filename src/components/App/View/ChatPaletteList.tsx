import React, { useState, useEffect, useContext } from 'react';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import { DataContext } from "../../../providers/App/DataProvider"
import { styled } from '@mui/material/styles';
import { changeName, changeMessage, clickSubmitButton, MessageData, sendMessagesWithDelay } from "./../../../data/sendCcfoliaMessage"
import { rollDiceFromResult } from "./../../../data/rollDiceFromResult"
import { ChatPalette } from "./../../../data/DataModel"

// ココフォリアのメッセージを送信する関数
function sendCcfoliaMessage(data: ChatPalette){
    if(data.borderType > 0 ) return; // ボーダー用のデータは無視する
    if(data.messages.length > 0){
        const isChangedName: boolean = (data.characterName) ? changeName(data.characterName) : false //キャラ名を変更する
        const isChangedMessage: boolean = changeMessage(data.messages[0]) // メッセージを変更する
        if(!isChangedName && !isChangedMessage){
            // キャラ名・メッセージ、どちらも変更なければ送信する
            if(data.messages.length === 1){
                // メッセージが1つのとき
                clickSubmitButton()
            }else{
                // メッセージが複数のとき、
                const messageDataArray: MessageData[] = new Array
                data.messages.map((message, index) => {
                    const currentData: MessageData = {
                        characterName: data.characterName,
                        messageText: message
                    }
                    messageDataArray.push(currentData)
                })
                sendMessagesWithDelay(messageDataArray)
            }
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
    whiteSpace: "nowrap"
});

interface ChatPaletteListProps {
    focusIndex: number;
    width:number;
    height: number;
    enableExDodge: boolean;
    chatPaletteListRef: React.MutableRefObject<HTMLDivElement | null>;
    yCoords: number[];
    setYCoord: (tabIndex: number, yCoord: number) => void;
}
export default function ChatPaletteList(props: ChatPaletteListProps){
    const { focusIndex, width, height, enableExDodge, chatPaletteListRef, yCoords, setYCoord } = props;

    const [chatPalettes, setChatPalettes] = useContext(DataContext) || [];

    const otherHeight: number = 48 + 49 + Number(enableExDodge)*48;

    // 各タブごとのコンテンツの縦スクロール量を管理する
    useEffect(() => {
        if(chatPaletteListRef.current){
            const scrollToOptions: object = {
                left: 0,
                top: yCoords[focusIndex],
                behavior: "auto"
            }
            chatPaletteListRef.current.scrollTo(scrollToOptions);
        }
    }, [focusIndex])

    // マウスがhoverしている行を管理する
    const [hoveredRow, setHoveredRow] = useState<number>(-1);
    function handleMouseEnter(index: number){
        setHoveredRow(index);
    };
    function handleMouseLeave(){
        setHoveredRow(-1);
    };
    // マウスがclickしている行を管理する
    const [isClickedArray, setIsClickedArray] = useState<boolean[][]>([]);
    useEffect(() => {
        if(chatPalettes){
            const newArrayArray: boolean[][] = new Array;
            for(let listIndex: number = 0; listIndex < chatPalettes.length; listIndex++){
                newArrayArray.push(new Array());
                const newArray: boolean[] = new Array;
                for(let paletteIndex: number = 0; paletteIndex < chatPalettes[listIndex].length; paletteIndex++){
                    newArray.push(false);
                }
                newArrayArray.push(newArray);
            }
            setIsClickedArray(newArrayArray);
        }
    }, [chatPalettes])
    function handleMouseClick(value: boolean, listIndex: number, paletteIndex: number){
        const newArrayArray: boolean[][] = isClickedArray.slice();
        newArrayArray[listIndex][paletteIndex] = value;
        setIsClickedArray(newArrayArray)
    }
    // 適切なbackgroundColorを取得する
    function getBackgroundColor(hoveredRow: number, listIndex: number, paletteIndex: number): string{
        const isHovered: boolean = (hoveredRow === paletteIndex)
        const isClicked: boolean = isClickedArray[listIndex]?.[paletteIndex] || false;
        if(isClicked){
            return "rgba(255, 255, 255, 0.4)";
        }else if(isHovered){
            return "rgba(255, 255, 255, 0.08)";
        }else{
            return "";
        }
    }

    return (
        <div
        ref={chatPaletteListRef}
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
                                (data.borderType) ? 
                                    (
                                        <tr><td style={{borderBottom: `${(data.borderType === 2) ? "dashed" : "solid"} 2px #fff`}} colSpan={2}></td></tr>
                                    ) : (
                                        (data.messages.length > 0) ? (
                                            data.messages?.map((message, messageIndex) => (
                                                <tr
                                                style={{
                                                    backgroundColor: getBackgroundColor(hoveredRow, listIndex, paletteIndex),
                                                    cursor: "pointer",
                                                }}
                                                onMouseEnter={() => handleMouseEnter(paletteIndex)}
                                                onMouseDown={() => {handleMouseClick(true, listIndex, paletteIndex);}}
                                                onMouseUp={() => handleMouseClick(false, listIndex, paletteIndex)}
                                                onMouseLeave={() => {
                                                    handleMouseLeave();
                                                    handleMouseClick(false, listIndex, paletteIndex);
                                                }}
                                                onClick={()=>{
                                                    if(data.isUseRollResult){
                                                        if(data.messages[0] && data.messages[1]){
                                                            rollDiceFromResult(data.characterName, data.messages[0], data.messages[1]);
                                                        }
                                                    }else{
                                                        sendCcfoliaMessage(data);
                                                    }
                                                }}
                                                >
                                                    {(messageIndex === 0) && (
                                                        <NameTd
                                                        rowSpan={data.messages.length}
                                                        style={{
                                                            position: "relative",
                                                            minWidth: "3rem",
                                                            width: "3rem",
                                                            borderRight: "solid 1px #989898",
                                                            borderBottom: ((paletteList[paletteIndex+1]?.borderType) ? "none" : "solid 1px #989898"),
                                                            backgroundImage: ((data.characterName === null) ? "linear-gradient(to right top, transparent calc(50% - 0.5px), #989898 50%, #989898 calc(50% + 0.5px), transparent calc(50% + 1px))" : "")
                                                        }}
                                                        >
                                                        <div
                                                        style={{
                                                            position: "absolute",
                                                            maxHeight: "calc(-8px + 100% - 8px)",
                                                            width: "3rem",
                                                            whiteSpace: ((data.messages.length <= 1) ? "nowrap" : "normal"),
                                                            overflow: "hidden",
                                                            textOverflow: "ellipsis",
                                                        }}>
                                                            {data.characterName}
                                                        </div>
                                                        </NameTd>
                                                    )}
                                                    <MessageTd
                                                    style={{
                                                        borderBottom: (((messageIndex >= data.messages.length - 1) && (paletteList[paletteIndex+1]?.borderType)) ? "none" : "solid 1px #989898")
                                                    }}
                                                    >
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
                                                backgroundColor: getBackgroundColor(hoveredRow, listIndex, paletteIndex),
                                                cursor: "pointer",
                                            }}
                                            onMouseEnter={() => handleMouseEnter(paletteIndex)}
                                            onMouseDown={() => {handleMouseClick(true, listIndex, paletteIndex);}}
                                            onMouseUp={() => handleMouseClick(false, listIndex, paletteIndex)}
                                            onMouseLeave={() => {
                                                handleMouseLeave();
                                                handleMouseClick(false, listIndex, paletteIndex);
                                            }}
                                            onClick={()=>{
                                                if(data.isUseRollResult){
                                                    if(data.messages[0] && data.messages[1]){
                                                        rollDiceFromResult(data.characterName, data.messages[0], data.messages[1]);
                                                    }
                                                }else{
                                                    sendCcfoliaMessage(data);
                                                }
                                            }}
                                            >
                                                <NameTd
                                                colSpan={2}
                                                style={{
                                                    maxWidth: "0",
                                                    whiteSpace: "nowrap",
                                                    overflow: "hidden",
                                                    textOverflow: "ellipsis",
                                                    borderBottom: ((paletteList[paletteIndex+1]?.borderType) ? "none" : "solid 1px #989898")
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