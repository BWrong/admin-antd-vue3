<template>
  <ul class="background">
    <li></li>
    <li></li>
    <li></li>
    <li></li>
    <li></li>
    <li></li>
    <li></li>
    <li></li>
    <li></li>
    <li></li>
  </ul>
</template>

<style>
@keyframes animate {
  0% {
    transform: translateY(0) rotate(0deg);
    opacity: 1;
    border-radius: 0;
  }
  100% {
    transform: translateY(-1000px) rotate(720deg);
    opacity: 0;
    border-radius: 50%;
  }
}
</style>
<style scoped>
.background {
  position: fixed;
  width: 100vw;
  height: 100vh;
  top: 0;
  left: 0;
  margin: 0;
  padding: 0;
  background: #eee;
  overflow: hidden;
}
.background li {
  position: absolute;
  display: block;
  list-style: none;
  width: 20px;
  height: 20px;
  background: rgba(0, 0, 0, 0.04);
  animation: animate 19s linear infinite;
}

.background li:nth-child(0) {
  left: 70%;
  width: 122px;
  height: 122px;
  bottom: -122px;
  animation-delay: 1s;
}
.background li:nth-child(1) {
  left: 26%;
  width: 172px;
  height: 172px;
  bottom: -172px;
  animation-delay: 3s;
}
.background li:nth-child(2) {
  left: 17%;
  width: 112px;
  height: 112px;
  bottom: -112px;
  animation-delay: 10s;
}
.background li:nth-child(3) {
  left: 42%;
  width: 114px;
  height: 114px;
  bottom: -114px;
  animation-delay: 10s;
}
.background li:nth-child(4) {
  left: 42%;
  width: 163px;
  height: 163px;
  bottom: -163px;
  animation-delay: 4s;
}
.background li:nth-child(5) {
  left: 90%;
  width: 176px;
  height: 176px;
  bottom: -176px;
  animation-delay: 20s;
}
.background li:nth-child(6) {
  left: 18%;
  width: 145px;
  height: 145px;
  bottom: -145px;
  animation-delay: 19s;
}
.background li:nth-child(7) {
  left: 32%;
  width: 195px;
  height: 195px;
  bottom: -195px;
  animation-delay: 19s;
}
.background li:nth-child(8) {
  left: 27%;
  width: 118px;
  height: 118px;
  bottom: -118px;
  animation-delay: 31s;
}
.background li:nth-child(9) {
  left: 66%;
  width: 114px;
  height: 114px;
  bottom: -114px;
  animation-delay: 6s;
}
</style>
