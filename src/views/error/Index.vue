<template>
<a-result status="404" title="404" sub-title="对不起，你访问的页面不存在！">
    <template #extra>
      <a-button @click="$router.go(-1)">返回上一页</a-button>
        <a-button type="primary" class="not-found-btn-gohome" @click="$router.push('/')">进入首页</a-button>
    </template>
  </a-result>
</template>

<script>
export default {};
</script>