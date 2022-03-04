<template lang="html">
  <div ref="container">
    <aside ref="sidebar" class="inline-flex flex-col">
      <template v-for="(section,i) in sections">
        <btn
          white
          noTarget
          ref="section"
          :class="{'mt-05':i}"
          :value="section.label"
          :href="`#${section.id}`"
          :id="`${section.id}-button`"
          @click.native.prevent="scrollToSection(section.id)"
          class="event-sidebar-button shadow-bottom"
        />
      </template>
    </aside>
  </div>
</template>

<script>
export default {
  props:{
    sections: Array,
    trigger:String,
    offset:Number,
    colors: Object
  },
  data:()=>({
    cancel: false
  }),
  mounted(){

    window.addEventListener('resize',this.handleResize)
    this.handleResize()

    this.anims = []

    this.anims.push(ScrollTrigger.create({
      trigger: this.trigger,
      start: `top top+=${this.offset}`,
      end: ()=> `bottom top+=${this.$refs.sidebar.offsetHeight + this.offset * 2}`,
      onEnter:(e)=> gsap.set(this.$refs.sidebar,{position: 'fixed',top: this.offset }),
      onLeaveBack:()=> gsap.set(this.$refs.sidebar,{clearProps:'all'}),
      onEnterBack:()=> gsap.set(this.$refs.sidebar,{clearProps:'y', position: 'fixed',top: this.offset }),
      onLeave: (e)=> gsap.set(this.$refs.sidebar,{clearProps:'position,top',y: e.end - e.start})

    }))

    let len = this.sections.length - 1

    this.sections.forEach((section,i) => {
      this.anims.push(ScrollTrigger.create({
        trigger: `#${section.id}`,
        start: `top ${!i ? 'bottom' : 'top+=200'}`,
        end: `bottom ${i == len ? 'top-=200' : 'top+=200'}`,
        onToggle:(e)=> !this.cancel && this.style(this.$refs.section[i].$el,e.isActive)
      }))
    })

  },
  destroyed(){
    this.anims && this.anims.forEach(a => a.kill())
    window.removeEventListener('resize',this.handleResize)
  },
  methods:{
    style(el,on){
      on
      ? gsap.set(el,{background: this.colors.primary, color:'white'})
      : gsap.set(el,{clearProps:'all'})
    },
    handleResize(){
      gsap.set(this.$refs.container,{minWidth: this.$refs.sidebar.offsetWidth})
    },
    scrollToSection(id){

      let btn = document.getElementById(`${id}-button`)

      this.cancel = true
      this.$refs.section.forEach(s => this.style(s.$el,false))
      btn && this.style(btn,true)

      gsap.to('#scroller', {
        duration: 1,
        ease: 'power2.out',
        scrollTo:{y:`#${id}`,offsetY:this.offset - 1},
        onComplete:()=> this.cancel = false
      });

    }
  }
}
</script>

<style lang="css">

</style>
