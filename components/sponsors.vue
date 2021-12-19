<template lang="html">
  <section class="sponsors block">
    <div class="header--wrapper">
      <div class="bar"/>
      <h4 class="title subtitle--rg" v-html="data.primary.title"/>
    </div>
    <div class="content--wrapper">
      <template v-for="(logo,i) in data.items">
        <div :key="i" class="item--wrapper">
          <div class="item">
            <div class="logo--wrapper">
              <img class="logo" :src="logo.logo.url" :alt="logo.logo.alt">
            </div>
          </div>
        </div>
      </template>
    </div>
  </section>
</template>

<script>
export default {
  props:{
    data:Object
  }
}
</script>

<style lang="scss">
  .sponsors{
    .header--wrapper{

      .bar{
        height: 5px;
        background: $pink;
      }

      .title{
        margin: 3rem 0px;
      }

    }

    .content--wrapper{
      display: flex;
      flex-direction: row;
      flex-wrap: wrap;

      .item--wrapper{
        flex: 0 0 25%;
        padding-right: 10px;
        padding-bottom: 10px;
      }

      .item{
        padding-bottom: 100%;
        position: relative;
      }

      .logo--wrapper{
        position: absolute;
        top: 0px;
        left: 0px;
        right: 0px;
        bottom: 0px;
        background: white;
        display: flex;
        justify-content: center;
        align-items: center;
      }

      .logo{
        width: 80%;
      }
    }
  }
</style>
