import { Request, Response } from "express";
import RequestSchema from "../schema/request";
import { data } from "../data";
import ORM from "../utils/orm";

export function getProducts(req: Request, res: Response) {
    const result = ORM.get({model: data}) 
    res.json(new RequestSchema(result))
}