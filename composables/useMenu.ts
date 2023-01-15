import { HeaderMenu, MenuDepartment } from '~/interfaces/menu';

export const useMenuContent = () => useState<HeaderMenu>('menuContent', () => ({} as HeaderMenu));
export const useMenuSource = () => useState<string>('menuSource', () => '');
export const useSelectedMenuDepartment = () => useState<MenuDepartment | undefined>('selectedMenuDepartment', () => (undefined));

/* useMenuFetch - Fetches content from sources. */
/* Currently only storyblok. */
export const useMenuFetch = async () => {
  await useStoryblokMenuFetch();
};

export const useMenu = () => {
  const menuContent = useMenuContent();
  const menuSource = useMenuSource();
  const selectedMenuDepartment = useSelectedMenuDepartment();

  const setSelectedMenuDepartment = (department: MenuDepartment | undefined) => {
    selectedMenuDepartment.value = department;
  };

  return {
    menuContent,
    menuSource,
    selectedMenuDepartment,
    setSelectedMenuDepartment,
  };
};
