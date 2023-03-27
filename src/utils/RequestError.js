export class RequestError extends Error {
    constructor(data){
        super('RequestError');
        this.dataRequest = data;
    }
}
