import React, { useContext } from 'react';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import IconButton from '@mui/material/IconButton';
import Icon from "./../../svg/Icon"
import { PaletteWindowContext } from "./../../providers/App/PaletteWindowProvider"
import ExChatPaletteView from "./View/ExChatPaletteView"

interface MyComponentProps {
    isActive: boolean;
}

export default function ExChatPaletteButton({ isActive }: MyComponentProps) { // 拡張チャットパレットボタン
    const [menuVisible, setMenuVisible, openMenu, closeMenu, toggleMenu] = useContext(PaletteWindowContext) || []; // 拡張チャットパレットが開いているかどうかを管理するコンテキスト

    const [isHovered, setIsHovered] = React.useState(false);
    const handleMouseEnter = () => {
        setIsHovered(true);
    };
    const handleMouseLeave = () => {
        setIsHovered(false);
    };
    const style = {
        backgroundColor: isHovered ? "rgba(255, 255, 255, 0.08)" : "rgba(0, 0, 0, 0.00)",
        color: isActive ? "#fff" : "rgba(255, 255, 255, 0.3)",
        padding: "12px"
    };

    return (
        <div>
            <IconButton
            onClick={() => {
                if(toggleMenu) toggleMenu()
            }}
            className="exTooltip bottom"
            tabIndex={0}
            type="button"
            aria-label="拡張チャットパレット"
            style={style}
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
            disabled={isActive ? false : true}
            >
                <Icon />
            </IconButton>
            <ExChatPaletteView/>
        </div>
    );
}