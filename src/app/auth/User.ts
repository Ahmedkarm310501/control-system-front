export class User {
  constructor(private _token, public userName: string) {}

  get token() {
    return this._token;
  }
}
