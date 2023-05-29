import React, { createContext, useState, useEffect } from 'react';
import { getTabNames } from "../../data/DataControl"

export const TabNameContext = createContext<[string[], React.Dispatch<React.SetStateAction<string[]>>] | null>(null)

export function TabNameProvider({children}){
    const [tabNames, setTabNames] = useState<string[]>([]);

    useEffect(() => {
        const receivedData: string[] = getTabNames("")
        setTabNames(receivedData)
    }, []);

    return (
        <TabNameContext.Provider value={[tabNames, setTabNames] }>
            {children}
        </TabNameContext.Provider>
    );
}