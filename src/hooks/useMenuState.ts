import { computed } from 'vue';
import { RouteLocation, RouteLocationMatched, Router, useRoute, useRouter } from 'vue-router';

interface _IFilter {
  (item: RouteLocationMatched): boolean;
}

function getActiveRoute(activeMenuPath: string, router: Router, activeRoutes: RouteLocation[] = []): RouteLocation[] {
  let activeRoute = router.resolve(activeMenuPath);
  activeRoutes.unshift(activeRoute);
  let activeMenu = activeRoute.meta?.activeMenu;
  return activeMenu ? getActiveRoute(activeMenu, router, activeRoutes) : activeRoutes;
}
export default (filter?: _IFilter) => {
  const router = useRouter();
  const route = useRoute();
  let activeMenu = computed(() => route.meta?.activeMenu || '');
  const matchedRoutes = computed(() => {
    let matched = [...route.matched];
    if (activeMenu.value) {
      let activeRoutes = (getActiveRoute(activeMenu.value, router) as unknown) as RouteLocationMatched[];
      matched.splice(matched.length - 1, 0, ...activeRoutes);
    }
    return filter ? matched.filter(filter) : matched;
  });
  return { matchedRoutes, activeMenu };
};
