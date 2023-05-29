import React, { createContext, useState } from 'react';
import { useModal, ModalWrapperProps } from 'react-hooks-use-modal';

export const ModalContext = createContext<[React.FC<ModalWrapperProps<Record<string, unknown>>>, () => void, () => void, boolean] | null>(null)

/* export function ModalProvider({children, close}: {children: any, close: () => void}){
    return (
        <ModalContext.Provider value={[]}>
            {children}
        </ModalContext.Provider>
    );
} */