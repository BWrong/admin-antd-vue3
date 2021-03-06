import { computed } from 'vue';
import { RouteLocationMatched, useRoute, useRouter } from 'vue-router';
interface _IFilter {
  (item: RouteLocationMatched): boolean;
}

export default (filter?: _IFilter) => {
  const route = useRoute();
  const router = useRouter();
  let activeMenu = computed(() => route.meta?.activeMenu || '');
  const matchedRoutes = computed(() => {
    let matched = [...route.matched];
    if (activeMenu.value) {
      let activeRoute = router.resolve(activeMenu.value);
      activeRoute && matched.splice(matched.length - 1, 0, (activeRoute as unknown) as RouteLocationMatched);
    }
    return filter ? matched.filter(filter) : matched;
  });
  return { matchedRoutes, activeMenu };
};
