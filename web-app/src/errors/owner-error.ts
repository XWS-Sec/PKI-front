export class OwnerError implements Error {
  name: string;
  message: string;
  stack?: string | undefined;

  constructor() {
    this.name = "OwnerError";
    this.message = "First name can only contain letters.";
  }
}
