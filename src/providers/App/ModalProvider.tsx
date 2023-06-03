import React, { createContext, useContext, ReactNode } from 'react';
import { useModal, ModalWrapperProps } from 'react-hooks-use-modal';
import { saveTabData } from "../../data/DataControl"
import { TabNameContext } from "./TabNameProvider"
import { TextContext } from "./TextProvider"
import { DataContext } from "./DataProvider"
import { ChatPalette } from '../../data/DataModel';
import { convertTextArrayToJSON } from "./../../data/DataControl"

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
    const [chatPalettes, setChatPalettes] = useContext(DataContext) || [];

    const [Modal, open, close, isOpen] = useModal('portal-root-Modal', {
        preventScroll: true
    });

    async function save(): Promise<void>{ // データを保存する関数
        if(!tabNames) throw new Error("タブのデータが存在しません")
        if(!texts) throw new Error("テキストのデータが存在しません")
        if(!(chatPalettes && setChatPalettes)) throw new Error("チャパレのデータが存在しません")
        // プレーンテキストをチャパレデータに変換する
        const paletteData: ChatPalette[][] = convertTextArrayToJSON(texts)
        setChatPalettes(paletteData)
        // データベースに保存する
        await saveTabData(tabNames, texts, paletteData)
    }

    return (
        <ModalContext.Provider value={{Modal, open, close, save}}>
            {children}
        </ModalContext.Provider>
    );
}