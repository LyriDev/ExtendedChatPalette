import React, { useContext } from 'react';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import MenuItem from '@mui/material/MenuItem';
import { PaletteWindowContext } from "./../../providers/App/PaletteWindowProvider"
import ExChatPaletteView from "./View/ExChatPaletteView"
import { hamburgerMenuButtonQuery } from '../../data/documentQueries';

const theme = createTheme({
    palette: {
        action: {
            hover: "rgba(255, 255, 255, 0.08)"
        }
    }
});

export default function HamburgerListTab() { // レスポンシブデザイン用のリスト内の拡張チャットパレット欄
    // 拡張チャットパレットが開いているかどうかを管理するコンテキスト
    const [menuVisible, setMenuVisible, openMenu, closeMenu, toggleMenu] = useContext(PaletteWindowContext) || [];

    return (
        <div>
            <ThemeProvider theme={theme}>
                <MenuItem
                onClick={(event: React.SyntheticEvent) => {
                    // メニュー表示中に、ハンバーガーリストボタンを再度クリックし、メニューを閉じる
                    const HamburgerListButton: HTMLButtonElement | null = document.querySelector(hamburgerMenuButtonQuery);
                    HamburgerListButton?.click();
                    if(toggleMenu) toggleMenu(); // 拡張チャットパレットを開く
                }}
                >
                    拡張チャットパレット
                </MenuItem>
            </ThemeProvider>
            <ExChatPaletteView/>
        </div>
    );
}