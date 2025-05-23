import fs from 'fs';
import path from 'path';

export type searchItem = {key: string, query: string}
export type sortByItem = {key: string, order: "asce"| "desc" |false}

type GetParams = {
    model: any,
    offset?: number,
    limit?: number,
    search?: searchItem[] | false,
    sortBy?: sortByItem[] | false
}

// Todo: replace Record<string, string>, object[] with better types
export class ORM {

    static sortAsce(records: object[], key: string) {
        records.sort((r1: Record<string, any>, r2: Record<string, any>) => {
            if (r1[key] < r2[key]) return -1
            if (r1[key] > r2[key]) return 1
            else return 0
        })
    }

    static sortDesc(records: object[], key: string) {
        records.sort((r1: Record<string, any>, r2: Record<string, any>) => {
            if (r1[key] < r2[key]) return 1
            if (r1[key] > r2[key]) return -1
            else return 0
        })
    }

    static orderBy(records: object[], key: string, order: string| false) {
        if (order === 'desc') ORM.sortDesc(records, key)
        else ORM.sortAsce(records, key)  
    }

    static searchRecord(records: object[], search:searchItem[]): object[] {
        let result = records.filter((record: Record<string, any>) =>
            search
                .map((si) => record[si.key] === si.query)
                .every(Boolean)
        );
        return result
    }

    static get({ model, offset = 0, limit = 10, search = false, sortBy = false }: GetParams): object[] {
            let result: object[] = model

            if (search !== false) {
                result = ORM.searchRecord(result, search)
            }

            if (sortBy) {
                sortBy.forEach(
                    (so:Record<string, any>) => {
                        ORM.orderBy(result, so.key, so.order)
                    }
                )
            }

            if(offset) {
                offset = Math.min(result.length, offset)
            }

            if (limit) {
                limit = Math.min(limit, result.length - offset)
            }
            return result.splice(offset, limit)
    }

    static create(record: Record<string, any>, model:object[]): boolean {
        model.push(record)
        return true
    }

    static delete(updateKey: Record<string, string>, model: object[]): boolean {
        const record = ORM.get({model: model, limit:1 ,search: [{key: updateKey.key, query: updateKey.value}]})[0]
        const index = model.indexOf(record)
        if (index !== -1) {
            model.splice(index, 1)
            return true
        }
        return false
    }

    static update(updateKey: Record<string, string>, newRecord: Record<string, any>, model: object[]): boolean {
        ORM.delete(updateKey, model)
        ORM.create(newRecord, model)
        return true
    }
}

// Example of using ORM
// console.log(ORM.get({
//         model: [{a: "b"}, {a: "a"}, {a: "x"},{a: "a"}],
//         search: [],
//         sortBy: [{key: "a", order: "asce"}]
//         }
//     ))
