export class ItemBase implements IItemBase {
    id: number = 0;
    count: number = 0;

    constructor(id: number, count: number) {
        this.id = id;
        this.count = count;
    }
}