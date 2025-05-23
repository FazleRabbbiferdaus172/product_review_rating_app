type Product = {id: string, name: string, category: string, dateAdded: string}
type Review = {id: string, author: string, comment: string, productId: string, rating: 0 | 1 | 2 | 3 | 4 | 5}

export const product:Product[] = [
]

for (let i=1; i <= 100; i ++) {

    product.push({id: `${i}`, name: "a", category: "a", dateAdded: `02/12/199${i}`})
}

product.push({id: "100", name: "b", category: "b", dateAdded: "02/12/2000"})

export const review: Review[] = []

for (let i=1; i <= 100; i++) {
    review.push(
        {
            id: `${i}`,
            author: "a",
            comment: "a",
            productId: `${i}`,
            rating: 5
        }
    )
}

review.push(
    {
        id: "101",
        author: "a",
        comment: "b",
        productId: "99",
        rating: 5
    }
)