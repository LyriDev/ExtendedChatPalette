import React, { createContext, useContext, ReactNode } from 'react';
import { useModal, ModalWrapperProps } from 'react-hooks-use-modal';
import { saveTabData } from "../../data/DataControl"
import { TabNameContext } from "./TabNameProvider"
import { TextContext } from "./TextProvider"

type ModalData = {
    Modal: React.FC<ModalWrapperProps<Record<string, unknown>>>,
    open: () => void,
    close: () => void,
    save: () => Promise<void>
}

export const ModalContext = createContext<ModalData | null>(null)

export function ModalProvider({children}: {children: ReactNode}){
    const [tabNames, setTabNames] = useContext(TabNameContext) || [];
    const [texts, setTexts] = useContext(TextContext) || [];

    const [Modal, open, close, isOpen] = useModal('portal-root', {
        preventScroll: true
    });

    async function save(): Promise<void>{ // データを保存する関数
        if(!tabNames) throw new Error("タブのデータが存在しません")
        if(!texts) throw new Error("テキストのデータが存在しません")
        await saveTabData(tabNames, texts)
    }

    return (
        <ModalContext.Provider value={{Modal, open, close, save}}>
            {children}
        </ModalContext.Provider>
    );
}