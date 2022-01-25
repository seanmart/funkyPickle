<template lang="html">
  <section class="c-sponsors o-container o-space">

    <template v-if="data.primary.title">
      <h2 class="t-headline" v-html="data.primary.title" ref="title" />
    </template>

    <div class="c-sponsors--wrapper">
      <template v-for="(logo, i) in data.items">
        <div :key="i" class="c-sponsor">
          <div class="c-sponsor-logo--wrapper">
            <img class="c-sponsor-logo" :src="logo.logo.url" :alt="logo.logo.alt" />
          </div>
        </div>
      </template>
    </div>
  </section>
</template>

<script>
export default {
  props: ["data"],
};
</script>

<style lang="scss">
.c-sponsors {

  .c-sponsors--wrapper {
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    align-items: center;
    margin: 0px -2rem;
  }
  .c-sponsor {
    padding: 2rem;
    flex: 0 0 50%;
  }
  .c-sponsor-logo--wrapper {
    display: flex;
    justify-content: center;
    align-items: center;
    overflow: hidden;
    .c-sponsor-logo {
      max-width: 100%;
    }
  }
  @media screen and (min-width: $medium) {
    .c-sponsors--wrapper {
      margin: 0px -3rem;
    }
    .c-sponsor {
      flex: 0 0 33.333%;
      padding: 3rem;
    }
  }
}
</style>
