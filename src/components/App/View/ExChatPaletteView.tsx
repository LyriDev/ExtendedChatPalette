import React, { useState, useEffect, useContext } from 'react';
import ReactDOM from 'react-dom';
import Draggable, { DraggableEvent, DraggableData } from 'react-draggable';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import Box from '@mui/material/Box';
import { PaletteWindowContext } from "./../../../providers/App/PaletteWindowProvider"
import { ModalContext } from "./../../../providers/App/ModalProvider"
import ExChatPaletteEdit from './../Edit/ExChatPaletteEdit';
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

export default function ExChatPaletteView() {
    const [menuVisible, setMenuVisible, openMenu, closeMenu, toggleMenu] = useContext(PaletteWindowContext) || []; // 拡張チャットパレットが開いているかどうかを管理するコンテキスト
    const resource = useContext(ModalContext); // モーダルメニュー用のコンテキスト

    const [coordinateX, setCoordinateX] = useState<number>(0); // 拡張チャットパレットのx座標
    const [coordinateY, setCoordinateY] = useState<number>(0); // 拡張チャットパレットのx座標
    const [isDragging, setIsDragging] = useState<boolean>(false); // 拡張チャットパレットをドラッグしているかどうか
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

        /* 画面端でドラッグを止める処理 */
        const maxX = window.innerWidth - 320; // 拡張チャットパレットの幅を考慮して、x座標の最大値を設定
        const maxY = -280; // 拡張チャットパレットの高さを考慮して、y座標の最大値を設定
        let adjustedX = x;
        let adjustedY = y;
        // x座標が画面端を超えないように調整
        if (adjustedX < 0) {
            adjustedX = 0;
        } else if (adjustedX > maxX) {
            adjustedX = maxX;
        }
        // y座標が画面端を超えないように調整
        if (adjustedY < -window.innerHeight) {
            adjustedY = -window.innerHeight;
        } else if (adjustedY > maxY) {
            adjustedY = maxY;
        }

        console.log("y",y,"\nadjustedY",adjustedY,"\nmaxY",maxY)

        setCoordinateX(adjustedX);
        setCoordinateY(adjustedY);
    };

    const [focusIndex, setFocusIndex] = useState<number>(0); // フォーカスしているタブのindex(View用)

    const portal: HTMLElement = document.getElementById("portal-root-ExtendedChatPalette") || document.createElement("div")

    return (
        ReactDOM.createPortal(
            menuVisible && (
                <div>
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
                                    <div>
                                        <HeaderView isDragging={isDragging}/>
                                        {/* <TabBarView focusIndex={focusIndex} setFocusIndex={setFocusIndex} /> */}
                                    </div>
                                    {/* <TabsContent focusIndex={focusIndex}/> */}
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