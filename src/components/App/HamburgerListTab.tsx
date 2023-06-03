import React, { useState, useEffect, useContext } from 'react';
import ReactDOM from 'react-dom';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import MenuItem from '@mui/material/MenuItem';
import Providers from "./../../providers/App/Providers"
import { PaletteWindowContext } from "./../../providers/App/PaletteWindowProvider"
import ExChatPaletteView from "./View/ExChatPaletteView"

const theme = createTheme({
    palette: {
        action: {
            hover: "rgba(255, 255, 255, 0.08)"
        }
    }
});

export default function HamburgerListTab() { // レスポンシブデザイン用のリスト内の拡張チャットパレット欄
    // 拡張チャットパレットが開いているかどうかを管理するコンテキスト
    const [menuVisible, setMenuVisible, openMenu, closeMenu] = useContext(PaletteWindowContext) || [];

    React.useEffect(() => {
        console.log("menuVisible_HamburgerListTab",menuVisible)
    }, [menuVisible]);

    return (
        <div>
            <ThemeProvider theme={theme}>
                <MenuItem
                onClick={(event: React.SyntheticEvent) => {
                    // メニュー表示中に、ハンバーガーリストボタンを再度クリックし、メニューを閉じる
                    const HamburgerListButton: HTMLButtonElement | null = document.querySelector("#root > div > header > div > button.MuiButtonBase-root.MuiIconButton-root.sc-eFWqGp.jBnKGh");
                    HamburgerListButton?.click();
                    if(openMenu) openMenu(); // 拡張チャットパレットを開く
                }}
                >
                    拡張チャットパレット
                </MenuItem>
            </ThemeProvider>
            <ExChatPaletteView/>
        </div>
    );
}