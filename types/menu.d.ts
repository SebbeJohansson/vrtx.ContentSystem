interface MenuDepartment {
  key: string;
  title: string;
  slug: string;
  target: string;
  image: Image;
  content: {};
  sub_departments: MenuDepartment[];
}

interface HeaderMenu {
  departments: MenuDepartment[];
}

interface FooterMenu {
  departments: MenuDepartment[];
}
