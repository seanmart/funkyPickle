<template lang="html">
  <aside ref="sidebar">
    <template v-for="(section,i) in sections">
      <a
        ref="section"
        :class="{'mt-05':i}"
        v-html="section.label"
        :href="`#${section.id}`"
        :id="`${section.id}-button`"
        @click.prevent="scrollToSection(section.id)"
        class="event-sidebar-button block py-05 pl-10 bg-white rounded-full shadow-bottom font-semibold"
      />
    </template>
  </aside>
</template>

<script>
export default {
  props:{
    sections: Array,
    trigger:String,
    offset:Number
  },
  data:()=>({
    cancel: false
  }),
  destroyed(){
    this.anims && this.anims.forEach(a => a.kill())
  },
  mounted(){
    this.anims = []

    this.anims.push(ScrollTrigger.create({
      pinSpacing: false,
      trigger: this.trigger,
      pin:this.$refs.sidebar,
      invalidateOnRefresh:true,
      start: `top top+=${this.offset}`,
      end: ()=> `bottom top+=${this.$refs.sidebar.offsetHeight + this.offset * 2}`
    }))

    let len = this.sections.length - 1

    this.sections.forEach((section,i) => {
      this.anims.push(ScrollTrigger.create({
        trigger: `#${section.id}`,
        start: `top ${!i ? 'bottom' : 'top+=200'}`,
        end: `bottom ${i == len ? 'top-=200' : 'top+=200'}`,
        onToggle:()=> !this.cancel && this.$refs.section[i].classList.toggle('active')
      }))
    })

  },
  methods:{
    scrollToSection(id){

      let btn = document.getElementById(`${id}-button`)

      this.cancel = true
      this.$refs.section.forEach(s => s.classList.remove('active'))
      btn && btn.classList.add('active')

      gsap.to('#scroller', {
        duration: .75,
        ease: 'power2.out',
        scrollTo:{y:`#${id}`,offsetY:this.offset},
        onComplete:()=> this.cancel = false
      });

    }
  }
}
</script>

<style lang="css">
.event-sidebar-button{
  transition: background .1s, color .1s;
}
.event-sidebar-button:hover{
  background: theme('colors.pink');
  color: theme('colors.white');
}
.event-sidebar-button.active{
  background: theme('colors.black');
  color: theme('colors.white');
}
</style>
