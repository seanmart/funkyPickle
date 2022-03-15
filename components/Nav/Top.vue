<template lang="html">
  <nav id="top-nav" class="fixed top-0 left-0 right-0 md:hidden bg-white shadow-b-blue py-10 flex justify-center z-100">
    <nuxt-link to="/">
      <logo horizontal color spin class="h-50px"/>
    </nuxt-link>
  </nav>
</template>

<script>
import {mapState} from 'vuex'
export default {
  data:()=>({
    hide: true,
    pause: false
  }),
  watch:{
    pause(p){
      !p && (this.hide = true)
    },
    hide(){
      this.toggleTopNav()
    }
  },
  mounted(){
    this.$bus.$once('REVEAL',()=> this.hide = false)
    this.$bus.$on('PAUSE_TOP_NAV',(x)=> this.pause = x)
    this.$bus.$on('MOBILE_NAV_VISIBLE',()=> this.anim.play())
    this.$bus.$on('MOBILE_NAV_HIDDEN',this.toggleTopNav)

    this.anim = gsap.to('#top-nav',1,{y:0,ease: 'expo.inOut',paused: true})

    ScreenBuddy.onMd((bigger)=>{
      this.trigger && this.trigger.kill()
      if (bigger) return
      this.trigger = ScrollTrigger.create({
        start: 0,
        end: 99999,
        onUpdate:(s)=> (this.hide = s.direction == 1)
      })
    })
  },
  methods:{
    toggleTopNav(){
      this.anim[this.hide || this.pause ? 'reverse' : 'play']()
    }
  }
}
</script>

<style lang="css">
  #top-nav{
    transform: translateY(-100%);
  }
</style>
