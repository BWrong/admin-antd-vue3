<script setup lang="ts">
const route = useRoute();
const router = useRouter();
const query = route.query;
const path = query?.url ? decodeURIComponent(query?.url as string) : '';
if (path) router.replace(path);
else router.replace('/');
</script>

<template>
  <div>
    <a-spin />
  </div>
</template>
