import { MovementDto } from "./movement-dto.model";

export class ResumenMovementDto {
    constructor(
        public totalNumberElements: number = 0,
        public totalIN: number = 0,
        public totalOUT: number = 0,
        public reason: string = '',
        public movememts: MovementDto[] = []
    ){}
}