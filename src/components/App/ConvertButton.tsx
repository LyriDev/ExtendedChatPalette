import React from 'react';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import Button from '@mui/material/Button';
import { convertExChatPalette, exportToClipboard } from "./../../data/DataControl"

const theme = createTheme({
    palette: {
        primary: {
            main: '#fff', // プライマリーカラーを白色に設定
        },
    }
});

// 入力されているキャラクター名を取得する関数
function getInputCharacterName(): string{
    const InputElement: HTMLInputElement | null = document.querySelector("body > div.MuiDialog-root > div.MuiDialog-container.MuiDialog-scrollPaper > div > div.MuiDialogContent-root > form > div:nth-child(1) > div:nth-child(1) > div:nth-child(2) > div > input")
    if(!InputElement) return "";
    return InputElement.value;
}

// 入力されているチャットパレットを取得する関数
function getInputChatPalette(): string{
    const TextAreaElement: HTMLTextAreaElement | null = document.querySelector("body > div.MuiDialog-root > div.MuiDialog-container.MuiDialog-scrollPaper > div > div.MuiDialogContent-root > form > div:nth-child(5) > div.MuiFormControl-root.MuiTextField-root.MuiFormControl-marginDense.MuiFormControl-fullWidth > div > textarea");
    if(!TextAreaElement) return "";
    return TextAreaElement.value;
}

// チャットパレットを拡張チャットパレット形式に変換したものを取得するボタン
export default function ConvertButton() {
    return (
        <ThemeProvider theme={theme}>
            <Button
            onClick={() => {
                const characterName: string = getInputCharacterName();
                const chatPalette: string = getInputChatPalette();
                const convertedText: string = convertExChatPalette(characterName, chatPalette);
                exportToClipboard(convertedText);
                window.alert(`「${characterName}」のチャットパレットを拡張チャットパレット形式に変換したものを、クリップボードにコピーしました。`)
            }}
            >
                拡張チャパレ変換
            </Button>
        </ThemeProvider>
    );
}