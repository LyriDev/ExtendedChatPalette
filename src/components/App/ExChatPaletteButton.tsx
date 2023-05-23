import React from 'react';
import { useState, useEffect } from "react";
import Icon from "./../../svg/Icon"

function ExChatPaletteButton() {
    return (
        <button className="MuiButtonBase-root MuiIconButton-root sc-bWXABl iZZULD" tabIndex={0} type="button">
            <span className="MuiIconButton-label">
                <Icon />
            </span>
            <span className="MuiTouchRipple-root"></span>
        </button>
    );
}

export default ExChatPaletteButton;