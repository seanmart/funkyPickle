<template lang="html">
  <div class="c-slicky-header" ref="header">
    <slot/>
  </div>
</template>

<script>
import {getStyle} from '@/assets/js/helpers'
export default {
  props:{
    top:{type:Number,default:0},
    endTrigger:{type:[String,Function],default:null},
  },
  mounted(){

    this.$nextTick(()=>{
      let scroller = document.getElementById('scroller')
      let el = this.$slots.default[0].elm

      let props = {
        pin:true,
        trigger: this.$refs.header,
        pinSpacing: false,
        anticipatePin:1,
        start: ()=>`top top+=${this.top + getStyle(scroller,'padding-top')}`,
        end: ()=> `bottom top+=${el.offsetHeight}`
      }

      this.endTrigger && (props.endTrigger = this.endTrigger)
      this.anim = ScrollTrigger.create(props)
    })
  },
  destroyed(){
    this.anim && this.anim.kill()
  }
}
</script>

<style lang="scss">
  .c-slicky-header{
    position: relative;
    z-index: 50;
  }
</style>
