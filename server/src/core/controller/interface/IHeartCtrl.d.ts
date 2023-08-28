declare interface IHeartCtrl {
    heart(data: HeartInput): void;
}

declare interface HeartInput extends UserInput {

}

declare interface HeartOutput extends UserOutput {
    timeStamp: number;
}