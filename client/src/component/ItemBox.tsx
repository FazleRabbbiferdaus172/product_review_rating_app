import { RatingBox } from "./RatingComponent"

export function ItemBox({data}) {
    return (<div className="card">
        <header className="card-header">
          <div className="card-header-title">
            <span>
                {data.name}
            </span>

        
        </div>
          
          <button className="card-header-icon" aria-label="more options">
            <span className="icon">
              <i className="fas fa-angle-down" aria-hidden="true"></i>
            </span>
          </button>
        </header>
        <div className="card-content">
            <div className="content">
                <div className="is-pulled-right">
                    <span className="subtitle is-6 pr-1">Category:</span>
                    <span className="tag">{
                        data.category}
                    </span>
                </div>
                <div className="is-pulled-left">
                    <span className="subtitle is-6 pr-1">
                        Price:
                    </span>
                    <span>
                        {data.price ?? 0}
                    </span>
                </div>
            </div>
            <div className="content">
                    {data.name}
            </div>
            <div className="content is-pulled-right">
                <span >
                    Last Updated:  
                </span>
                <time dateTime="2016/1/1" className="pl-1">{data.dateAdded}</time>
            </div>
        </div>
        <footer className="card-footer">
            <div className="card-footer-item">
                <RatingBox/>
            </div>
          <a href="#" className="card-footer-item">Edit</a>
          <a href="#" className="card-footer-item">Delete</a>
        </footer>
      </div>)
}