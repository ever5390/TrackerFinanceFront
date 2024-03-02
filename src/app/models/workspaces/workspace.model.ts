import { UserRegister } from "../user/register.model";

export class Workspaces {
    constructor(
        public id: number = 0,
        public name: string = "",
        public active: boolean = true,
        public owner: UserRegister = new UserRegister(),
        public users: UserRegister[] = []
    ){}
}