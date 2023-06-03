import React, { useContext } from 'react';
import IconButton from '@mui/material/IconButton';
import Close from '../../../svg/Close'
import Edit from '../../../svg/Edit'
import { PaletteWindowContext } from "./../../../providers/App/PaletteWindowProvider"
import { ModalContext } from "../../../providers/App/ModalProvider"

export default function HeaderEdit({ isDragging }: {isDragging: boolean}) {
    const [menuVisible, setMenuVisible, openMenu, closeMenu] = useContext(PaletteWindowContext) || []; // 拡張チャットパレットが開いているかどうかを管理するコンテキスト
    const resource = useContext(ModalContext); // モーダルメニュー用のコンテキスト

    return (
            <div
            id="drag-handle"
            style={{
                padding: "0 24px",
                height: "48px",
                borderRadius: "4px 4px 0 0",
                display: "flex",
                alignItems: "center",
                cursor: isDragging ? "grabbing" : "grab"
            }}
            >
                <div
                    style={{
                        fontSize: "0.875rem",
                        fontWeight: "bold"
                    }}
                >
                    拡張チャットパレット
                </div>
                <div style={{margin: "0 0 0 auto"}}>
                    <IconButton
                    edge="end"
                    color="primary"
                    aria-label="edit"
                    style={{
                        margin: "0",
                        padding: "3px"
                    }}
                    onClick={()=>{
                        console.log(resource)
                        resource?.open();
                    }}
                    >
                        <Edit />
                    </IconButton>
                    <IconButton
                    edge="end"
                    color="primary"
                    aria-label="close"
                    style={{
                        margin: "0 -3px 0 4px",
                        padding: "3px"
                    }}
                    onClick={closeMenu}
                    >
                        <Close />
                    </IconButton>
                </div>
            </div>
    );
}