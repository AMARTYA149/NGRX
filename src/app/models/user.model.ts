export class User {
  constructor(
    private email: string,
    private token: string,
    private localId: string,
    private expirationDate: Date
  ) {}

  get expiryDate() {
    return this.expirationDate;
  }
}
