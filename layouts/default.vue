<template lang="html">
  <div id="site">
    <svg-gradients/>
    <preloader v-if="first" :hide="ready" @hidden="handleFinished"/>
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
  data:()=>({
    first: true,
    render: false
  }),
  mounted(){
    this.handleInit()
    this.render = true
  },
  computed: mapState(['ready']),
  methods:{
    handleInit(){

      if(!isMobile){

        scrollBuddy.init({
          el:'#scroller',
          event: ScrollTrigger.update,
          inertia: .1
        })

        ScrollTrigger.scrollerProxy('#scroller', {
          scrollTop: (value) => scrollBuddy.top,
          getBoundingClientRect: ()=> ({
            top: 0,
            left: 0,
            width: window.innerWidth,
            height: window.innerHeight
          })
        });

        ScrollTrigger.defaults({
          scroller: '#scroller'
        });
      }

    },
    handleFinished(){
      this.first = false
      this.$store.commit('reveal',true)
      this.handleReady()
    },
    handleReady(){
      !isMobile && scrollBuddy.reset()
    }
  },
  watch:{
    ready(ready){
      if (ready && !this.first){
        gsap.timeline({onComplete:this.handleReady})
        .set('#scroller',{clearProps:'all'})
        .to('#c-columns .c-column',.5,{x:'101%',ease:'power2.out',stagger:.07})
        .set('#c-columns',{clearProps:'all'})
        .set('#c-columns .c-column',{clearProps:'all'})
      }
    }
  },
  middleware({store}){
    if (process.server) return
    store.commit('ready',false)

    return new Promise((res)=>{
      gsap.timeline({onComplete:res})
          .set('#c-columns',{zIndex:99})
          .to('#c-columns .c-column',.5,{x:0,ease:'power2.out',stagger:.07})
          .set('#scroller',{opacity:0})
    })
  }
}
</script>
