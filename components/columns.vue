<template lang="html">
  <div id="c-columns">
    <div v-for="i in 4" :key="i" class="c-column--wrapper">
      <div :class="`c-column c-column-${i+1}`"/>
    </div>
  </div>
</template>

<script>
import {mapState} from 'vuex'
export default {
  computed: mapState({
    show: state => state.columns.show
  }),
  watch:{
    show(show){
      show ? this.showColumns() : this.hideColumns()
    }
  },
  methods:{
    showColumns(){
      gsap.timeline({onComplete:()=> this.$store.commit('columnsComplete',true)})
      .set('#c-columns',{zIndex:99})
      .to('#c-columns .c-column',.5,{x:0,ease:'power2.out',stagger:.07})
    },
    hideColumns(){
      gsap.timeline({onComplete:()=> this.$store.commit('columnsComplete',true)})
      .to('#c-columns .c-column',.5,{x:'101%',ease:'power2.out',stagger:.07},0)
      .set('#c-columns',{clearProps:'all'})
      .set('#c-columns .c-column',{clearProps:'all'})
    }
  }
}
</script>

<style lang="scss">
#c-columns{
  position: fixed;
  top: 0px;
  right: 0px;
  bottom: 0px;
  left: $navigation-width;
  z-index: -1;
  display: flex;
  flex-direction: row;

  .c-column--wrapper{
    flex: 1 1 auto;
    overflow: hidden;
  }

  .c-column{
    background: white;
    height: 100%;
    width: 100%;
    transform: translateX(-101%);
  }

  @media screen and (max-width: $tablet){
    left: 0px;
    top: $navigation-height;
  }
}
</style>
