import { useContext, useState } from "react"
import { RatingBox, RatingBoxInput } from "./RatingComponent"
import { AppContext } from "./AppContext"

export function RelatedListBox({dataList, productId}) {
    return (
                <div className="pt-4">
                    {
                        dataList.result.data.map((item) => <RealtedListItemBox data={item}/>)
                    }
                    <RealtedListFormBox initialComment="" intialRating={0} productId={productId}/>
                </div>
    )
}


function RealtedListItemBox({data}) {
    let {deleteReview} = useContext(AppContext)
    let [mode, setMode] = useState(0)
    if (mode === 0) {
    return (
            <article className="media p-6">
            <figure className="media-left">
                <p className="image is-64x64">
                <img src="https://bulma.io/assets/images/placeholders/128x128.png" />
                </p>
            </figure>
            <div className="media-content">
                <div className="content">
                <p>
                    <strong>{data.author}</strong>
                    <br />
                    {data.comment}
                </p>
                </div>
                <nav className="level is-mobile media-left">
                <div className="level-left">
                    <a className="level-item">
                        <RatingBox intialRating={data.rating}/>
                    </a>
                </div>
            </nav>
            </div>
            <div className="media-right">
                <nav>
                <button className="delete level-item" onClick={() => deleteReview(data.productId, data.id)}></button>
                <button className="level-item pt-4" onClick={() => setMode(1)}><i className="fas fa-pencil-alt"></i></button>
                </nav>

            </div>
            </article>
    )}
    else {
        return (
            <RealtedListFormBox initialComment={data.comment} intialRating={data.rating} id={data.id} productId={data.productId} initialAuthor={data.author} edit={true} updateMode={setMode}/>
        )
    }
}


function RealtedListFormBox({initialComment="", intialRating=0, id="-1", productId="", initialAuthor="", edit=false, updateMode}) {
    const {addReview, editReview} = useContext(AppContext)
    let [comment, setComment] = useState(initialComment)
    let [rating, setRating] = useState(intialRating)
    let [author, setAuthor] = useState(initialAuthor)

    const handleSubmit = async (e: React.FormEvent) => {
        addReview(productId, {author: author, rating: rating, comment: comment})
        setComment(initialComment)
        setAuthor("")
        setRating(0)
      };

    const handleEdit = async (e: React.FormEvent) => {
        editReview(productId, id, {id: id, author: author, rating: rating, comment: comment})
        setComment("")
        setAuthor("")
        setRating(0)
        updateMode(0)
      };


    return (
        <article className="media p-6">
            <figure className="media-left">
                <p className="image is-64x64">
                <img src="https://bulma.io/assets/images/placeholders/128x128.png" />
                </p>
            </figure>
            <div className="media-content">
                <div className="field">
                    <p className="control">
                        <input type="text" placeholder="Author" onChange={(ev) => setAuthor(ev.target.value)} value={author} required></input>
                    </p>
                </div>
                <div className="field">
                    <p className="control">
                        <textarea required className="textarea" placeholder="Add a comment..." onChange={(ev) => setComment(ev.target.value)} value={comment}></textarea>
                    </p>
                </div>
                <div className="field">
                    <RatingBoxInput intialRating={rating} setRatingFromChild={setRating}/>
                </div>
                <nav className="level">
                <div className="level-left">
                </div>
                    <div className="level-right">
                        <div className="level-item">
                            { edit ? <a className="button is-info" onClick={handleEdit}>Save</a> :
                        <a className="button is-info" onClick={handleSubmit}>Submit</a> }
                        </div>
                    </div>

                </nav>
            </div>
        </article>
    )
}