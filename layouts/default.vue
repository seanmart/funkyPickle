<template lang="html">
  <div id="site">
    <svg-gradients/>
    <preloader v-if="first" :hide="pageLoaded" @hidden="afterPreloaderHidden"/>
    <columns/>
    <navigation/>
    <div id="scroller">
      <div id="page-content">
        <nuxt v-if="render"/>
      </div>
      <end-matter/>
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
  computed: mapState(['pageLoaded']),
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
    afterPreloaderHidden(){
      this.first = false
      this.$store.commit('reveal',true)
      !isMobile && scrollBuddy.reset()
    }
  },
  watch:{
    pageLoaded(pageLoaded){
      if (this.first || !pageLoaded ) return
      gsap.set('#scroller',{clearProps:'all'})
      this.$store.commit('columnsShow',false)
      setTimeout(()=>{
        this.$store.commit('reveal',true)
        !isMobile && scrollBuddy.reset()
      },250)
    }
  },
  middleware({store}){
    if (process.server) return
    return new Promise((res)=>{
      store.commit('columnsShow',true)
      store.commit('pageLoaded',false)
      store.commit('reveal',false)

      let unwatch = store.watch((e)=>{
        if (e.columns.complete){
          gsap.set('#scroller',{opacity:0})
          unwatch && unwatch()
          res()
        }
      })
    })
  }
}
</script>
