import React, { useState, useEffect, useContext } from 'react';
import ReactDOM from 'react-dom';
import Draggable, { DraggableEvent, DraggableData } from 'react-draggable';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import Box from '@mui/material/Box';
import { PaletteWindowContext } from "./../../../providers/App/PaletteWindowProvider"
import { ModalContext } from "./../../../providers/App/ModalProvider"
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

    const menuWidth = 320; // 拡張チャットパレットメニューの横幅
    const menuHeight = 280; // 拡張チャットパレットメニューの縦幅
    const [isDragging, setIsDragging] = useState<boolean>(false); // 拡張チャットパレットをドラッグしているかどうか

    const [focusIndex, setFocusIndex] = useState<number>(0); // フォーカスしているタブのindex(View用)

    const portal: HTMLElement = document.getElementById("portal-root-ExtendedChatPalette") || document.createElement("div")

    return (
        ReactDOM.createPortal(
            menuVisible && (
                <div>
                    <Draggable
                    defaultPosition={{x: (window.innerWidth-menuWidth)/2, y: -(window.innerHeight+menuHeight)/2}}
                    bounds={{
                        top: -window.innerHeight,
                        right: (window.innerWidth-menuWidth),
                        bottom: -menuHeight,
                        left: 0
                    }}
                    // onDrag={(event: DraggableEvent, data: DraggableData)=>{console.log("x",data.x,"y",data.y,"\ninnerWidth",window.innerWidth,"innerHeight",window.innerHeight)}}
                    onStart={() => {setIsDragging(true)}}
                    onStop={() => {setIsDragging(false)}}
                    cancel=".draggable-disable"
                    >
                        <div
                        style={{
                            position: "absolute",
                            color: "#fff",
                            backgroundColor: 'rgba(44, 44, 44, 0.87)',
                            boxShadow: "0px 6px 6px -3px rgba(0,0,0,0.2),0px 10px 14px 1px rgba(0,0,0,0.14),0px 4px 18px 3px rgba(0,0,0,0.12)",
                            cursor: isDragging ? "grabbing" : "grab",
                            minWidth: "320px",
                            minHeight: "280px",
                            width: "320px",
                            height: "280px",
                            // resize: "both"
                        }}
                        >
                            <ThemeProvider theme={theme}>
                                <Box style={{height: "100%"}}>
                                    <div  className="MuiPaper-elevation4">
                                        <HeaderView/>
                                        <TabBarView focusIndex={focusIndex} setFocusIndex={setFocusIndex} />
                                    </div>
                                    <ChatPaletteList focusIndex={focusIndex}/>
                                </Box>
                            </ThemeProvider>
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