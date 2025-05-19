import { Request, Response } from "express";
import RequestSchema from "../schema/request";
import { product } from "../data";
import {ORM, searchItem} from "../utils/orm";
import { transformQuery } from "../utils/transformQuery";

export function getProducts(req: Request, res: Response) {
    let searchQ : searchItem[] = transformQuery(req.query, {})
    const result = ORM.get({model: product, search: searchQ, sortBy: [{key: "dateAdded", order: "desc"}]}) 
    res.json(new RequestSchema(result))
}

export function getProductsByName(req: Request, res: Response) {
    let searchQ : searchItem[] = transformQuery(req.query, {q:"name"})
    const result = ORM.get({model: product, search: searchQ, sortBy: [{key: "dateAdded", order: "desc"}]})
    res.json(new RequestSchema(result))
}