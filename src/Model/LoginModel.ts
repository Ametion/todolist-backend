export class LoginModel{
    public readonly IsLogin: boolean;
    public readonly Token?: string;

    constructor(IsLogin: boolean, Token?: string) {
        this.IsLogin = IsLogin;
        this.Token = Token!;
    }
}