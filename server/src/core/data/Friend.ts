
export class Friend implements IFriend {
    friend: string[];

    encode(): IFriend {
        return this;
    }

    decode(data: IFriend): IFriend {
        if (data)
            Object.keys(data).forEach(v => this[ v ] = data[ v ]);
        return this;
    }
}