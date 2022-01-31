<template lang="html">
  <div class="c-text-scroll u-cover-container" ref="container">
    <div class="c-text-scroll--wrapper u-cover" ref="wrapper">
      <slot/>
    </div>
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
    this.wrapper = this.$refs.wrapper
    this.items = [this.text]
    this.timeout = null

    this.addClass(this.text)
    this.updateItems()

    window.addEventListener('resize',this.handleResize)
    this.handleResize(true)

  },
  destroyed(){
    window.removeEventListener('resize',this.handleResize)
  },
  methods:{
    addClass(el){
      el.classList.add('c-text-scroll__item')
    },
    updateItems(){
      let count = Math.ceil(this.container.offsetWidth / this.text.offsetWidth) + 1;
      let len = this.items.length
      if (count < len){
        for (let i = 0; i < len - count; i++){
          this.items[this.items.length - 1].remove()
          this.items.pop()
        }
      } else if (count > len){
        for (let i = 0; i < count - len; i++){
          let clone = this.text.cloneNode(true)
          this.addClass(clone)
          this.items.push(clone)
          this.wrapper.appendChild(clone)
        }
      }
    },
    handleResize(skip = false){
      this.timeout && clearTimeout(this.timeout)
      this.container.style.height = `${this.text.offsetHeight}px`
      !skip && (this.timeout = setTimeout(this.updateItems,250))
    }
  }
}
</script>

<style lang="scss">
  .c-text-scroll{
    width: 100%;
    position: relative;
    overflow: hidden;

    .c-text-scroll--wrapper{
      display: flex;
      flex-direction: row;
      align-items: center;
    }

    .c-text-scroll__item{
      white-space: nowrap;
      flex: 0 0 auto;
      animation: animate-scroll-left 30s linear infinite;
    }
  }
</style>
