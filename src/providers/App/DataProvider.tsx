// import React, { createContext, useState, useEffect, ReactNode } from 'react';
// import { getTabNames } from "../../data/DataControl"

// export const DataContext = createContext<[string[], React.Dispatch<React.SetStateAction<string[]>>] | null>(null)

// export function DataProvider({children}: {children: ReactNode}){
//     const [tabNames, setTabNames] = useState<string[]>([]);

//     useEffect(() => {
//         (async() => {
//             const response: string[] = await getTabNames()
//             setTabNames(response)
//         })()
//     }, []);

//     return (
//         <DataContext.Provider value={[tabNames, setTabNames]}>
//             {children}
//         </DataContext.Provider>
//     );
// }