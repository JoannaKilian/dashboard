// export interface User {
//     uid: string,
//     email: string,
//     name: string,
//     token: string
// }

export class User {
    constructor(
        public uid: string,
        public email: string | null,
        public name: string | null,
        private _token: string,
    ) { }

    get token() {
        return this._token
    }
}
