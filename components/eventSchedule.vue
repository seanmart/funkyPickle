<template lang="html">
  <section class="c-event-schedule o-container o-top o-bottom">
    <h2 v-if="data.primary.title" class="t-headline-rg u-gap-btm-rg" v-html="data.primary.title"/>
    <event-list :data="data.primary.limit ? events.slice(0,data.primary.limit) : events"/>
    <div class="u-gap-top-rg c-event-btn" v-if="data.primary.link.uid" ref="btn">
      <btn :to="`/${data.primary.link.uid}`" rainbow arrow>view all events</btn>
    </div>
  </section>
</template>

<script>
export default {
  props:['data'],
  data:()=>({events:[]}),
  async fetch(){
    await this.$store.dispatch('eventsMetaData')
    this.events = this.$store.state.eventsMetaData
  },
  mounted(){
    if(this.$refs.btn){
      let btn = this.$refs.btn.children
      gsap.fromTo(btn,1,{scale:.5,opacity:0},{scale:1,transformOrigin:'center center', opacity:1,ease:'power2.out',scrollTrigger:{
        trigger:btn,
        start:'top 80%'
      }})
    }
  }
}
</script>
<style lang="scss">
  .c-event-schedule{
    @media screen and (max-width:$mobile){
      .c-event-btn{
        text-align: center;
      }
    }
  }
</style>
