<template>
  <div class="site-wrapper site-page--not-found water-box">
    <div class="site-content__wrapper">
      <div class="site-content">
        <h2 class="not-found-title">404</h2>
        <p class="not-found-desc">抱歉！您访问的页面不存在</p>
        <a-button @click="$router.go(-1)">返回上一页</a-button>
        <a-button type="primary" class="not-found-btn-gohome" @click="$router.push('/')">进入首页</a-button>
      </div>
    </div>
  </div>
</template>

<script>
export default {};
</script>
<style lang="less">
@keyframes rotate {
  0% {
    transform: translate(-50%, 0) rotateZ(0deg);
  }
  50% {
    transform: translate(-50%, -1.5%) rotateZ(180deg);
  }
  100% {
    transform: translate(-50%, 0%) rotateZ(360deg);
  }
}
</style>
<style lang="less" scoped>
.site-wrapper.site-page--not-found {
  position: absolute;
  top: 60px;
  right: 0;
  bottom: 0;
  left: 0;
  overflow: hidden;
  .site-content__wrapper {
    padding: 0;
    margin: 0;
    background-color: #fff;
  }
  .site-content {
    position: fixed;
    top: 15%;
    left: 50%;
    z-index: 2;
    padding: 30px;
    text-align: center;
    transform: translate(-50%, 0);
  }
  .not-found-title {
    margin: 20px 0 15px;
    font-size: 8em;
    font-weight: 500;
    color: rgb(55, 71, 79);
  }
  .not-found-desc {
    margin: 0 0 30px;
    font-size: 26px;
    text-transform: uppercase;
    color: rgb(118, 131, 143);
    > em {
      font-style: normal;
      color: #ee8145;
    }
  }
  .not-found-btn-gohome {
    margin-left: 30px;
  }
}
.water-box {
  position: relative;
  align-items: center;
  min-height: 100vh;
  background-color: rgba(118, 218, 255, 0.8);
  overflow: hidden;
  &:before,
  &:after {
    content: '';
    position: absolute;
    left: 50%;
    min-width: 500vw;
    min-height: 500vw;
    background-color: #fff;
    animation-name: rotate;
    animation-iteration-count: infinite;
    animation-timing-function: linear;
  }
  &:before {
    bottom: 20vh;
    border-radius: 45%;
    animation-duration: 20s;
  }
  &:after {
    bottom: 10vh;
    opacity: 0.5;
    border-radius: 47%;
    animation-duration: 20s;
  }
}
</style>
