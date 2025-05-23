import { useContext } from "react"
import { AppContext } from "./AppContext"
import { ItemBox } from "./ItemBox"

export function ItemList() {
    let {items, limit, setLimit} = useContext(AppContext)
    return (
        <>
            {
                items.result.data.map((item) => <ItemBox data={item}/>)
            }
            <button onClick={() => setLimit(limit+10)} className="has-text-primary button is-large is-fullwidth pb-2">...Click to Load more</button>
        </>
    )
}