import React, { ReactNode } from 'react';
import { PaletteWindowProvider } from "./PaletteWindowProvider"
import { ModalProvider } from "./ModalProvider"
import { TabNameProvider } from "./TabNameProvider"
import { TextProvider } from "./TextProvider"

export default function Providers({children}: {children: ReactNode}){
    return (
        <PaletteWindowProvider>
            <TabNameProvider>
                <TextProvider>
                    <ModalProvider>
                        {children}
                    </ModalProvider>
                </TextProvider>
            </TabNameProvider>
        </PaletteWindowProvider>
    )
}