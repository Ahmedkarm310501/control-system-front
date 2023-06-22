export class User {
  constructor(private _token, public userName: string, public isAdmin ) {}

  get token() {
    return this._token;
  }
}
