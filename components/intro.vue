<template lang="html">
  <section class="c-intro o-container o-space">

    <template v-for="(line, i) in theTitle">
      <div class="c-intro__line--wrapper">
        <h1 ref="line" v-html="line.text" class="c-intro__line t-header" :class="{ ['t-rainbow']: line.spans.length > 0 }" />
      </div>
    </template>

    <template v-if="theText.length > 0">
    <div class="c-intro__text t-md t-lg--sm u-pt-xl" v-html="$prismic.asHtml(theText)"/>
  </template>

  </section>
</template>

<script>
export default {
  props:['data','title','text'],
  computed:{
    theTitle(){
      if(this.data) return this.data.primary.title
      if(this.title) return this.title
      return []
    },
    theText(){
      if(this.data) return this.data.primary.text
      if(this.text) return this.text
      return []
    }
  }
}
</script>

<style lang="scss">
.c-intro{
  .c-intro__line{
    font-size: 8rem;
    letter-spacing: -.1rem;
    line-height: .77;
  }

  .c-intro__text{
    max-width: 35ch;
  }

  @media(min-width:$screen-sm){

    .c-intro__line{
      font-size: 10rem;
      letter-spacing: -.1rem;
    }

  }

}
</style>
