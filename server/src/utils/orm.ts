export type searchItem = {key: string, query: string}
export type sortByItem = {key: string, order: "asce"| "desc" |false}

type GetParams = {
    model: object[],
    offset?: number,
    limit?: number,
    search?: searchItem[] | false,
    sortBy?: sortByItem[] | false
}

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

    static delete(record: Record<string, any>, model: object[]): boolean {
        const index = model.indexOf(record)
        if (index !== -1) {
            model.slice(index, 1)
            return true
        }
        return false
    }

    static update(record: Record<string, any>, newRecord: Record<string, any>, model: object[]): boolean {
        ORM.delete(record, model)
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
