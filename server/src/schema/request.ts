import Data from "./data"

class RequestSchema {
    public count: number
    public result: Data

    constructor(data: object[]) {
        this.count = data.length
        this.result = new Data(data, "sdsd")
    }
}

export default RequestSchema