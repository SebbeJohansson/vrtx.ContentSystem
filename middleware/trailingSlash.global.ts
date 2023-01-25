// eslint-disable-next-line consistent-return
export default defineNuxtRouteMiddleware((to) => {
  if (to.path.slice(-1) !== '/') {
    return navigateTo({
      ...to,
      path: `${to.path}/`,
    });
  }
});
