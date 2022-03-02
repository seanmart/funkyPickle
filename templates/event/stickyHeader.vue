<template lang="html">
  <div class="relative z-20" ref="wrapper" v-if="links">
    <container noTop noBottom class="flex flex-row justify-center items-center py-10px" ref="header">
      <template v-for="link in links">
        <btn pink wide :value="link.label" :to="link.url" class="mx-05"/>
      </template>
    </container>
  </div>
</template>

<script>
export default {
  props:{
    data:Object,
    trigger:String
  },
  mounted(){
    if (!this.trigger || !this.links) return

    let wrapper = this.$refs.wrapper
    let header = this.$refs.header.$el

    this.anim1 = ScrollTrigger.create({
      trigger: this.trigger,
      start: ()=> `top top+=${wrapper.offsetHeight}`,
      end: ()=> `bottom top+=${header.offsetHeight}`,
      pin:header,
      pinSpacing: false,
      invalidateOnRefresh:true,
      onEnter:()=> this.$bus.$emit('MOBILE_HEADER_DISABLED',true),
      onLeaveBack:()=> this.$bus.$emit('MOBILE_HEADER_DISABLED',false)
    })

    this.anim2 = ScrollTrigger.create({
      trigger: this.trigger,
      start: ()=> `top top+=${header.offsetHeight}`,
      onEnter:()=> header.classList.add('bg-white','shadow-bottom'),
      onLeaveBack:()=>header.classList.remove('bg-white','shadow-bottom')
    })
  },
  destroyed(){
    this.anim1 && this.anim1.kill()
    this.anim2 && this.anim2.kill()
  },
  computed:{
    links(){
      let links = []
      let registration = this.data.registration
      let tickets = this.data.tickets
      if(registration.url) links.push({...registration,label:'Registration'})
      if(tickets.url) links.push({...tickets,label:'Tickets'})
      return links.length > 0 ? links : null
    },
  }
}
</script>
