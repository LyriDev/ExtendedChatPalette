import React, { useState, useEffect } from 'react';
import Draggable, { DraggableEvent, DraggableData } from 'react-draggable';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import Box from '@mui/material/Box';
import HeaderView from "./HeaderView"

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

export default function ExChatPaletteView({menuVisible, closeMenu}: {menuVisible: boolean, closeMenu: () => void}) {
    const [coordinateX, setCoordinateX] = useState<number>(0); // 拡張チャットパレットのx座標
    const [coordinateY, setCoordinateY] = useState<number>(0); // 拡張チャットパレットのx座標
    const [isDragging, setIsDragging] = useState<boolean>(false); // 拡張チャットパレットをドラッグしているかどうか

    const [focusIndex, setFocusIndex] = useState<number>(0); // フォーカスしているタブのindex

    useEffect(() => {
        // 拡張チャットパレットが非表示になったら、
        if(!menuVisible){
            // 拡張チャットパレットを画面中央の位置に戻しておく
            setCoordinateX((window.innerWidth-320)/2);
            setCoordinateY(-(window.innerHeight+280)/2);
        }
    }, [menuVisible]);

    function handleDrag(event: DraggableEvent, data: DraggableData): void{ // 拡張チャットパレットを指定位置に移動する関数
        const { x, y } = data;
        setCoordinateX(x);
        setCoordinateY(y);
    };

    return (
        <Draggable
        position={{x: coordinateX, y: coordinateY}}
        onDrag={handleDrag}
        onStart={() => {setIsDragging(true)}}
        onStop={() => {setIsDragging(false)}}
        handle="#drag-handle"
        >
            <div
            style={{
                visibility: menuVisible ? "visible" : "hidden",
                position: "absolute",
                color: "#fff",
                backgroundColor: 'rgba(44, 44, 44, 0.87)',
                minWidth: "320px",
                minHeight: "280px",
                boxShadow: "0px 6px 6px -3px rgba(0,0,0,0.2),0px 10px 14px 1px rgba(0,0,0,0.14),0px 4px 18px 3px rgba(0,0,0,0.12)"
            }}
            >
                <ThemeProvider theme={theme}>
                    <Box>
                        <div className="test">
                            <b
                            style={{
                                cursor: isDragging ? "grabbing" : "grab",
                            }}
                            >ここをつかんで移動</b>
                            <p>ドラッグで移動したい要素</p>
                            <button onClick={() => {closeMenu()}}>閉じる</button>
                        </div>
                        <div>
                            <HeaderView isDragging={isDragging} closeMenu={closeMenu}/>
                            {/* <TabBarView focusIndex={focusIndex} setFocusIndex={setFocusIndex} /> */}
                        </div>
                        {/* <TabsContent focusIndex={focusIndex}/> */}
                    </Box>
                </ThemeProvider>
            </div>
        </Draggable>
    );
}