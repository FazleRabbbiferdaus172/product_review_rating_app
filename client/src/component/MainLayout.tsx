import { useContext, useState } from "react"
import { AppContext } from "./AppContext"

const productsUrl = "http://localhost:3000/products"
const reviewRelation = {
    urlTemplate: "http://localhost:3000/products/{}/reviews",
    key: "id",
    relation: "reviews"
}

function SearchPanel() {
    let {options, setOptions, setLoadData, searchValue, setSearchValue, setProducts} = useContext(AppContext)
    let [] = useState("name")

    const handleSelectChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        setOptions(e.target.value.toLowerCase());
    };

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setSearchValue(e.target.value);
      };

    const handleSearch = () => {
        debugger
        setLoadData(productsUrl, setProducts, true, reviewRelation.urlTemplate, reviewRelation.key, reviewRelation.relation)
        // Perform search with these values
      };

    return (
            <div className="field has-addons">
                    <p className="control">
                        <span className="select">
                            <select onChange={handleSelectChange} value={options}>
                                <option value="name">Name</option>
                                <option value="category">Category</option>
                            </select>
                        </span>
                    </p>
                    <p className="control is-expanded">
                        <input className="input" type="text" placeholder="......" value={searchValue} onChange={handleInputChange}/>
                    </p>
                    <p className="control">
                        <button className="button" onClick={handleSearch}>
                            search
                        </button>
                    </p>
                </div>
    )
}


export function PageLayout({children}) {

    return (
        <div className="container">
            <section className="section is-small pb-1">
                <SearchPanel/>
            </section>
            <section className="section is-large pt-2 pb-1 px-6">
                {children}
            </section>
            
        </div>
    )
}