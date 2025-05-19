import { searchItem } from "./orm";

export function transformparams(params: {}, nameUpdate: Record<string, string>): searchItem[] {
    let search : searchItem[] = [];
    Object.entries(params).forEach(([k, v]) => 
        {
         let item: searchItem = k in nameUpdate ? {key: nameUpdate[k], query: v as string} : {key: k, query: v as string}
         search.push(item)
        }
    );
    return search
}

export function transformParamsToData(params: Record<string, string>, extractKeys: string[], nameUpdate: Record<string, string>): Record<string, string> {
    let newDataObj: Record<string, string> = {}
    for (let k of extractKeys) {
        if (k in params) {
            if (k in nameUpdate){
                newDataObj[nameUpdate[k]] = params[k]
            }
            else {
                newDataObj[k] = params[k]
            }
        }
    }
    return newDataObj
}

