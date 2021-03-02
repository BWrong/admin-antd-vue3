<template>
  <span>
    <a-input :value="value" v-if="isEdit" @input="handleInput" v-bind="$attrs" />
    <span v-else>{{ value }}</span>
  </span>
</template>

<script>
export default {
  props: {
    value: {
      type: String,
      default: ''
    },
    isEdit: {
      type: Boolean,
      default: true
    }
  },
  methods: {
    handleInput(value) {
      this.$emit('input', value);
    }
  }
};
</script>
