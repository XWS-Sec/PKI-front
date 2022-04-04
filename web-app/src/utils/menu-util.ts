import { Role } from '../model/enums/role.enum';
import MenuLink from '../model/menu-link';
import localStorageUtil from './local-storage/local-storage-util';

const AdminMenuLinks: MenuLink[] = [
  { text: 'Home', pathname: '/' },
  { text: 'Create user', pathname: '/create-user' },
  { text: 'Profile', pathname: `users/${localStorageUtil.getUsername()}` },
];

const UserMenuLinks: MenuLink[] = [
  { text: 'Home', pathname: '/' },
  { text: 'Profile', pathname: `users/${localStorageUtil.getUsername()}` },
];

export const generateMenuLinks = (role: Role): MenuLink[] => {
  switch (role) {
    case Role.ADMIN:
      return AdminMenuLinks;
    case Role.USER:
      return UserMenuLinks;
    default:
      return [];
  }
};
