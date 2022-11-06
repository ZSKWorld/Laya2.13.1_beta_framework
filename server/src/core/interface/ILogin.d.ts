declare interface ILogin {
    login(data: LoginInput): void;
}

declare interface LoginInput extends UserInput {
    account: string;
    password: string;
}

declare interface LoginOutput extends UserOutput {
}