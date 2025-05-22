
function SearchPanel() {
    return (
        <nav className="panel">
            <div className="panel-block">
                <p className="control has-icons-left">
                    <input className="input" type="text" placeholder="Search" />
                    <span className="icon is-left">
                        <i className="fas fa-search" aria-hidden="true"></i>
                    </span>
                </p>
            </div>
        </nav>
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