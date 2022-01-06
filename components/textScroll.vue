<template lang="html">
  <div class="text-scroll" ref="container">
    <div class="text-scroll--wrapper" ref="wrapper">
      <slot/>
    </div>
  </div>
</template>

<script>
export default {
  mounted(){
    let container = this.$refs.container
    let text = this.$slots.default[0].elm
    let count = Math.ceil(text.offsetWidth / container.offsetWidth) + 1
    let wrapper = this.$refs.wrapper
    //let clones = [text]

    for (let i = 0; i < count; i++){
      let clone = text.cloneNode(true)
      //clones.push(clone)
      wrapper.appendChild(clone)
    }

    //gsap.to(clones,20,{x:'-100%',ease:'none',repeat:-1})

  }
}
</script>

<style lang="scss">
  .text-scroll{
    height: 100%;
    width: 100%;
    position: relative;
    overflow: hidden;

    .text-scroll--wrapper{
      @include cover;
      display: flex;
      flex-direction: row;
      align-items: center;

      > *{
        white-space: nowrap;
        flex: 0 0 auto;
        animation: animate-scroll-left 20s infinite linear;
      }
    }
  }
</style>
