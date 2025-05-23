import {Request, Response} from "express"
import ResponseSchema from "../schema/request"
import { transformparams, transformParamsToData } from "../utils/transformParams"
import { review } from "../data"
import { ORM, searchItem } from "../utils/orm" 


export function getReview(req: Request, res: Response) {
    const searchP = transformparams(req.params, {id: "productId"})
    const response = new ResponseSchema(ORM.get({model: review, search: searchP}))
    res.json(response)
}

export function createReview(req: Request, res: Response) {
    const paramsToData = transformParamsToData(req.params, ["id"], {id: "productId"})
    const newRecord = {...req.body, ...paramsToData}
    const isCreated = ORM.create(newRecord, review)
    if (isCreated) {
        const searchConditions: searchItem[] = [{key: "id", query: newRecord.id}]
        const response = new ResponseSchema(ORM.get({model: review, search: searchConditions}))
        res.json(response)
    } else {
        // todo: should raise err with correct core
        res.json("can not created")
    }
}

export function updateReview(req: Request, res: Response) {
    const paramsToData = transformParamsToData(req.params, ["id", "productId"], {})
    const updatedRecord = {...req.body, ...paramsToData}
    const isUpdated = ORM.update({key: "id", value: req.params.id}, updatedRecord, review)
    if (isUpdated) {
        const searchConditions: searchItem[] = [{key: "id", query: updatedRecord.id}]
        const response = new ResponseSchema(ORM.get({model: review, search: searchConditions}))
        res.json(response)
    }
    else {
        res.json("can not update")
    }
}

export function deleteReview(req: Request, res: Response) {
    const isDeleted = ORM.delete({key: "id", value: req.params.id}, review)
    if (isDeleted) {
        const response = new ResponseSchema(ORM.get({model: review}))
        res.json(response)
    }
    else {
        res.json("can not delete")
    }
}