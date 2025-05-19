import Data from "./data"

class ResponseSchema {
    public count: number
    public result: Data

    constructor(data: object[]) {
        this.count = data.length
        this.result = new Data(data, "sdsd")
    }
}

export default ResponseSchema