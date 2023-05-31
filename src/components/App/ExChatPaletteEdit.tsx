import React, { useState, useEffect, useContext } from 'react';
import { styled, createTheme, ThemeProvider } from '@mui/material/styles';
import Box from '@mui/material/Box';
import { ModalContext } from "./../../providers/App/ModalProvider"
import TabsContent from './TabsContent'
import HeaderEdit from './HeaderEdit'
import TabBarEdit from "./TabBarEdit"

const menuStyle: React.CSSProperties = {
    color: "#fff",
    backgroundColor: 'rgba(44, 44, 44, 0.87)',
    maxHeight: "calc(100% - 64px)",
    maxWidth: "600px",
    width: "100%"
};

const theme = createTheme({
    palette: {
        primary: {
            main: '#fff', // プライマリーカラーを白色に設定
        },
        secondary: {
            main: 'rgba(0,0,0,0)', // セカンダリーカラーを無色に設定
        },
        
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

export default function ExChatPaletteEdit() {
    const resource = useContext(ModalContext);

    const [focusIndex, setFocusIndex] = useState<number>(0);

    useEffect(() => {
        return () => {
            // アンマウントされる直前に実行される処理を記述する
            resource?.save()
        };
    });

    return (
        <div className="editMenu MuiPaper-elevation24 MuiPaper-rounded" style={menuStyle}>
            <ThemeProvider theme={theme}>
                <Box sx={{ width: '100%' } }>
                    <div className="MuiPaper-elevation4">
                        <HeaderEdit/>
                        <TabBarEdit focusIndex={focusIndex} setFocusIndex={setFocusIndex} />
                    </div>
                    <TabsContent focusIndex={focusIndex}/>
                </Box>
            </ThemeProvider>
        </div>
    );
}