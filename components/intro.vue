<template lang="html">
  <section class="c-intro o-container o-top o-bottom" v-reveal="reveal" ref="container">

    <div class="c-title" v-if="data.primary.title.length > 0">
      <template v-for="(line,i) in data.primary.title">
        <div class="c-line--wrapper">
          <h1
            ref="title"
            v-html="line.text"
            class="c-line t-header-xl"
            :class="{['c-rainbow']:line.spans.length > 0}"
          />
        </div>
      </template>
    </div>

    <div class="c-content">

      <div
        ref="text"
        v-if="data.primary.text.length > 0"
        class="c-text t-body-xl u-gap-top-rg u-text-gap-rg"
        v-html="$prismic.asHtml(data.primary.text)"
      />

      <div
      class="c-image"
      />

    </div>

  </section>
</template>

<script>
export default {
  props:['data'],
  mounted(){
    this.textWords = this.$refs.text ? this.$refs.text.children : null
    this.$refs.title && gsap.set(this.$refs.title,{y:'100%'})
    this.textWords && gsap.set(this.textWords,{y:50,opacity:0})
  },
  methods:{
    reveal(){

      let tl = gsap.timeline({scrollTrigger:{
        trigger:this.$refs.container,
        start: 'top 50%',
        once:true
      }})

      this.$refs.title && tl.to(this.$refs.title,1,{y:0,stagger:.07, ease: 'power4.out'},0)
      this.textWords && tl.to(this.textWords,1,{y:0, opacity:1, stagger: .07, ease: 'power4.out'},'>-.5')
    }
  }
}
</script>

<style lang="scss">
.c-intro{
  position: relative;

  .c-line--wrapper{
    overflow: hidden;
  }

  .c-rainbow{
    @include rainbow-gradient;
    -webkit-background-clip: text;
    -webkit-text-fill-color: rgba(255, 255, 255, 0);
  }

  .c-text{
    max-width: 35ch;
  }

}
</style>
