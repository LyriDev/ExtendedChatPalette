import React, { useEffect, useState } from 'react';
import ReactDOM from 'react-dom';
import { useModal } from 'react-hooks-use-modal';
import ExChatPaletteEdit from './ExChatPaletteEdit';
import Icon from "./../../svg/Icon"

interface MyComponentProps {
    isActive: boolean;
    portalRoot: HTMLElement;
}

function hoge(){
    console.log("hoge")
}

export default function ExChatPaletteButton({ isActive, portalRoot }: MyComponentProps) { // 拡張チャットパレットボタン

    const [isModalOpen, setIsModalOpen] = useState(false);

    const [Modal, open, close, isOpen] = useModal('root', {
        preventScroll: true,
    });
    
    const classNames = `exTooltip bottom MuiButtonBase-root MuiIconButton-root sc-bWXABl iZZULD ${isActive ? "" : "Mui-disabled"}`

    useEffect(() => {
        if (isModalOpen) {
            open();
        } else {
            close();
        }
    }, [isModalOpen, open, close]);

    console.log('portal-root')
    console.log(portalRoot)

    return (
        <div>
            <button onClick={() => hoge()}>hoge</button>
            <button onClick={() => setIsModalOpen(true)} className={classNames} tabIndex={0} type="button" aria-label="拡張チャットパレット">
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
                portalRoot
                )
            )}
        </div>
    );
}