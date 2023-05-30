import React, { useContext } from 'react';
import ExChatPaletteEdit from './ExChatPaletteEdit';
import Icon from "./../../svg/Icon"
import { ModalContext } from "./../../providers/App/ModalProvider"

interface MyComponentProps {
    isActive: boolean;
}

export default function ExChatPaletteButton({ isActive }: MyComponentProps) { // 拡張チャットパレットボタン
    const resource = useContext(ModalContext);
    const classNames = `exTooltip bottom MuiButtonBase-root MuiIconButton-root sc-bWXABl iZZULD ${isActive ? "" : "Mui-disabled"}`

    return (
        <div>
            <button onClick={() =>resource?.open()} className={classNames} tabIndex={0} type="button" aria-label="拡張チャットパレット">
                <span className="MuiIconButton-label">
                    <Icon />
                </span>
                <span className="MuiTouchRipple-root"></span>
            </button>
            {resource?.Modal && (
                <resource.Modal>
                    <ExChatPaletteEdit />
                </resource.Modal>
            )}
        </div>
    );
}