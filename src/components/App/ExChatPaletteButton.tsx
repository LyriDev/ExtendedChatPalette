import React, { useContext } from 'react';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import IconButton from '@mui/material/IconButton';
import Tooltip from '@mui/material/Tooltip';
import Icon from "./../../svg/Icon"
import { PaletteWindowContext } from "./../../providers/App/PaletteWindowProvider"
import ExChatPaletteView from "./View/ExChatPaletteView"


const theme = createTheme({
    components: {
      MuiTooltip: {
        styleOverrides: {
          tooltip: {
            backgroundColor: 'black', // 背景色を黒に設定
            color: 'white', // テキスト色を白に設定（任意の色）
          },
        },
      },
    },
  });

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
        backgroundColor: isHovered ? "rgba(255, 255, 255, 0.08)" : "transparent",
        color: isActive ? "#fff" : "rgba(255, 255, 255, 0.3)",
        padding: "12px"
    };

    return (
        <ThemeProvider theme={theme}>
            <div className='iZZULD'>
                <Tooltip title="拡張チャットパレット">
                    <IconButton
                    onClick={() => {
                        if(toggleMenu) toggleMenu()
                    }}
                    tabIndex={0}
                    type="button"
                    style={style}
                    onMouseEnter={handleMouseEnter}
                    onMouseLeave={handleMouseLeave}
                    disabled={isActive ? false : true}
                    >
                        <Icon />
                    </IconButton>
                </Tooltip>
                <ExChatPaletteView/>
            </div>
        </ThemeProvider>
    );
}