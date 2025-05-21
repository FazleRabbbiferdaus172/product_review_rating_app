import React, { createContext } from "react";

export const AppContext = createContext([])

export const AppDataProvider = ({children}) => {
    let x = "hi"
    return (
        <AppContext.Provider value={{x}}>
            {children}
        </AppContext.Provider>
    )
}

