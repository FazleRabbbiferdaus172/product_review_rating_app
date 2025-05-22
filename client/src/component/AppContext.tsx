import React, { createContext } from "react";
import { useEffect, useState } from "react";

export const AppContext = createContext([])

export const AppDataProvider = ({children}) => {
    let x = "hi"
    let [items, setProducts] = useState({count: 0, result: {data: []}})
    
    async function loadProducts() {
        let result = await fetch('http://localhost:3000/products')
        let dataJson = await result.json()
        setProducts(dataJson)
    }

    useEffect(() => {loadProducts()}, [])

    return (
        <AppContext.Provider value={{x, items}}>
            {children}
        </AppContext.Provider>
    )
}

