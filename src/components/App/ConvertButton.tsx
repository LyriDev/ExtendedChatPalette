import React from 'react';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import Button from '@mui/material/Button';

const theme = createTheme({
    palette: {
        primary: {
            main: '#fff', // プライマリーカラーを白色に設定
        },
    }
});

// チャットパレットを拡張チャットパレット形式に変換したものを取得するボタン
export default function ConvertButton() {
    return (
        <ThemeProvider theme={theme}>
            <Button>
                拡張チャパレ変換
            </Button>
        </ThemeProvider>
    );
}