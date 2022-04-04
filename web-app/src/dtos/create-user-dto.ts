export default interface CreateUserDto {
  email: string;
  username: string;
  password: string;
  confirmPassword: string;
  name: string;
  surname: string;
  //dateOfBirth: string;
  phoneNumber: string;
  //isPrivate: boolean;
  //profileDescription: string;
}
