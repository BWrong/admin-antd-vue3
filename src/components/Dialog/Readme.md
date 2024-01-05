# 模态窗

建议配合`useDialog`使用。
可在 component 内部 Expose 方法来实现通信交互：

- `submit`：主要用于表单类弹窗，用于执行验证，和通过 `onConfirm` 向外传递数据，必须是 `async Function`，验证没通过时可以返回 `Promise.reject()`阻止弹窗关闭

```js
// 组件
defineExpose({
  async submit() {
    const result = await formRef.value?.validate();
    if (result === true) {
      return formData;
    }
    return Promise.reject();
  }
});
```

通过hooks使用弹窗

```tsx
function handleOpenModal() {
  // 这里需要手动添加一下泛型<typeof TestModal>，就可推断onConfirm中参数的类型，展示还没能实现自动推断类型
  useDialog<typeof TestModal>({
    width: '500px',
    component: <TestModal title="测试模态窗" />,
    // ...支持AModal的所有配置
    onConfirm(data) {
      // 可以拿到内部数据，在表单类弹窗中很有用
      console.log('拿到组件内部数据：', data);
    }
  });
}
function handleOpenModal1() {
  const { open, close } = useDialog<typeof TestModal>({
    width: '500px',
    component: <TestModal title="测试模态窗" />,
    defaultOpen: false,
    onConfirm(data) {
      console.log('拿到组件内部数据：', data);
    }
  });
  open();
  setTimeout(() => {
    close();
  }, 3000);
}
function handleOpenModal2() {
  useDialog<typeof TestModal>({
    width: '500px',
    component: (
      <TestModal title="测试模态窗">
        {{
          default: () => <div>默认插槽</div>,
          test: () => <div>test插槽</div>
        }}
      </TestModal>
    ),
    onConfirm(data) {
      console.log('拿到组件内部数据：', data);
    }
  });
}
```

另外，组件内部可以 `emit` `confirm` 和 `cancel` 来触发模态框的开闭事件
