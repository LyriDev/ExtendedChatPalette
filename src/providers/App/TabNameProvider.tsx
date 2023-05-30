import React, { createContext, useState, useEffect, ReactNode } from 'react';
import { getTabNames } from "../../data/DataControl"

export const TabNameContext = createContext<[string[], React.Dispatch<React.SetStateAction<string[]>>] | null>(null)

export function TabNameProvider({children}: {children: ReactNode}){
    const [tabNames, setTabNames] = useState<string[]>([]);

    useEffect(() => {
        (async() => {
            const response: string[] = await getTabNames()
            setTabNames(response)
        })()
    }, []);

    return (
        <TabNameContext.Provider value={[tabNames, setTabNames] }>
            {children}
        </TabNameContext.Provider>
    );
}