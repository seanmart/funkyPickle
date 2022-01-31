<template lang="html">
  <div class="c-slicky-header--wrapper">
    <div class="c-slicky-header" :class="headerClass" ref="header">
      <slot />
    </div>
  </div>
</template>

<script>
export default {
  props: {
    top: { type: Number, default: 0 },
    trigger: { type: [String, Function], default: null },
    headerClass: String
  },
  mounted() {
    this.$nextTick(this.init);
  },
  destroyed() {
    this.anim && this.anim.kill();
  },
  methods:{
    init(){
      this.anim = ScrollTrigger.create({
        pin: this.$refs.header,
        trigger: this.trigger,
        pinSpacing: false,
        anticipatePin: 1,
        start: `top ${this.top}`,
        end: ()=> `bottom ${this.$refs.header.offsetHeight}px`
      });
    }
  }
};
</script>

<style lang="scss">
.c-slicky-header {
  position: relative;
  z-index: 50;
}
</style>
