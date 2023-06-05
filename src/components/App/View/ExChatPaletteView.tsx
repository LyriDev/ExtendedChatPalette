import React, { useState, useEffect, useRef, useContext } from 'react';
import ReactDOM from 'react-dom';
import Draggable from 'react-draggable';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import Box from '@mui/material/Box';
import { PaletteWindowContext } from "./../../../providers/App/PaletteWindowProvider"
import { ModalContext } from "./../../../providers/App/ModalProvider"
import FrameBox from "./FrameBox"
import ExChatPaletteEdit from './../Edit/ExChatPaletteEdit';
import HeaderView from "./HeaderView"
import TabBarView from "./TabBarView"
import ChatPaletteList from "./ChatPaletteList"

const theme = createTheme({
    palette: {
        primary: {
            main: "#fff" // プライマリーカラーを白色に設定
        },
        secondary: {
            main: "rgba(0,0,0,0)" // セカンダリーカラーを無色に設定
        },
        info: {
            main: "#2196F3" // インフォメーションカラーを青色に設定
        }
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

export default function ExChatPaletteView() {
    const [menuVisible, setMenuVisible, openMenu, closeMenu, toggleMenu] = useContext(PaletteWindowContext) || []; // 拡張チャットパレットが開いているかどうかを管理するコンテキスト
    const resource = useContext(ModalContext); // モーダルメニュー用のコンテキスト

    const menuRef: React.RefObject<HTMLDivElement> = useRef<HTMLDivElement>(null) // メニューのref
    const [width, setWidth] = useState<number>(320);
    const [height, setHeight] = useState<number>(280);
    const [positionX, setPositionX] = useState<number>((window.innerWidth - width) / 2);
    const [positionY, setPositionY] = useState<number>(-(window.innerHeight + height) / 2 );
    useEffect(()=>{ // メニューが非表示になったら、メニューを初期位置(画面中央)・初期サイズに戻しておく
        if(!menuVisible){
            setWidth(320);
            setHeight(280);
            setPositionX((window.innerWidth - width) / 2);
            setPositionY(-(window.innerHeight + height) / 2);
        }
    },[menuVisible])

    const [isDragging, setIsDragging] = useState<boolean>(false); // 拡張チャットパレットをドラッグしているかどうか

    const [focusIndex, setFocusIndex] = useState<number>(0); // フォーカスしているタブのindex(View用)

    const portal: HTMLElement = document.getElementById("portal-root-ExtendedChatPalette") || document.createElement("div")

    return (
        ReactDOM.createPortal(
            menuVisible && (
                <div>
                    <Draggable
                    position={{x: positionX, y: positionY}}
                    onDrag={(event, data) => {
                        setPositionX(data.x);
                        setPositionY(data.y);
                    }}
                    bounds={{
                        top: -window.innerHeight,
                        right: (window.innerWidth-width),
                        bottom: -height,
                        left: 0
                    }}
                    onStart={() => {setIsDragging(true)}}
                    onStop={() => {setIsDragging(false)}}
                    cancel=".draggable-disable"
                    >
                        <div
                        ref={menuRef}
                        style={{
                            position: "absolute",
                            color: "#fff",
                            backgroundColor: 'rgba(44, 44, 44, 0.87)',
                            boxShadow: "0px 6px 6px -3px rgba(0,0,0,0.2),0px 10px 14px 1px rgba(0,0,0,0.14),0px 4px 18px 3px rgba(0,0,0,0.12)",
                            cursor: isDragging ? "grabbing" : "grab",
                            minWidth: "320px",
                            minHeight: "280px",
                            width: `${width}px`,
                            height: `${height}px`,
                            resize: "both"
                        }}
                        >
                            <ThemeProvider theme={theme}>
                                <Box style={{height: "100%"}}>
                                    <div  className="MuiPaper-elevation4">
                                        <HeaderView/>
                                        <TabBarView focusIndex={focusIndex} setFocusIndex={setFocusIndex} />
                                    </div>
                                    <ChatPaletteList focusIndex={focusIndex} width={width} height={height}/>
                                </Box>
                            </ThemeProvider>
                            <FrameBox
                            width={width} setWidth={setWidth} height={height} setHeight={setHeight}
                            positionX={positionY} setPositionX={setPositionX} positionY={positionY} setPositionY={setPositionY}
                            />
                        </div>
                    </Draggable>
                    {resource?.Modal && (
                        <resource.Modal>
                            <ExChatPaletteEdit />
                        </resource.Modal>
                    )}
                </div>
            ),
            portal
        )
    );
}