export class UserRegister {
    constructor(
        public id: number = 0,
        public username: string = "",
        public password: string = "",
        public firstname: string = "",
        public lastname: string = "",
        public email: string = "",
        public country: string = ""
    ) {}
}