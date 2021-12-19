<template lang="html">
  <section class="intro block">
    <header class="header--wrapper">
      <split-text :text="data.primary.title[0].text">
        <template #default="{word,line}">
          <div class="line--wrapper" :key="line">
            <h1 class="title--bg" v-html="word"/>
          </div>
        </template>
      </split-text>
    </header>
    <div class="content--wrapper">
      <div class="arrows--wrapper">
        <icon arrows/>
      </div>
      <div class="text--wrapper">
          <div class="bar"/>
          <div class="text--bg" v-html="$prismic.asHtml(data.primary.text)"/>
      </div>
    </div>
  </section>
</template>

<script>
export default {
  props:{data:Object}
}
</script>

<style lang="scss">
.intro{

  .header--wrapper{
    .line--wrapper{

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
  }
}
</style>
