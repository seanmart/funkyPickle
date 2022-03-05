<template lang="html">
  <div ref="wrapper" v-if="links">
    <div class="relative z-20" ref="spacer">
      <container noTop noBottom class="flex flex-row justify-center items-center py-10px" ref="header">
        <template v-for="link in links">
          <btn wide
            :value="link.label"
            :href="link.url"
            class="mx-05"
            :bg="colors.primary"
            :hoverBg="colors.secondary"
            :activeBg="`${colors.secondary}-10`"
          />
        </template>
      </container>
    </div>
  </div>
</template>

<script>
export default {
  props:{
    data:Object,
    colors: Object,
    trigger:String
  },
  mounted(){
    if (!this.trigger || !this.links) return

    window.addEventListener('resize',this.handleResize)

    let wrapper = this.$refs.wrapper
    let header = this.$refs.header.$el
    let spacer = this.$refs.spacer

    this.anim1 = ScrollTrigger.create({
      trigger: this.trigger,
      start: ()=> `top top+=${wrapper.offsetHeight}`,
      end: ()=> `bottom top+=${header.offsetHeight}`,
      invalidateOnRefresh:true,
      onEnter:()=>{
        this.fixed = true
        gsap.set(spacer,{height:header.offsetHeight})
        gsap.set(header,{position:'fixed',top:0,left:wrapper.offsetLeft,right:0})
        this.$bus.$emit('MOBILE_HEADER_DISABLED',true)
      },
      onLeaveBack:()=>{
        this.fixed = false
        gsap.set([header,spacer],{clearProps:'all'})
        this.$bus.$emit('MOBILE_HEADER_DISABLED',false)
      },
      onLeave:(e)=>{
        this.fixed = false
        gsap.set(header,{clearProps:'position,top,left,right',y: e.end - e.start})
        gsap.set(spacer,{clearProps:'all'})
        this.$bus.$emit('MOBILE_HEADER_DISABLED',false)
      },
      onEnterBack:()=>{
        this.fixed = true
        gsap.set(spacer,{height:header.offsetHeight})
        gsap.set(header,{position:'fixed',top:0,left:wrapper.offsetLeft,right:0,clearProps:'y'})
        this.$bus.$emit('MOBILE_HEADER_DISABLED',true)
      }
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
  },
  methods:{
    handleResize(){
      if(this.fixed){
        this.$refs.header.$el.style.left = this.$refs.wrapper.offsetLeft + 'px'
      }
    }
  }
}
</script>
