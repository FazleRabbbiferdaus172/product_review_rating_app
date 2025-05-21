import { useContext } from "react"
import { AppContext } from "./AppContext"
export function Child() {
    let {x}= useContext(AppContext)
    return (
        <div>
            {x}
        </div>
    )
}