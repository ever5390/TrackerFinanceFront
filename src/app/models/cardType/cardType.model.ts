export class CardType {
    constructor(
        public id: number = 0,
        public name: string = '',
        public icon: string = '',
        public color: string = '',
        public fixedParameter: boolean = false,
        public workspaceId: number = 0 
    ){}
}