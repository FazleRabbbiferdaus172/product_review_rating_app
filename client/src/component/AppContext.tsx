import React, { createContext, useCallback } from "react";
import { useEffect, useState } from "react";

export const AppContext = createContext([])

export const initialData = {count: 0, result: {data: []}}

const productsUrl = "http://localhost:3000/products"
const reviewRelation = {
    urlTemplate: "http://localhost:3000/products/{}/reviews",
    key: "id",
    relation: "reviews"
}

export const AppDataProvider = ({children}) => {
    let [items, setProducts] = useState(initialData)
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [limit, setLimit] = useState(10);
    const [searchValue, setSearchValue] = useState<string>('');
    let [options, setOptions] = useState("name");


    async function setData(setterFunc: (arg0: any) => void,data: any) {
        setterFunc(data)
    }

    async function loadData(url: RequestInfo | URL, hasRelaionalData=false, relationalDataUrl: undefined, replaceWith: undefined, relationName: undefined) {
        debugger
        let currentUrl = url+`?limit=${limit}`
        if (searchValue != "") {
          currentUrl = currentUrl + "&" + options + "=" + searchValue
        }
        let data = await fetch(currentUrl)
        let dataJson = await data.json()
        if (hasRelaionalData) {
            await loadNestedData(dataJson, relationalDataUrl, replaceWith, relationName)
        }
        return dataJson
    }

    async function setLoadData(url: RequestInfo | URL, setterFunc: { (value: React.SetStateAction<{ count: number; result: { data: never[]; }; }>): void; (arg0: any): void; }, hasRelaionalData=false, relationalDataUrl: string | undefined, replateWith: string | undefined, relationName: string | undefined ) {
        const data = await loadData(url, hasRelaionalData, relationalDataUrl, replateWith, relationName)
        setData(setterFunc, data)
    }    

    // async gatherRelationalData() {}

    async function loadNestedData(data: { result: { data: any; }; }, relationalDataUrl: string | undefined, replaceWith: string | number | undefined, relationName: string | number | undefined) {
        for (let d of data.result.data) {
            let url = relationalDataUrl.replace('{}', d[replaceWith])
            let relationalData = await loadData(url, false)
            debugger
            d[relationName] = relationalData
        }
    }

    const addReview = useCallback(async (productId: any, review: any) => {
        debugger
        setLoading(true);
        setError(null);
        try {
          const res = await fetch(`http://localhost:3000/products/${productId}/reviews`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(review),
          });
          if (!res.ok) throw new Error('Failed to add review');
          await setLoadData(productsUrl, setProducts, true, reviewRelation.urlTemplate, reviewRelation.key, reviewRelation.relation);
        } catch (err: any) {
          setError(err.message);
        }
        setLoading(false);
      }, [setLoadData]);
    
    const editReview = useCallback(async (productId: number, id: number, review: any) => {
        setLoading(true);
        setError(null);
        try {
          const res = await fetch(`http://localhost:3000/products/${productId}/reviews/${id}`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(review),
          });
          if (!res.ok) throw new Error('Failed to edit review');
          await setLoadData(productsUrl, setProducts, true, reviewRelation.urlTemplate, reviewRelation.key, reviewRelation.relation);
        } catch (err: any) {
          setError(err.message);
        }
        setLoading(false);
      }, [setLoadData]);
    
    const deleteReview = useCallback(async (productId: number, id: number) => {
        setLoading(true);
        setError(null);
        try {
          const res = await fetch(`http://localhost:3000/products/${productId}/reviews/${id}`, { method: 'DELETE' });
          if (!res.ok) throw new Error('Failed to delete review');
          await setLoadData(productsUrl, setProducts, true, reviewRelation.urlTemplate, reviewRelation.key, reviewRelation.relation);
        } catch (err: any) {
          setError(err.message);
        }
        setLoading(false);
      }, [setLoadData]);

    useEffect(() => {
        setLoadData(productsUrl, setProducts, true, reviewRelation.urlTemplate, reviewRelation.key, reviewRelation.relation)
    }, [limit])


    return (
        <AppContext.Provider value={{items, loading, error, limit, setLoadData, addReview, editReview, deleteReview, setLimit, searchValue, setSearchValue, setProducts}}>
            {children}
        </AppContext.Provider>
    )
}

