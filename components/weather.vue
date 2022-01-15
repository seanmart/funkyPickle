<template lang="html">
  <div class="c-weather">
    {{ data }}
  </div>
</template>

<script>
const getWeather = () => import("~/data/weather.json").then((m) => m.default || m);
export default {
  async fetch() {
    this.$store.dispatch("fetchingStarted");
    this.data = await getWeather();
    this.$store.dispatch("fetchingComplete");
  },
  data: () => ({
    data: {},
  }),
};
</script>

<style lang="scss"></style>
