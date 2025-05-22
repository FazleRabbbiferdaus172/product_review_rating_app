import { useContext } from "react"
import { AppContext } from "./AppContext"
import { ItemBox } from "./ItemBox"

export function ItemList() {
    let {items} = useContext(AppContext)
    return (
        <>
            {
                items.result.data.map((item) => <ItemBox data={item}/>)
            }
        </>
    )
}