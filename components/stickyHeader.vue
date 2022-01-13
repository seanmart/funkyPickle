<template lang="html">
  <div class="slicky-header">
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
        trigger: el,
        pinSpacing: false,
        start: ()=>`top-=${this.top + parseInt(getStyle(scroller,'padding-top'))}`,
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
