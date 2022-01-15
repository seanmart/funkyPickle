<template lang="html">
  <div class="c-weather" v-if="uid">
    {{ weather[uid] }}
  </div>
</template>

<script>
const getWeather = () => import("~/data/weather.json").then((m) => m.default || m);
export default {
  props: ["uid"],
  async fetch() {
    let data = this.$store.state.fetchData.weather;

    if (!data) {
      this.$store.dispatch("fetchingStarted");
      data = await getWeather();
      this.$store.commit("fetchData", { key: "weather", data });
      this.$store.dispatch("fetchingComplete");
    }

    this.weather = data;
  },
  data: () => ({
    weather: {},
  }),
};
</script>

<style lang="scss"></style>
