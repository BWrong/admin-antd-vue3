<template>
  <a-modal
    title="修改密码"
    :open="props.open"
    :confirm-loading="state.confirmLoading"
    :keyboard="false"
    :mask-closable="false"
    @cancel="handleCancel"
  >
    <a-form
      ref="formRef"
      class="form"
      :model="state.updatePwdForm"
      :rules="rules"
      :label-col="{ span: 5 }"
      :wrapper-col="{ span: 18 }"
      @keydown.enter="updatePsd()"
    >
      <a-form-item name="oldPassword" label="原始密码">
        <a-input
          v-model:value="state.updatePwdForm.oldPassword"
          auto-complete="off"
          placeholder="请输入原始密码"
          type="password"
        />
      </a-form-item>
      <a-form-item name="newPassword" label="新密码">
        <a-input
          v-model:value="state.updatePwdForm.newPassword"
          auto-complete="off"
          placeholder="请输入新密码"
          type="password"
        />
      </a-form-item>
      <a-form-item name="reNewPassword" label="重复密码">
        <a-input
          v-model:value="state.updatePwdForm.reNewPassword"
          auto-complete="off"
          placeholder="请输入重复密码"
          type="password"
        />
      </a-form-item>
    </a-form>
    <template #footer>
      <a-button style="margin: 10px 0" :loading="state.loading" type="primary" @click.prevent="updatePsd()">
        <template #icon>
          <icon-font type="icon-setting" />
        </template>
        提 交
      </a-button>
    </template>
  </a-modal>
</template>

<script lang="ts" setup>
import { message } from 'ant-design-vue';
import { reactive, ref } from 'vue';

import { cryptoPassword } from '@/utils';
import type { FormProps } from 'ant-design-vue/es';

interface IProps {
  open?: boolean;
}
const props = withDefaults(defineProps<IProps>(), { open: false });
const emit = defineEmits(['update:open']);
const formRef = ref();
const state = reactive({
  confirmLoading: false,
  loading: false,
  updatePwdForm: {
    oldPassword: '',
    newPassword: '',
    reNewPassword: ''
  }
});
async function validateNewPassword(rule: object, value: string) {
  const regx = new RegExp(/(^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[^]{6,15}$)/);
  if (regx.test(value)) {
    return Promise.resolve();
  } else {
    return Promise.reject('长度至少8位，必须包含大写字母、小写字母、特殊字符、数字！');
  }
}
async function validateRePassword(rule: object, value: string) {
  if (value !== state.updatePwdForm.newPassword) {
    return Promise.reject('两次输入的新密码不一致');
  } else {
    return Promise.resolve();
  }
}
const rules: FormProps['rules'] = {
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
};
function handleCancel() {
  emit('update:open', false);
}
function updatePsd() {
  formRef.value
    .validate()
    .then(() => {
      state.loading = true;
      const { oldPassword, newPassword, reNewPassword } = state.updatePwdForm;
      const params = {
        oldPassword: cryptoPassword(oldPassword),
        newPassword: cryptoPassword(newPassword),
        reNewPassword: cryptoPassword(reNewPassword)
      };
      console.log(params);
      message.success('操作成功！');
      emit('update:open', false);
    })
    .catch((err: Error) => {
      console.error(err);
      state.loading = false;
    });
}
</script>
