<template lang="html">
  <div>
    <main-menu/>
    <div id="scroller">
      <nuxt/>
    </div>
    <rails/>
    <columns/>
  </div>
</template>

<script>
import {mapState} from 'vuex'
export default {
  mounted(){

    if(!isMobile){

      scrollBuddy.init({
        el:'#scroller',
        event: ScrollTrigger.update,
        inertia: .12
      })

      ScrollTrigger.scrollerProxy('#scroller', {
        scrollTop(value) {
          return scrollBuddy.top;
        },
        getBoundingClientRect() {
          return {
            top: 0,
            left: 0,
            width: window.innerWidth,
            height: window.innerHeight
          };
        }
      });

      ScrollTrigger.defaults({scroller: '#scroller'});
    }
  },
  computed: mapState(['transition']),
  watch:{
    transition(on){
      if(on) return
      //entering animation
      gsap.timeline()
          .set('#scroller',{clearProps:'all'})
          .to('#columns .column',.5,{x:'101%',ease:'power2.out',stagger:.05})
          .set('#columns',{clearProps:'all'})
          .set('#columns .column',{clearProps:'all'})
      !isMobile && scrollBuddy.reset()
    }
  },
  middleware({store}){
    if (process.server) return
    store.commit('setTransition',true)

    //leaving animation
    return new Promise((res)=>{
      gsap.timeline({onComplete:res})
          .set('#columns',{zIndex:101})
          .to('#columns .column',.5,{x:0,ease:'power2.out',stagger:.05})
          .set('#scroller',{opacity:0})
    })

  }
}
</script>
