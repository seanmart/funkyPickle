<template lang="html">
  <div class="h-50 relative z-50" ref="spacer" v-if="items.length > 0">
    <div class="absolute inset-0 h-50 no-scrollbar flex flex-col md:flex-row" :class="{'overflow-hidden':!menuOpen}" ref="header">

      <template v-for="(item,i) in headerItems">
        <div
          :style="backgroundStyles"
          class="sticky-header-item flex-shrink-0 md:flex-auto flex justify-center items-center font-bold h-50 relative"
          :class="[backgroundClasses,{'cursor-pointer':item.onClick ||item.menu, 'md:hidden': item.menu,'border-t-2 md:border-t-0 md:border-l-2': i > 0}]"
          @click="()=>item.onClick && item.onClick()"
        >
          <span v-html="item.label"/>
          <span v-if="item.onClick && !item.menu" v-html="'❯'" class="ml-10 text-lime"/>
          <button v-if="item.menu" class="ml-10 w-30px"><div v-for="i in 3" class="h-2px w-full bg-lime my-3px"/></button>
        </div>
      </template>
    </div>
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
  .sticky-header-item{
    border-color:rgba(theme('colors.blackrgb'),.15)
  }
  .sticky-header-item *{
    position: relative;
    z-index: 1;
  }
  .sticky-header-item:last-child{
    border-right: none;
  }
  .is-desktop .sticky-header-item.cursor-pointer:hover::after{
    content: '';
    position: absolute;
    top:0px;
    left:0px;
    right:0px;
    bottom:0px;
    background: rgba(theme('colors.blackrgb'),.15);
  }

</style>
