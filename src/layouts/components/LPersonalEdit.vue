<template>
  <a-modal title="修改密码" :visible="visible" :confirm-loading="confirmLoading" @cancel="handleCancel" :keyboard="false" :maskClosable="false">
    <a-form class="form" :model="updatePwdForm" :rules="rules" @keydown.enter="updatePsd('updatePsdForm')" ref="form" :label-col="{ span: 5 }" :wrapper-col="{ span: 18 }">
      <a-form-item name="oldPassword" label="原始密码">
        <a-input auto-complete="off" placeholder="请输入原始密码" type="password" v-model:value="updatePwdForm.oldPassword"></a-input>
      </a-form-item>
      <a-form-item name="newPassword" label="新密码">
        <a-input auto-complete="off" placeholder="请输入新密码" type="password" v-model:value="updatePwdForm.newPassword"></a-input>
      </a-form-item>
      <a-form-item name="reNewPassword" label="重复密码">
        <a-input auto-complete="off" placeholder="请输入重复密码" type="password" v-model:value="updatePwdForm.reNewPassword"></a-input>
      </a-form-item>
    </a-form>
    <template #footer>
      <a-button style="margin: 10px 0" :loading="loading" @click.prevent="updatePsd('updatePsdForm')" type="primary">
        <template #icon><icon-font type="icon-check" /></template>
        提 交</a-button
      >
    </template>
  </a-modal>
</template>

<script>
import { defineComponent } from 'vue';
import { cryptoPassword } from '@/utils';
import { message } from 'ant-design-vue';
export default defineComponent({
  props: {
    visible: {
      type: Boolean,
      default: false
    }
  },
  data() {
    let validateNewPassword = async (rule, value) => {
      let regx = new RegExp(/(^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[^]{6,15}$)/);
      if (regx.test(value)) {
        return Promise.resolve();
      } else {
        return Promise.reject('长度至少8位，至少一个大写字母，一个小写字母，一个特殊字符，一个数字！');
      }
    };
    let validateRePassword = async (rule, value) => {
      if (value !== this.updatePwdForm.newPassword) {
        return Promise.reject('两次输入的新密码不一致');
      } else {
        return Promise.resolve();
      }
    };
    return {
      confirmLoading: false,
      loading: false,
      updatePwdForm: {
        oldPassword: '',
        newPassword: '',
        reNewPassword: ''
      },
      rules: {
        oldPassword: [
          {
            type: 'string',
            required: true,
            trigger: 'blur',
            message: '请输入原始密码'
          }
        ],
        newPassword: [
          {
            type: 'string',
            required: true,
            trigger: 'blur',
            message: '请输入新密码'
          },
          { validator: validateNewPassword }
        ],
        reNewPassword: [
          {
            type: 'string',
            required: true,
            trigger: 'blur',
            message: '请再次输入密码'
          },
          { validator: validateRePassword }
        ]
      }
    };
  },
  methods: {
    handleCancel() {
      this.$emit('changeVisiblePsd', false);
    },
    updatePsd() {
      this.$refs.form
        .validate()
        .then(() => {
          this.loading = true;
          let { oldPassword, newPassword, reNewPassword } = this.updatePwdForm;
          let params = {
            oldPassword: cryptoPassword(oldPassword),
            newPassword: cryptoPassword(newPassword),
            reNewPassword: cryptoPassword(reNewPassword)
          };
          console.log(params);
          message.success('操作成功！');
          this.$emit('update:visible', false);
        })
        .catch((err) => {
          console.error(err);
          this.loading = false;
        });
    }
  }
});
</script>

<style lang="less" scoped></style>
