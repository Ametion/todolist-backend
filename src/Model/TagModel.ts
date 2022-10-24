export class Tag{
    public readonly tagId: number;
    public readonly tag: string;

    constructor(tagId: number, tag: string) {
        this.tagId = tagId;
        this.tag = tag;
    }
}