import React from 'react';
import { useModal } from 'react-hooks-use-modal';
import ExChatPaletteEdit from './ExChatPaletteEdit';

export default function ExChatPaletteView() {
    const [Modal, open, close, isOpen] = useModal('root', {
        preventScroll: true,
    });
    
    return (
        <div>
            <div>Modal is Open? {isOpen ? 'Yes' : 'No'}</div>
            <button onClick={open}>OPEN</button>
            <Modal>
                <ExChatPaletteEdit close={close} />
            </Modal>
        </div>
    );
}