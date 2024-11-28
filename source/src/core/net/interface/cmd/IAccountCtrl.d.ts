declare interface IAccountCtrl {
    register(data: IRegisterInput): void;
    login(data: ILoginInput): void;
    signIn(data: ISignInInput): void;
    clearAccount(data: IClearAccountInput): void;
}

declare interface IRegisterInput extends IUserInput {
    account: string;
    password: string;
    nickname: string;
}

declare interface IRegisterOutput extends IUserOutput {

}

declare interface ILoginInput extends IUserInput {
    account: string;
    password: string;
}

declare interface ILoginOutput extends IUserOutput {
}

declare interface ISignInInput extends IUserInput {
}

declare interface ISignInOutput extends IUserOutput {
}

declare interface IClearAccountInput extends IUserInput {

}

declare interface IClearAccountOutput extends IUserOutput {

}