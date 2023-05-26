import React, { useEffect, useState } from 'react';
import ReactDOM from 'react-dom';
import { useModal } from 'react-hooks-use-modal';
import ExChatPaletteEdit from './ExChatPaletteEdit';
import Icon from "./../../svg/Icon"

interface MyComponentProps {
    isActive: boolean;
}

export default function ExChatPaletteButton({ isActive }: MyComponentProps) { // 拡張チャットパレットボタン

    const [Modal, open, close, isOpen] = useModal('root', {
        preventScroll: true,
    });
    
    const classNames = `exTooltip bottom MuiButtonBase-root MuiIconButton-root sc-bWXABl iZZULD ${isActive ? "" : "Mui-disabled"}`

    console.log('portal-root')
    console.log(document.createElement('portal-root'))

    return (
        <div>
            <button onClick={open} className={classNames} tabIndex={0} type="button" aria-label="拡張チャットパレット">
                <span className="MuiIconButton-label">
                    <Icon />
                </span>
                <span className="MuiTouchRipple-root"></span>
            </button>
            {isOpen && (
                ReactDOM.createPortal(
                <Modal>
                    <ExChatPaletteEdit close={close} />
                </Modal>,
                document.getElementById('portal-root') as HTMLElement
                )
            )}
        </div>
    );
}