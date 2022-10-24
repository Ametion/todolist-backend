export class ActionResultModel{
    public readonly StatusCode: string;
    public readonly Message: string;

    constructor(StatusCode: string, Message: string) {
        this.StatusCode = StatusCode;
        this.Message = Message;
    }
}