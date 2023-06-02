import React, { createContext, useState, ReactNode } from 'react';

type PaletteWindowData = [
    boolean,
    React.Dispatch<React.SetStateAction<boolean>>,
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

    return (
        <PaletteWindowContext.Provider value={[menuVisible, setMenuVisible, openMenu, closeMenu]}>
            {children}
        </PaletteWindowContext.Provider>
    );
}