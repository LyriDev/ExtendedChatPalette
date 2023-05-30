import React, { createContext, useState, useEffect, ReactNode } from 'react';
import { getTexts } from "../../data/DataControl"

export const TextContext = createContext<[string[], React.Dispatch<React.SetStateAction<string[]>>] | null>(null)

export function TextProvider({children}: {children: ReactNode}){
    const [texts, setTexts] = useState<string[]>([]);

    useEffect(() => {
        (async() => {
            const response: string[]= await getTexts()
            setTexts(response)
        })()
    }, []);

    return (
        <TextContext.Provider value={[texts, setTexts] }>
            {children}
        </TextContext.Provider>
    );
}