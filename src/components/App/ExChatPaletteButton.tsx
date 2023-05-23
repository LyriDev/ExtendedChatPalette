import React from 'react';
import { useState, useEffect } from "react";
import Icon from "./../../svg/Icon"

function ExChatPaletteButton() {
    return (
        <button className="exTooltip bottom MuiButtonBase-root MuiIconButton-root sc-bWXABl iZZULD" tabIndex={0} type="button" aria-label="拡張チャットパレット">
            <span className="MuiIconButton-label">
                <Icon />
            </span>
            <span className="MuiTouchRipple-root"></span>
        </button>
    );
}

export default ExChatPaletteButton;