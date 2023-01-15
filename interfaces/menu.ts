import { Image } from './Content';

export interface MenuDepartment {
  key: string;
  title: string;
  slug: string;
  target: string;
  image: Image;
  sub_departments: MenuDepartment[];
}

export interface HeaderMenu {
  departments: MenuDepartment[];
}

export interface FooterMenu {
  departments: MenuDepartment[];
}
