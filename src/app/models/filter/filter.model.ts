import { Item } from "src/app/interfaces/ItemFiltered.interface";

export class Filter {
    constructor(
        public item: string = '',
        public itemList: Item[] = []
    ){}
}