import React, { createContext, useState } from 'react';
import { useModal, ModalWrapperProps } from 'react-hooks-use-modal';
import { saveTabData } from "./../../data/DataControl"

type ModalData = [
    React.FC<ModalWrapperProps<Record<string, unknown>>>,
    () => void,
    () => void,
    boolean,
    (tabNames: string[], texts: string[]) => Promise<void>
]

export const ModalContext = createContext<ModalData | null>(null)

export function ModalProvider({children}){
    const [Modal, open, close, isOpen] = useModal('portal-root', {
        preventScroll: true,
    });

    async function save(tabNames: string[], texts: string[]): Promise<void>{ // データを保存して、モーダルメニューを閉じる関数
        await saveTabData(tabNames, texts)
        close()
    }

    return (
        <ModalContext.Provider value={[Modal, open, close, isOpen, save]}>
            {children}
        </ModalContext.Provider>
    );
}