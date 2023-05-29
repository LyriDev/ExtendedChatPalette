import React, { useContext } from 'react';
import { useModal } from 'react-hooks-use-modal';
import ExChatPaletteEdit from './ExChatPaletteEdit';
import Icon from "./../../svg/Icon"
import { ModalProvider, ModalContext } from "./../../providers/App/ModalProviders"

interface MyComponentProps {
    isActive: boolean;
}

export default function ExChatPaletteButton({ isActive }: MyComponentProps) { // 拡張チャットパレットボタン
    const resource = useContext(ModalContext);
    const classNames = `exTooltip bottom MuiButtonBase-root MuiIconButton-root sc-bWXABl iZZULD ${isActive ? "" : "Mui-disabled"}`

    return (
        <ModalProvider>
            <button onClick={() => console.log(resource)} className={classNames} tabIndex={0} type="button" aria-label="拡張チャットパレット">
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
        </ModalProvider>
    );
}