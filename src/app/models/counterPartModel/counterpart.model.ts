export class CounterPartModel {
    constructor(
        public id: number = 0,
        public name: string = '',
        public email: string = '',
        public workspaceId: number = 0
    ){}
}