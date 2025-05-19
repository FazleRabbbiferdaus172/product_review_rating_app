import express from "express"
import * as productController from "./controller/productConrtoller"
import * as reviewController from "./controller/reviewController"

const productRouter = express.Router()

// TODO: sepratate review routes
productRouter.get('/', productController.getProducts)
productRouter.get('/search', productController.getProductsByName)
productRouter.get('/:id/reviews', reviewController.getReview)
productRouter.post('/:id/reviews', reviewController.createReview)
productRouter.put('/:productId/reviews/:id', reviewController.updateReview)
productRouter.delete('/:productId/reviews/:id', reviewController.deleteReview)

export default productRouter