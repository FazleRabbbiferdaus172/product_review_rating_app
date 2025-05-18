class Data {
    public data: object[]
    public url: string
    public next?: string
    public previous?: string

    constructor(data: object[], url: string) {
        this.data = data
        this.url = url
        this.next = "ok"
        this.previous = "ok"
    }
}

export default Data