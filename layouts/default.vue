<template lang="html">
  <div id="site">
    <svg-gradients />
    <preloader/>
    <columns />
    <navigation />
    <div id="scroller">
      <nuxt v-if="render" />
      <signup />
      <end-matter />
    </div>
  </div>
</template>

<script>
import {mapState} from 'vuex'
export default {
  data: () => ({
    first: true,
    render: false,
  }),
  mounted() {
    this.handleInit();
    this.render = true;
    this.first = true
  },
  computed: mapState(['status']),
  watch: {
    status(status){
      if(status == "LOADED") {

        if(this.first){
          setTimeout(()=>this.$store.commit('status','HIDE_PRELOADER'),1500)
          this.first = false
        } else{
          setTimeout(()=>this.$store.commit('status','HIDE_COLUMNS_LAYOUT'),500)
        }

        setTimeout(()=>{
          !isMobile && scrollBuddy.reset()
          ScrollTrigger.refresh(true)
        },250)
      }
      if(status == "COLUMNS_HIDDEN_LAYOUT") this.$store.commit('status','REVEAL')
    }
  },
  methods: {
    handleInit() {
      if (!isMobile) {
        scrollBuddy.init({
          el: "#scroller",
          event: ScrollTrigger.update,
          inertia: 0.1,
        });

        ScrollTrigger.scrollerProxy("#scroller", {
          scrollTop: (value) => scrollBuddy.top,
          getBoundingClientRect: () => ({
            top: 0,
            left: 0,
            width: window.innerWidth,
            height: window.innerHeight,
          }),
        });

        ScrollTrigger.defaults({
          scroller: "#scroller",
        });
      }
    },
  },
  middleware({store}) {
    if (process.server) return;
    return new Promise((next)=>{
      store.commit('status','SHOW_COLUMNS_LAYOUT')
      let unwatch = store.watch((e)=>{
        if(e.status == 'COLUMNS_VISIBLE_LAYOUT'){
          unwatch()
          next()
        }
      })
    })
  },
};
</script>
