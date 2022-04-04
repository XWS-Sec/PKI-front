import { Role } from '../model/enums/role.enum';

export default interface CreateUserDto {
  email: string;
  username: string;
  password: string;
  confirmPassword: string;
  name: string;
  surname: string;
  //dateOfBirth: string;
  phone: string;
  //isPrivate: boolean;
  role?: Role;
  //profileDescription: string;
}
