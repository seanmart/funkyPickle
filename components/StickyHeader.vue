<template lang="html">
  <div class="h-50 relative z-50" ref="spacer" v-if="items.length > 0">
    <header class="absolute inset-0 sticky-header" ref="header">
      <div ref="wrapper" class="h-50 overflow-hidden">
        <div class="flex flex-col md:flex-row" ref="items">

          <template v-for="(item,i) in headerItems">
            <div
              :style="backgroundStyles"
              class="sticky-header-item flex-shrink-0 md:flex-auto flex justify-center items-center font-bold h-50 relative"
              :class="[backgroundClasses,{'sticky-header-link':item.onClick && !item.menu, 'md:hidden': item.menu,'border-black border-t md:border-t-0 md:border-l':i > 0}]"
              @click="()=>item.onClick && item.onClick()"
            >
              <span v-html="item.label"/>
              <span v-if="item.onClick && !item.menu" v-html="'❯'" class="ml-10 text-lime"/>
              <button ref="btn" v-if="item.menu" class="hamburger-button ml-10 w-30px"><div v-for="i in 3" ref="bar" class="hamburger h-2px w-full bg-lime my-3px"/></button>
            </div>
          </template>

        </div>
      </div>
    </header>
  </div>
</template>

<script>
import {getPosition} from '@/assets/helpers'
export default {
  props:{
    items: {type:Array,default: ()=>[]},
    scrollId: {type: String, default: null},
    backgroundClasses:{type:String,default:'bg-pink text-white'},
    backgroundStyles:{type:Object,default:()=>({})},
    mobileLabel: {type:String,default:null}
  },
  data:()=>({
    menuOpen:false,
  }),
  watch:{
    menuOpen(o){
      o && setTimeout(()=> window.addEventListener('click',this.toggleMenu),100)
      !o && window.removeEventListener('click',this.toggleMenu)

      if (o){
          gsap.timeline()
          .to(this.$refs.wrapper,.5,{height:this.$refs.items.offsetHeight,ease:'expo.inOut'})
          .to(this.$refs.bar[0],.5,{rotate:45,y:'250%',ease:'expo.inOut'},'<')
          .to(this.$refs.bar[1],.5,{scale:0,ease:'expo.inOut'},'<')
          .to(this.$refs.bar[2],.5,{rotate:-45,y:'-250%',ease:'expo.inOut'},'<')
      } else {
          gsap.timeline()
          .to(this.$refs.wrapper,.5,{height:this.$refs.spacer.offsetHeight,ease:'expo.inOut'})
          .to(this.$refs.bar[0],.5,{rotate:0,y:0,ease:'expo.inOut'},'<')
          .to(this.$refs.bar[1],.5,{scale:1,ease:'expo.inOut'},'<')
          .to(this.$refs.bar[2],.5,{rotate:0,y:0,ease:'expo.inOut'},'<')
          .set(this.$refs.bar,{clearProps:'all'})
          .set(this.$refs.wrapper,{clearProps:'height'})

      }
    }
  },
  mounted(){
    if (!this.scrollId || this.headerItems.length == 0) return
    setTimeout(this.initHeader,500)
  },
  destroyed(){
    this.anim && this.anim.kill()
  },
  computed:{
    headerItems(){
      let items = [...this.items]
      if (this.mobileLabel && this.items.length > 1) items.unshift({label: this.mobileLabel,onClick:this.toggleMenu,menu: true})
      return items
    }
  },
  methods:{
    toggleMenu(){
      this.menuOpen = !this.menuOpen
    },
    initHeader(){
      this.anim = ScrollTrigger.create({
        trigger: this.scrollId,
        start: ()=> `top top-=${getPosition(this.$refs.header).top}`,
        end: ()=> `bottom top+=${this.$refs.header.offsetHeight}`,
        pin: this.$refs.header,
        pinSpacer: this.$refs.spacer,
        pinSpacing: false,
        onToggle:(e)=> this.$bus.$emit('PAUSE_TOP_NAV',e.isActive),
        invalidateOnRefresh:true
      })
    }
  }
}
</script>

<style lang="css">
  .sticky-header-item *{
    position: relative;
    z-index: 1;
  }
  .sticky-header-link{
    cursor: pointer;
  }
  .sticky-header-link:hover{
    background: theme('colors.lime');
  }
  .sticky-header-link:hover span{
    color:theme('colors.black')
  }
  .sticky-header-link:hover div{
    background: theme('colors.black')
  }

</style>
