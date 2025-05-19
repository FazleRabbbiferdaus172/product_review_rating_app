import { searchItem } from "./orm";

export function transformQuery(query: {}, nameUpdate: Record<string, string>): searchItem[] {
    let search : searchItem[] = [];
    Object.entries(query).forEach(([k, v]) => 
        {
         let item: searchItem = k in nameUpdate ? {key: nameUpdate[k], query: v as string} : {key: k, query: v as string}
         search.push(item)
        }
    );
    return search
}