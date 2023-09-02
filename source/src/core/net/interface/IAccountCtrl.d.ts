declare interface IAccountCtrl {
    register(data: RegisterInput): void;
    login(data: LoginInput): void;
    signIn(data:SignInInput): void;
    clearAccount(data: ClearAccountInput): void;
}

declare interface RegisterInput extends UserInput {
    account: string;
    password: string;
    nickname: string;
}

declare interface RegisterOutput extends UserOutput {

}

declare interface LoginInput extends UserInput {
    account: string;
    password: string;
}

declare interface LoginOutput extends UserOutput {
}

declare interface SignInInput extends UserInput {
}

declare interface SignInput extends UserOutput {
}

declare interface ClearAccountInput extends UserInput {

}

declare interface ClearAccountOutput extends UserOutput {

}