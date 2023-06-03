import React, { ReactNode } from 'react';
import { PaletteWindowProvider } from "./PaletteWindowProvider"
import { ModalProvider } from "./ModalProvider"
import { TabNameProvider } from "./TabNameProvider"
import { TextProvider } from "./TextProvider"
import { DataProvider } from "./DataProvider"

export default function Providers({children}: {children: ReactNode}){
    return (
        <PaletteWindowProvider>
            <TabNameProvider>
                <TextProvider>
                    <DataProvider>
                        <ModalProvider>
                            {children}
                        </ModalProvider>
                    </DataProvider>
                </TextProvider>
            </TabNameProvider>
        </PaletteWindowProvider>
    )
}