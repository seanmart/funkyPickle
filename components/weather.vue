<template lang="html">
  <div class="c-weather">
    {{ weather[uid] }}
  </div>
</template>

<script>
const getWeather = () => import("~/data/weather.json").then((m) => m.default || m);
export default {
  props: ["uid"],
  async fetch() {

    this.$store.dispatch('loading',true)
    
    let data = this.$store.state.fetchData.weather;

    if (!data) {
      data = await getWeather();
      this.$store.commit("fetchData", { key: "weather", data });
    }

    this.weather = data;
  },
  data: () => ({
    weather: {},
  }),
  watch:{
    weather(){
      this.$store.dispatch('loading',false)
    }
  }
};
</script>

<style lang="scss"></style>
