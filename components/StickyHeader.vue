<template lang="html">
  <div class="h-50 relative z-50" ref="spacer">
    <div class="absolute inset-0 h-50 overflow-scroll no-scrollbar gutter-left gutter-right" :class="backgroundClasses" :style="backgroundStyles" ref="header">
      <div class="px-20 h-full min-w-full inline-flex justify-center flex-row items-center">
        <slot/>
        <template v-for="item in items">
          <a :href="`#${item.id}`" v-html="item.label" class="mx-03 button bg-pink text-white" @click.prevent="scrollTo(item.id)"/>
        </template>
      </div>
    </div>
  </div>
</template>

<script>
import {getPosition} from '@/assets/helpers'
export default {
  props:{
    items: {type:Array,default: ()=>[]},
    scrollId: {type: String, default: null},
    backgroundClasses:{type:String,default:'bg-white shadow-b-blue'},
    backgroundStyles:{type:Object,default:()=>({})}
  },
  mounted(){
    if (!this.scrollId) return
    setTimeout(this.initHeader,500)
  },
  destroyed(){
    this.anim && this.anim.kill()
  },
  methods:{
    initHeader(){
      this.anim = ScrollTrigger.create({
        trigger: this.scrollId,
        start: ()=> `top top-=${getPosition(this.$refs.header).top}`,
        end: ()=> `bottom top+=${this.$refs.header.offsetHeight}`,
        pin: this.$refs.header,
        pinSpacer: this.$refs.spacer,
        pinSpacing: false
      })
    },
    scrollTo(id){
      let el = document.getElementById(id).childNodes[0]
      gsap.to(window,1,{ease: 'power2.out', scrollTo:{y:el,offsetY: this.$refs.header.offsetHeight + 50}})
    }
  }
}
</script>
