import React, { createContext } from "react";
import { useEffect, useState } from "react";

export const AppContext = createContext([])

export const initialData = {count: 0, result: {data: []}}

export const AppDataProvider = ({children}) => {
    let x = "hi"
    let [items, setProducts] = useState(initialData)


    async function setData(setterFunc,data) {
        setterFunc(data)
    }

    async function loadData(url, hasRelaionalData=false, relationalDataUrl, replaceWith, relationName) {
        let data = await fetch(url)
        let dataJson = await data.json()
        if (hasRelaionalData) {
            await loadNestedData(dataJson, relationalDataUrl, replaceWith, relationName)
        }
        debugger
        return dataJson
    }

    async function setLoadData(url, setterFunc, hasRelaionalData=false, relationalDataUrl, replateWith, relationName ) {
        const data = await loadData(url, hasRelaionalData, relationalDataUrl, replateWith, relationName)
        setData(setterFunc, data)
    }    

    // async gatherRelationalData() {}

    async function loadNestedData(data, relationalDataUrl, replaceWith, relationName) {
        for (let d of data.result.data) {
            let url = relationalDataUrl.replace('{}', d[replaceWith])
            let relationalData = await loadData(url, false)
            d[relationName] = relationalData
        }
    }

    useEffect(() => {
        setLoadData("http://localhost:3000/products", setProducts, true, "http://localhost:3000/products/{}/reviews", "id", "reviews")
    }, [])


    return (
        <AppContext.Provider value={{x, items}}>
            {children}
        </AppContext.Provider>
    )
}

