import React from 'react';
import ExChatPaletteButton from './../../components/App/ExChatPaletteButton';
import { ModalProvider } from "./../../providers/App/ModalProvider"
import { TabNameProvider } from "./../../providers/App/TabNameProvider"
import { TextProvider } from "./../../providers/App/TextProvider"

export default function App({isActive}: {isActive: boolean}) {
    return (
        <TabNameProvider>
            <TextProvider>
                <ModalProvider>
                    <ExChatPaletteButton isActive={isActive} />
                </ModalProvider>
            </TextProvider>
        </TabNameProvider>
    );
}