import React, { useContext } from 'react';
import Box from '@mui/material/Box';
import IconButton from '@mui/material/IconButton';
import Close from '../../../svg/Close'
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { ModalContext } from "../../../providers/App/ModalProvider"
import CopyButton from "./CopyButton";

const headerStyle: React.CSSProperties = {
    backgroundColor: '#212121',
    padding: "0 24px",
    height: "64px",
    borderRadius: "4px 4px 0 0",
    display: "flex",
    alignItems: "center",
    flexDirection: "row",
    justifyContent: "space-between"
};

const theme = createTheme({
    palette: {
        primary: {
            main: '#fff', // プライマリーカラーを白色に設定
        },
    }
});

export default function HeaderEdit() {
    const resource = useContext(ModalContext);

    return (
            <div style={headerStyle}>
                <div>拡張チャットパレット</div>
                <div>
                    <CopyButton/>
                    <ThemeProvider theme={theme}>
                        <IconButton edge="end" color="primary" aria-label="close"  onClick={resource?.close} style={{margin: "0 -12px 0 auto"}}>
                            <Close />
                        </IconButton>
                    </ThemeProvider>
                </div>
            </div>
    );
}
