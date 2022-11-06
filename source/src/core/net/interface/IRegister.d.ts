declare interface IRegister {
    register(data: RegisterInput): void;
}

declare interface RegisterInput extends UserInput {
    account: string;
    password: string;
    nickname: string;
}

declare interface RegisterOutput extends UserOutput {

}