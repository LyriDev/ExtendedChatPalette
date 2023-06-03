import React, { createContext, useState, ReactNode } from 'react';

type PaletteWindowData = [
    boolean,
    React.Dispatch<React.SetStateAction<boolean>>,
    () => void,
    () => void,
    () => void
]

export const PaletteWindowContext = createContext<PaletteWindowData | null>(null)

export function PaletteWindowProvider({children}: {children: ReactNode}){
    // 拡張チャットパレットが開いているかどうかを管理する
    const [menuVisible, setMenuVisible] = useState<boolean>(false);

    function openMenu(): void{
        setMenuVisible(true);
    };

    function closeMenu(): void{
        setMenuVisible(false);
    };

    function toggleMenu(): void{
        // 既に他のExChatPaletteView(ExChatPaletteButtonが追加した方)があるかどうか
        const isAlreadyAdded: boolean = ((!menuVisible) && (document.querySelector(".viewMenu") !== null))
        if(!isAlreadyAdded) setMenuVisible(!menuVisible); // 他の方のボタンで追加してなければ、拡張チャットパレットを追加する
    };

    return (
        <PaletteWindowContext.Provider value={[menuVisible, setMenuVisible, openMenu, closeMenu, toggleMenu]}>
            {children}
        </PaletteWindowContext.Provider>
    );
}