import { DirectiveBinding, Directive } from 'vue';

const debounce: Directive = {
  mounted(el: Element, binding: DirectiveBinding) {
    let timer: number;
    el.addEventListener('keyup', () => {
      if (timer) {
        clearTimeout(timer);
      }
      timer = setTimeout(() => {
        binding.value();
      }, 1000);
    });
  }
};

export default debounce;
// 使用说明
/* <template>
  <button v-debounce="debounceClick">防抖</button>
</template>

<script>
export default {
  methods: {
    debounceClick () {
      console.log('只触发一次')
    }
  }
}
</script> */
