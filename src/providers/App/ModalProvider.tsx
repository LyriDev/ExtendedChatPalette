import React, { createContext, useContext, ReactNode } from 'react';
import { useModal, ModalWrapperProps } from 'react-hooks-use-modal';
import { saveTabData } from "../../data/DataControl"
import { TabNameContext } from "./TabNameProvider"
import { TextContext } from "./TextProvider"

type ModalData = {
    Modal: React.FC<ModalWrapperProps<Record<string, unknown>>>,
    open: () => void,
    close: () => void,
    isOpen: boolean,
    save: () => Promise<void>
}

export const ModalContext = createContext<ModalData | null>(null)

export function ModalProvider({children}: {children: ReactNode}){
    const resourceTabNames = useContext(TabNameContext);
    const resourceTexts = useContext(TextContext);

    const [Modal, open, close, isOpen] = useModal('portal-root', {
        preventScroll: true,
    });

    async function save(): Promise<void>{ // データを保存して、モーダルメニューを閉じる関数
        if(!resourceTabNames?.[0]) throw new Error("タブのデータが存在しません")
        if(!resourceTexts?.[0]) throw new Error("テキストのデータが存在しません")
        const tabNames: string[] =resourceTabNames?.[0]
        const texts: string[] = resourceTexts?.[0]
        await saveTabData(tabNames, texts)
        close()
    }

    return (
        <ModalContext.Provider value={{Modal, open, close, isOpen, save}}>
            {children}
        </ModalContext.Provider>
    );
}