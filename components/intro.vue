<template lang="html">
  <section class="c-intro o-container o-top o-bottom">

    <split-text :text="data.primary.title[0].text" class="c-intro-header">
      <template #default="{word,line}">
        <div class="c-intro-line--wrapper" :key="line">
          <h1 class="c-intro-line t-header-xl" v-html="word"/>
        </div>
      </template>
    </split-text>

    <div class="c-intro-text t-body-xl u-gap-top-rg" v-html="$prismic.asHtml(data.primary.text)"/>

    <div class="c-intro-ball" v-distance="-400"/>

  </section>
</template>

<script>
export default {
  props:['data']
}
</script>

<style lang="scss">
.c-intro{
  position: relative;

  .c-intro-header{
    .c-intro-line--wrapper{
      &:last-child{
        @include rainbow-gradient;
        -webkit-background-clip: text;
        -webkit-text-fill-color: rgba(255, 255, 255, 0);
      }
    }
  }

  .c-intro-text{
    max-width: 35ch;
  }

  .c-intro-ball{
    @include lime-gradient(45);
    width: 70vw;
    height:70vw;
    border-radius: 50%;
    position: absolute;
    top:$space + 100;
    left: 60%;
    z-index: -1;
  }
}
</style>
