<template lang="html">
  <div>
    <main-menu/>
    <div id="scroller">
      <nuxt/>
    </div>
    <rails/>
  </div>
</template>

<script>
export default {
  mounted(){

    if(!isMobile){

      scrollBuddy.init({
        el:'#scroller',
        event: ScrollTrigger.update,
        inertia: .15
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
  watch:{
    $route(){
      !isMobile && scrollBuddy.reset
    }
  }
}
</script>
