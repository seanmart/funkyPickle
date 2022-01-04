<template lang="html">
  <div id="site">
    <svg-gradients/>
    <columns/>
    <navigation/>
    <div id="scroller">
      <nuxt v-if="render"/>
    </div>
  </div>
</template>

<script>
import {mapState} from 'vuex'
export default {
  mounted(){

    if (!isMobile){
      ScrollTrigger.scrollerProxy('#scroller', {
        scrollTop: (value) => scrollBuddy.top,
        getBoundingClientRect: ()=> ({top: 0,left: 0,width: window.innerWidth,height: window.innerHeight})
      });
      ScrollTrigger.defaults({scroller: '#scroller'});
    }

    this.$store.commit('render')

  },
  computed: mapState(['render','ready']),
  data:()=>({first:true}),
  watch:{
    render(r){
      this.$nextTick(()=>{
        scrollBuddy.init({
          el:'#scroller',
          event: ScrollTrigger.update,
          inertia: .12
        })
      })
    },
    ready(ready){
      console.log('ready',ready)
      if(!ready) return

      if(this.first){
        this.first = false
        return
      }

      gsap.timeline()
          .set('#scroller',{clearProps:'all'})
          .to('#c-columns .c-column',.5,{x:'101%',ease:'power2.out',stagger:.05})
          .set('#c-columns',{clearProps:'all'})
          .set('#c-columns .c-column',{clearProps:'all'})

      !isMobile && scrollBuddy.reset()
    }
  },
  middleware({store}){
    if (process.server) return
    store.commit('ready',false)

    //leaving animation
    return new Promise((res)=>{
      gsap.timeline({onComplete:res})
          .set('#c-columns',{zIndex:101})
          .to('#c-columns .c-column',.5,{x:0,ease:'power2.out',stagger:.05})
          .set('#scroller',{opacity:0})
    })
  }
}
</script>

<style lang="scss">
</style>
