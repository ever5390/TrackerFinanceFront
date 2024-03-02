import { GroupCategoryModel } from "../groupCategory/category.model";

export class SubCategoryModel {
    constructor(
        public id: number = 0,
        public name: string = '',
        public icon: string = '',
        public color: string = '',
        public userId: number = 0,
        public active: boolean = false,
        public workspaceId: number = 0,
        public category: GroupCategoryModel = new GroupCategoryModel(),
        public isChecked: boolean = false,
        public selected: boolean = false
    ){}
}