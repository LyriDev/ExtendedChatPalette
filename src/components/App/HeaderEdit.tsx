import * as React from 'react';
import IconButton from '@mui/material/IconButton';
import Close from '../../svg/Close'
import { styled, createTheme, ThemeProvider } from '@mui/material/styles';

const headerStyle: React.CSSProperties = {
    backgroundColor: '#212121',
    padding: "0 24px",
    height: "64px",
    borderRadius: "4px 4px 0 0",
    display: "flex",
    alignItems: "center",
};

const theme = createTheme({
    palette: {
        primary: {
            main: '#fff', // プライマリーカラーを白色に設定
        },
    }
});

export default function HeaderEdit({ close }: { close: () => void }) {
    return (
            <div style={headerStyle}>
                <div>拡張チャットパレット</div>
                <ThemeProvider theme={theme}>
                    <IconButton edge="end" color="primary" aria-label="close"  onClick={() => close()} style={{margin: "0 -12px 0 auto"}}>
                        <Close />
                    </IconButton>
                </ThemeProvider>
            </div>
    );
}