<template>
  <span>
    <a-switch checked-children="开" un-checked-children="关" :default-checked="value === '1'" @change="onChange" v-bind="$attrs" />
  </span>
</template>

<script>
export default {
  props: {
    value: {
      type: String,
      default: '0'
    },
    isEdit: {
      type: Boolean,
      default: true
    }
  },
  methods: {
    onChange(value) {
      this.$emit('input', value);
    }
  }
};
</script>
