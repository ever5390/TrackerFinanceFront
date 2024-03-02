export class Tag {
    constructor(
        public id: number = 0,
        public name: string ="",
        public isChecked: boolean = false,
        public workspaceId: number = 0
    ){}
}