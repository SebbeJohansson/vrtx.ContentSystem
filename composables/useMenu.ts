import { HeaderMenu, MenuDepartment } from "./useContent";

export const useMenuContent = () => useState<HeaderMenu>('menuContent', () => ({} as HeaderMenu));
export const useMenuSource = () => useState<string>('menuSource', () => '');
export const useSelectedMenuDepartment = () => useState<MenuDepartment>('selectedMenuDepartment', () => ({} as MenuDepartment));

/* useMenuFetch - Fetches content from sources. */
/* Currently only storyblok. */
export const useMenuFetch = async () => {
  await useStoryblokMenuFetch();
};

export const useMenu = () => {
  const menuContent = useMenuContent();
  const menuSource = useMenuSource();
  const selectedMenuDepartment = useSelectedMenuDepartment();

  const setSelectedMenuDepartment = (department: MenuDepartment) => {
    selectedMenuDepartment.value = department;
  };

  return {
    menuContent,
    menuSource,
    selectedMenuDepartment,
    setSelectedMenuDepartment,
  };
};
