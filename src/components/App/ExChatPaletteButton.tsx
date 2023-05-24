import React from 'react';
import Icon from "./../../svg/Icon"

interface MyComponentProps {
    isActive: boolean;
}

function ExChatPaletteButton({ isActive }: MyComponentProps) { // 拡張チャットパレットボタン
    const classNames = `exTooltip bottom MuiButtonBase-root MuiIconButton-root sc-bWXABl iZZULD ${isActive ? "" : "Mui-disabled"}`

    return (
        <button className={classNames} tabIndex={0} type="button" aria-label="拡張チャットパレット">
            <span className="MuiIconButton-label">
                <Icon />
            </span>
            <span className="MuiTouchRipple-root"></span>
        </button>
    );
}

export default ExChatPaletteButton;