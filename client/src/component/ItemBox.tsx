import { RatingBox } from "./RatingComponent"
import { AppContext } from "./AppContext"
import { useContext, useState } from "react"
import AutoSlider from "./AutoSlider"
import { RelatedListBox } from "./RelatedListBox"

export function ItemBox({data}) {
    let slides = data.reviews?.result.data ?? [{commnet: "No reviews Yet", id: -1, author: "", rating: 0}]
    let [viewState, setViewState] = useState(false)
    let [crateState, setCrateState] = useState(false)
    return (<div className="card"><div className="card">
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
            </div>
            <div className="content">
                    {data.name}
                    <AutoSlider slides={slides}/> 
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
                <RatingBox intialRating={data.avgRating}/>
            </div>
          <button className="card-footer-item"></button>
          <button onClick={() => setViewState(!viewState)} className="card-footer-item">{viewState ? "Hide reviews" : "View Reviews"}</button>

        </footer>
        
      </div>
      <div className="card">
        {viewState ? <RelatedListBox dataList={data.reviews} productId={data.id}/> : <></>}
      </div>
      
      </div>)
}