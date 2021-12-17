<template lang="html">
  <section class="intro block">
    <header class="header--wrapper fnt--header">
      <template v-for="(word,i) in split(data.primary.title[0].text)">
        <div class="line--wrapper">
          <h1 :key="i" v-html="word"/>
        </div>
      </template>
    </header>
    <div class="content--wrapper">
      <div class="arrows--wrapper">
        <svg class="arrows" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 84.5 603.57">
          <polygon class="cls-1" points="42.25 603.57 84.5 531.14 0 531.14 42.25 603.57"/>
          <polygon class="cls-1" points="42.25 470.79 84.5 398.36 0 398.36 42.25 470.79"/>
          <polygon class="cls-1" points="42.25 338 84.5 265.57 0 265.57 42.25 338"/>
          <polygon class="cls-1" points="42.25 205.21 84.5 132.79 0 132.79 42.25 205.21"/>
          <polygon class="cls-1" points="84.5 0 0 0 42.25 72.43 84.5 0"/>
        </svg>
      </div>
      <div class="text--wrapper">
          <div class="bar"/>
          <div class="text" v-html="$prismic.asHtml(data.primary.text)"/>
      </div>
    </div>
  </section>
</template>

<script>
export default {
  props:{data:Object},
  methods:{
    split(val){
      if(!val) return []
      return val.split('\n').map(v => `${v} `)
    }
  }
}
</script>

<style lang="scss">
.intro{

  .header--wrapper{
    .line--wrapper{
      h1{
        font-size: 11vw;
        line-height: .85;
        font-weight: 600;
        text-transform: uppercase;
        font-variation-settings: "wdth" 56,"wght" 600;
      }

      &:last-child{
        color: $pink;
      }
    }

  }


  .content--wrapper{
    display: flex;
    flex-direction: row;
    padding-top: 5rem;

    .arrows--wrapper{
      flex: 0 0 50%;
    }

    .arrows{
      width: 1rem;
      opacity: .25;
    }

    .text--wrapper{
      flex: 0 0 50%;
      position: relative;
      padding-top: 4rem;
    }

    .bar{
      position: absolute;
      top: 0px;
      left: 0px;
      right: 0px;
      height: .5rem;
      background: $pink;
    }

    .text{
      font-size: 2rem;
      line-height: 1.4;
      font-variation-settings: "wght" 400;
    }

  }
}
</style>
