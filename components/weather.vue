<template lang="html">
  <div class="c-weather">
    <div class="c-weather-temp" v-if="eventWeather">
      Temp is {{temp}}°
    </div>
  </div>
</template>

<script>
const getWeather = () => import("~/data/weather.json").then((m) => m.default || m);
export default {
  props: ["uid"],
  async fetch() {

    let data = this.$store.state.fetchData.weather;

    if (!data) {
      data = await getWeather();
      this.$store.commit("fetchData", { key: "weather", data });
    }

    this.data = data;
  },
  data: () => ({
    data: {}
  }),
  computed:{
    eventWeather(){
      return this.data[this.uid] || null
    },
    temp(){
      if(!this.eventWeather) return null
      return Math.round((this.eventWeather.current.temp - 273.15) * 9/5 + 32)
    }
  }
};
</script>

<style lang="scss"></style>
