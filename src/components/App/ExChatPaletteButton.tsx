import React from 'react';
import { useModal } from 'react-hooks-use-modal';
import ExChatPaletteEdit from './ExChatPaletteEdit';
import Icon from "./../../svg/Icon"

import { getRoomData, getTabNames } from "../../data/DataControl"

interface MyComponentProps {
    isActive: boolean;
}

export default function ExChatPaletteButton({ isActive }: MyComponentProps) { // 拡張チャットパレットボタン

    const [Modal, open, close, isOpen] = useModal('portal-root', {
        preventScroll: true,
    });
    
    const classNames = `exTooltip bottom MuiButtonBase-root MuiIconButton-root sc-bWXABl iZZULD ${isActive ? "" : "Mui-disabled"}`

    return (
        <div>
            <button onClick={open} className={classNames} tabIndex={0} type="button" aria-label="拡張チャットパレット">
                <span className="MuiIconButton-label">
                    <Icon />
                </span>
                <span className="MuiTouchRipple-root"></span>
            </button>
            <Modal>
                <ExChatPaletteEdit close={close} />
            </Modal>
        </div>
    );
}