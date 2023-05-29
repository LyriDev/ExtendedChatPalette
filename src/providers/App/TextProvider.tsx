import React, { createContext, useState, useEffect } from 'react';
import { getTexts } from "../../data/DataControl"

export const TextContext = createContext<[string[], React.Dispatch<React.SetStateAction<string[]>>] | null>(null)

export function TextProvider({children}){
    const [texts, setTexts] = useState<string[]>([]);

    useEffect(() => {
        const receivedData: string[] = getTexts()
        setTexts(receivedData)
    }, []);

    return (
        <TextContext.Provider value={[texts, setTexts] }>
            {children}
        </TextContext.Provider>
    );
}