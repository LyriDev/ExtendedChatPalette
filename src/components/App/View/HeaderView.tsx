import React, { useContext } from 'react';
import Box from '@mui/material/Box';
import IconButton from '@mui/material/IconButton';
import Close from '../../../svg/Close'
import Edit from '../../../svg/Edit'
import { ModalContext } from "../../../providers/App/ModalProvider"

export default function HeaderEdit({ isDragging, closeMenu }: {isDragging: boolean, closeMenu: () => void}) {
    const resource = useContext(ModalContext);

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
                <div>拡張チャットパレット</div>
                <Box style={{margin: "0 0 0 auto"}}>
                    <IconButton
                    edge="end"
                    color="primary"
                    aria-label="edit"
                    style={{
                        margin: "0",
                        padding: "3px"
                    }}
                    onClick={resource?.open}
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
                </Box>
            </div>
    );
}