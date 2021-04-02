<template>
  <div class="login-page">
    <login-background></login-background>
    <a-card class="login-form">
      <h3>{{ appTitle }}</h3>
      <a-form :model="loginInfo" :rules="rules" @keydown.enter="handleLogin" class="form" :wrapperCol="{ span: 24 }" ref="loginForm">
        <a-form-item name="username">
          <a-input placeholder="账号" type="text" v-model:value="loginInfo.username">
            <template #prefix>
              <icon-font type="icon-user" />
            </template>
          </a-input>
        </a-form-item>
        <a-form-item name="password">
          <a-input auto-complete="off" placeholder="密码" type="password" v-model:value="loginInfo.password">
            <template #prefix>
              <icon-font type="icon-lock" />
            </template>
          </a-input>
        </a-form-item>
        <a-form-item name="code">
          <div class="r-nw-sb-c">
            <a-input style="width: 55%" auto-complete="off" placeholder="验证码" v-model:value="loginInfo.code">
              <template #prefix>
                <icon-font type="icon-mobile1" />
              </template>
            </a-input>
            <img width="35%;" height="32px" @click="changeCode()" :src="codeSrc" />
          </div>
        </a-form-item>
        <a-form-item style="width: 100%">
          <a-button class="login" :loading="loading" @click.prevent="handleLogin" type="primary">登 录</a-button>
        </a-form-item>
      </a-form>
    </a-card>
    <div class="version" @click="isShowModal = true">
      版本号: <span>{{ appTitle }} {{ version }}</span>
    </div>
    <a-modal v-model:visible="isShowModal" title="更新日志" :footer="null" :width="800">
      <update-log></update-log>
    </a-modal>
  </div>
</template>

<script>
import { set } from 'js-cookie';
import { setStorage } from '@/utils/storage';
import config from '@/config';
import AuthApi from '@/api/auth';
import UpdateLog from './components/UpdateLog.vue';
import LoginBackground from './components/LoginBackground.vue';
import { cryptoPassword } from '@/utils';
import { message } from 'ant-design-vue';
export default {
  components: {
    LoginBackground,
    UpdateLog
  },
  data() {
    return {
      loginInfo: {
        username: 'admin',
        password: '123456',
        code: '1234'
      },
      rules: {
        username: [
          {
            type: 'string',
            required: true,
            trigger: 'blur',
            message: '请输入用户名'
          }
          // { validator: ruleUserName }
        ],
        password: [
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
      },
      loading: false,
      appTitle: config.appTitle,
      version: config.appVersion,
      codeSrc: '',
      isShowModal: false
    };
  },
  computed: {
    redirect() {
      let noRedirect = ['/err', '/login'];
      let redirectUrl = this.$route.query.redirect || '/';
      return noRedirect.includes(redirectUrl) ? '/' : redirectUrl;
    }
  },
  methods: {
    // 验证码
    changeCode() {
      let str = new Date().getTime();
      this.codeSrc = `${config.apiHost}/code/` + str;
    },
    // 登录
    handleLogin(formName) {
      this.$refs.loginForm
        .validate()
        .then(() => {
          this.loading = true;
          let { username, password, code } = this.loginInfo;
          AuthApi.login({
            username,
            password: cryptoPassword(password),
            code
          })
            .then((res) => {
              message.success('登录成功！');
              set(config.tokenKey, res.access_token);
              set(config.refreshTokenKey, res.refresh_token);
              set(config.tokenExpiresKey, Date.now() + res.expires_in * 1000 - config.refreshAheadTime);
              this.getMenuList();
              this.loading = false;
            })
            .catch((err) => {
              console.log(err);
              this.loading = false;
              this.changeCode();
            });
        })
        .catch((err) => {
          console.log(err);
          this.loading = false;
          message.error('用户名或密码输入不正确！');
          this.changeCode();
        });
    },
    getOtherQuery(query) {
      return Object.keys(query).reduce((acc, cur) => {
        return cur !== 'redirect' ? (acc[cur] = query[cur]) : acc;
      }, {});
    },
    // 储存菜单及用户信息
    getMenuList() {
      AuthApi.getMenus({}).then((res) => {
        // 存储用户信息
        setStorage('userinfo', res.detail);
        setStorage('permissions', res.btnPermissions);
        // 存储返回的菜单
        setStorage('rawMenu', res.menus);
        this.$router.replace({
          path: this.redirect,
          query: this.getOtherQuery(this.$route.query)
        });
      });
    }
  }
};
</script>
<style lang="less" scoped>
.login-page {
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  height: 100vh;
  width: 100vw;
  position: relative;
}
.login-form {
  width: 360px;
  text-align: center;
}
.version {
  position: absolute;
  bottom: 10px;
  z-index: 2;
  span {
    color: @link-color;
  }
}
</style>
