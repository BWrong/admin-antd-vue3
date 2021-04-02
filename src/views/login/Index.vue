<template>
  <div class="login-page">
    <div class="title r-nw-fs-c">
      <img class="block" src="../../assets/images/logo.png" />
      <h1 style="margin-left: 15px; font-weight: bold">{{ appTitle }}</h1>
    </div>
    <div class="bg-form">
      <a-carousel effect="fade" autoplay>
        <img class="bg" src="../../assets/images/login/login-bg1.jpg" />
        <img class="bg" src="../../assets/images/login/login-bg2.jpg" />
      </a-carousel>
      <div class="form-bg">
        <h2 style="text-align: center; letter-spacing: 1px; margin-bottom: 20px; color: #fff" clss="form-title">用户登录</h2>
        <a-form :model="loginInfo" :rules="rules" @keydown.enter="login('loginForm')" class="form" :wrapperCol="{ span: 24 }" ref="loginForm">
          <a-form-item name="username">
            <a-input auto-complete="off" placeholder="账号" type="text" v-model:value="loginInfo.username">
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
            <a-button class="login" :loading="loading" @click.prevent="login('loginForm')" type="primary">登 录</a-button>
          </a-form-item>
        </a-form>
      </div>
    </div>
    <div class="bottom r-nw-c-c">
      <span @click="isShowModal = true"
        >版本号: <span class="version">{{ appTitle }} {{ version }}</span></span
      >
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
import { cryptoPassword } from '@/utils';
import { message } from 'ant-design-vue';
export default {
  components: {
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
    login(formName) {
      this.$refs[formName]
        .validate()
        .then(() => {
          this.loading = true;
          let { username, password, code } = this.loginInfo;
          let params = {
            username,
            password: cryptoPassword(password),
            code
          };
          AuthApi.login(params)
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
  // width: 100vw;
  height: 100vh;
  .title {
    margin-left: 45px;
    line-height: 60px;
    .block {
      width: 30px;
      height: 30px;
    }
  }
  .bg-form {
    position: relative;
    .form-bg {
      padding: 20px;
      background: rgba(0, 0, 0, 0.4);
      position: absolute;
      top: 24%;
      right: 88px;
      z-index: 999;
      border-radius: 6px;
      .form {
        width: 320px;
        .login {
          margin-top: 10px;
          width: 100%;
          height: 40px;
        }
      }
    }
    .bg {
      width: 100%;
      height: 75vh;
      min-height: 600px;
    }
  }
  .bottom {
    height: 80px;
    font-weight: 500;
    font-size: 16px;
    cursor: pointer;
    .version {
      padding-left: 10px;
      color: @link-color;
    }
  }
}
</style>
