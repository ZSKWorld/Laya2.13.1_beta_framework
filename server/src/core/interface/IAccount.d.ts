declare interface IAccount {
    register(data: RegisterInput): void;
    login(data: LoginInput): void;
    clearAccount(data: UserInput): void;
}

declare interface LoginInput extends UserInput {
    account: string;
    password: string;
}

declare interface LoginOutput extends UserOutput {
}

declare interface RegisterInput extends UserInput {
    account: string;
    password: string;
    nickname: string;
}

declare interface RegisterOutput extends UserOutput {

}

declare interface ClearInput extends UserInput {

}

declare interface ClearOutput extends UserOutput {

}