import { Request, Response } from "express";
import RequestSchema from "../schema/request";
import { data } from "../data";

export function getProducts(req: Request, res: Response) {
    res.json(new RequestSchema(data))
}