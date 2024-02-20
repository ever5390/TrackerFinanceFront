import { Item } from "src/app/interfaces/ItemFiltered.interface";

export class Filter {
    constructor(
        public item: string = '',
        public itemList: Item[] = []
        //public itemList: Map<any, number> = new Map<any, number>()
    ){}
}