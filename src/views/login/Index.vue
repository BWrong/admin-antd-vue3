<template>
  <div class="login-page">
    <a-card class="login-form">
      <h3>{{ appTitle }}</h3>
      <a-form
        ref="formRef"
        :model="state.loginInfo"
        :rules="rules"
        class="form"
        :wrapper-col="{ span: 24 }"
        @keydown.enter="handleLogin"
      >
        <a-form-item name="username">
          <a-input v-model:value="state.loginInfo.username" placeholder="账号" type="text">
            <template #prefix>
              <icon-font type="icon-user" />
            </template>
          </a-input>
        </a-form-item>
        <a-form-item name="word">
          <a-input v-model:value="state.loginInfo.word" auto-complete="off" placeholder="密码：任意" type="password">
            <template #prefix>
              <icon-font type="icon-lock" />
            </template>
          </a-input>
        </a-form-item>
        <a-form-item name="code">
          <div class="code">
            <a-input v-model:value="state.loginInfo.code" style="width: 55%" auto-complete="off" placeholder="验证码">
              <template #prefix>
                <icon-font type="icon-mobile" />
              </template>
            </a-input>
            <img :src="state.codeSrc" @click="changeCode()" alt="验证码" />
          </div>
        </a-form-item>
        <a-form-item style="width: 100%">
          <a-button class="login" :loading="state.loading" type="primary" @click.prevent="handleLogin">登 录</a-button>
        </a-form-item>
      </a-form>
    </a-card>
    <div class="version">
      版本号:
      <span>V{{ version }}</span>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { message } from 'ant-design-vue';
import { computed, reactive, ref } from 'vue';
import { useRoute, useRouter, type LocationQueryValue } from 'vue-router';

import type { LocationQuery } from 'vue-router';

import { loginRequest, getMenusRequest } from '@/api/auth';
import config from '@/config';
import { cryptoPassword } from '@/utils';
import { setStorage } from '@bwrong/storage';
import { saveAuthData } from '@/utils/auth';
import type { FormProps } from 'ant-design-vue/es';
import { apiHost } from '@/utils/request';

const rules: FormProps['rules'] = {
  username: [
    {
      type: 'string',
      required: true,
      trigger: 'blur',
      message: '请输入用户名'
    }
    // { validator: ruleUserName }
  ],
  word: [
    {
      type: 'string',
      required: true,
      trigger: 'blur',
      message: '请输入密码'
    }
  ],
  code: [
    {
      type: 'string',
      required: true,
      trigger: 'blur',
      message: '请输入验证码'
    }
  ]
};
const appTitle = config.appTitle;
const version = config.appVersion;
const route = useRoute();
const router = useRouter();
const formRef = ref();
const state = reactive({
  loginInfo: {
    username: 'admin',
    word: '',
    code: '1234'
  },
  loading: false,
  codeSrc: '',
  isShowModal: false
});
const redirect = computed(() => {
  const noRedirect = ['/err', '/login'];
  const redirectUrl = (route.query.redirect as string) || '/';
  return noRedirect.includes(redirectUrl) ? '/' : redirectUrl;
});
// 验证码
function changeCode() {
  const str = new Date().getTime();
  state.codeSrc = `${apiHost}/code/` + str;
}
function getOtherQuery(query: LocationQuery) {
  return Object.keys(query).reduce(
    (acc, cur) => {
      if (cur !== 'redirect') {
        acc[cur] = query[cur];
      }
      return acc;
    },
    {} as Record<string, LocationQueryValue | LocationQueryValue[]>
  );
}
// 储存菜单及用户信息
async function getMenuList() {
  await getMenusRequest().then((res) => {
    // 存储返回的菜单
    setStorage('rawMenu', res);
  });
}
// 登录
function handleLogin() {
  formRef.value
    .validate()
    .then(() => {
      state.loading = true;
      const { username, word, code } = state.loginInfo;
      loginRequest({
        username,
        password: cryptoPassword(word, config.cryptoKey),
        code
      })
        .then(async (res) => {
          message.success('登录成功！');
          // 存储用户信息
          setStorage('userinfo', res);
          saveAuthData(res);
          await getMenuList();
          router.replace({
            path: redirect.value,
            query: getOtherQuery(route.query)
          });
          state.loading = false;
        })
        .catch((err) => {
          console.log(err);
          state.loading = false;
          changeCode();
        });
    })
    .catch((err: Error) => {
      console.log(err);
      state.loading = false;
      message.error('用户名或密码输入不正确！');
      changeCode();
    });
}
</script>
<style scoped>
.login-page {
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  height: 100vh;
  width: 100vw;
  position: relative;
  background: #eee;
}
@media (prefers-color-scheme: dark) {
  .login-page {
    background: #141414;
  }
}
.login-form {
  width: 360px;
  text-align: center;
}
.code {
  display: flex;
  flex-direction: row;
  flex-wrap: nowrap;
  justify-content: space-between;
  align-items: center;
}
.version {
  position: absolute;
  bottom: 10px;
  z-index: 2;
}
</style>
