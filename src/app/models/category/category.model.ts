export class CategoryModel {
    constructor(
        public id: number = 0,
        public name: string = '',
        public userId: number = 0
    ){}

    // equals(obj: CategoryModel): boolean {
    //     return this.id === obj.id && this.name === obj.name && this.userId === obj.userId;
    // }

    // hashCode(): number {
    // return this.id.hashCode();
    // }
}