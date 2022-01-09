<template lang="html">
  <section class="c-sponsors o-container o-top o-bottom">
    <h2 class="t-headline-rg u-gap-btm-rg" v-html="data.primary.title"/>
    <div class="c-sponsors--wrapper">
      <template v-for="(logo,i) in data.items">
        <div :key="i" class="c-sponsor">
          <div class="c-sponsor-logo--wrapper">
            <img class="c-sponsor-logo" :src="logo.logo.url" :alt="logo.logo.alt">
          </div>
        </div>
      </template>
    </div>
  </section>

</template>

<script>
export default {
  props:['data']
}
</script>

<style lang="scss">
.c-sponsors{
  .c-sponsors--wrapper{
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    margin: 0px -$space / 4;
  }
  .c-sponsor{
    flex: 0 0 50%;
    padding: $space / 4;
  }
  .c-sponsor-logo--wrapper{
    display: flex;
    justify-content: center;
    align-items: center;
    background: white;
    overflow: hidden;
    border-radius: 8px;
    padding: $space / 2;
    .c-sponsor-logo{
      max-width: 100%;
    }
  }
  @media screen and (max-width:$tablet){
    .c-sponsors--wrapper{
      margin: 0px -10px;
    }
    .c-sponsor{
      padding: 10px;
    }
  }

  @media screen and (max-width:$mobile){
    .c-sponsor{
      flex: 0 0 100%;
    }
  }
}
</style>
