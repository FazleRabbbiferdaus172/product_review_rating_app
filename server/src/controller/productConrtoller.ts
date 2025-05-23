import { Request, Response } from "express";
import ResponseSchema from "../schema/request";
import { product, review } from "../data";
import {ORM, searchItem} from "../utils/orm";
import { transformQuery } from "../utils/transformQuery";


function getAverageRating(id: string): { avgRating: number } {
    const searchQ = [{ key: "productId", query: id }];
    const result: any[] = ORM.get({ model: review, search: searchQ });
    
    if (result.length === 0) {
        return { avgRating: 0 }; // Handle case with no reviews
    }
    
    const totalRating = result.reduce((sum, review) => sum + review.rating, 0);
    return { avgRating: Math.round(totalRating / result.length) };
}

export function getProducts(req: Request, res: Response): void {
    let searchQ: any[] = transformQuery(req.query, {});
    
    const products: any[] = ORM.get({
        model: product,
        search: searchQ,
        sortBy: [{ key: "dateAdded", order: "desc" }],
        limit: Math.max(1, parseInt(req.query.limit?.toString() || '10') || 10),
        offset: Math.max(0, parseInt(req.query.offset?.toString() || '0') || 0),
    });
    
    const productsWithRatings = products.map(product => ({
        ...product,
        ...getAverageRating(product.id)
    }));
    
    res.json(new ResponseSchema(productsWithRatings))
}

export function getProductsByName(req: Request, res: Response) {
    let searchQ : searchItem[] = transformQuery(req.query, {q:"name"})
    const result = ORM.get({model: product, search: searchQ, sortBy: [{key: "dateAdded", order: "desc"}]})
    res.json(new ResponseSchema(result))
}