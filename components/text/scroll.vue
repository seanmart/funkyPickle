<template lang="html">
  <div class="text-scroll overflow-hidden relative w-full" ref="container">
    <div class="text-ref w-full opacity-0" ref="text">
      <slot/>
    </div>
    <div class="text-clones absolute inset-0 flex flex-row items-center" ref="wrapper"/>
  </div>
</template>

<script>
export default {
  props:{
    duration:{type:Number,default:20}
  },
  mounted(){

    if (Object.keys(this.$slots).length == 0) return

    this.container = this.$refs.container
    this.text = this.$slots.default[0].elm
    this.clone = this.text.cloneNode(true)
    this.text.innerHTML = 'X'
    this.wrapper = this.$refs.wrapper
    this.items = []
    this.timeout = null

    this.updateItems()

  },
  methods:{
    updateItems(){
      let count = Math.ceil(this.container.offsetWidth / this.text.offsetWidth) + 2;
      let len = this.items.length
      if (count < len){
        for (let i = 0; i < len - count; i++){
          this.items[this.items.length - 1].remove()
          this.items.pop()
        }
      } else if (count > len){
        for (let i = 0; i < count - len; i++){
          let clone = this.clone.cloneNode(true)
          clone.classList.add('text-scroll__item')
          this.items.push(clone)
          this.wrapper.appendChild(clone)
        }
      }
    },
  }
}
</script>

<style lang="css">

  .no-js .text-ref{
    opacity: 1;
  }
  .no-js .text-clones{
    display: none;
  }
  .text-scroll .text-scroll__item{
    white-space: nowrap;
    flex: 0 0 auto;
    animation: animate-scroll-left 40s linear infinite;
  }
  .text-scroll .text-ref > *{
    white-space: nowrap;
  }

</style>
