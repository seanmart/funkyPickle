<template lang="html">
  <div class="slicky-header--wrapper" ref="wrapper">
    <div class="slicky-header relative" :class="headerClass" ref="header">
      <slot />
    </div>
  </div>
</template>

<script>
export default {
  props: {
    top: { type: Number, default: 0 },
    trigger: { type: [String, Function], default: null },
    headerClass: {type:String,default:null}
  },
  mounted() {
    this.$nextTick(this.init);
  },
  destroyed() {
    this.anim && this.anim.kill();
  },
  methods:{
    init(){
      let props = {
        pinSpacer: this.$refs.wrapper,
        pin: this.$refs.header,
        trigger: this.trigger,
        pinSpacing: false,
        anticipatePin: 1,
        start: `top ${this.top}`,
        onEnter: this.handleOnEnter,
        onLeaveBack: this.handleOnLeaveBack,
        end: ()=> `bottom ${this.$refs.header.offsetHeight}px`
      }

      if (this.onToggle) props.onToggle = this.onToggle

      this.anim = ScrollTrigger.create(props);
    },
    handleOnEnter(){
      this.$bus.$emit('MOBILE_HEADER_DISABLED',true)
      this.$emit('active',true)
    },
    handleOnLeaveBack(){
      this.$bus.$emit('MOBILE_HEADER_DISABLED',false)
      this.$emit('active',false)
    }
  }
};
</script>
