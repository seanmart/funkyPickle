<template lang="html">
  <div class="c-weather">
    {{ weather[eventId] }}
  </div>
</template>

<script>
const getWeather = () => import("~/data/weather.json").then((m) => m.default || m);
export default {
  props: ["eventId"],
  async fetch() {
    let weather = this.$store.state.fetchData.weather;

    if (!weather) {
      this.$store.dispatch("fetchingStarted");
      weather = await getWeather();
      this.$store.commit("fetchData", { key: "weather", data: weather });
      this.$store.dispatch("fetchingComplete");
    }

    this.weather = weather;
  },
  data: () => ({
    weather: {},
  }),
};
</script>

<style lang="scss"></style>
