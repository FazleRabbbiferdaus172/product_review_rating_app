import { useContext } from "react"
import { AppContext } from "./AppContext"
import { ItemBox } from "./ItemBox"

export function Child() {
    let {x, products}= useContext(AppContext)
    if (products.count === 0) {
        return (
            <div>N/A</div>
        )
    }
    return (
        <div>
            {
                products.result.data.map(
                    (item, index) => { return (
                        <h6 key={index}>
                            {item.id}
                        </h6>)
                    }
                )
            }
            <ItemBox/>
        </div>
    )
}