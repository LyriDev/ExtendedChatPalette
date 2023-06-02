import React, { useContext } from 'react';
import Icon from "./../../svg/Icon"
import { PaletteWindowContext } from "./../../providers/App/PaletteWindowProvider"
import { ModalContext } from "./../../providers/App/ModalProvider"

interface MyComponentProps {
    isActive: boolean;
}

export default function ExChatPaletteButton({ isActive }: MyComponentProps) { // 拡張チャットパレットボタン
    const [menuVisible, setMenuVisible, openMenu, closeMenu] = useContext(PaletteWindowContext) || []; // 拡張チャットパレットが開いているかどうかを管理するコンテキスト
    const resource = useContext(ModalContext);  // モーダルメニュー用のコンテキスト

    const classNames = `exTooltip bottom MuiButtonBase-root MuiIconButton-root sc-bWXABl iZZULD ${isActive ? "" : "Mui-disabled"}`

    return (
        <div>
            <button onClick={() => resource?.open()} className={classNames} tabIndex={0} type="button" aria-label="拡張チャットパレット">
                <span className="MuiIconButton-label">
                    <Icon />
                </span>
                <span className="MuiTouchRipple-root"></span>
            </button>
        </div>
    );
}