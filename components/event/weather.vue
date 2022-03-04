<template lang="html">
  <container-widget v-if="weather" row >

    <div class="flex-initial text-center p-10px rounded-lg flex flex-col justify-center items-center">
      <icon :icon="icon" class="w-50 md:w-40 mb-10px"/>
      <h3 v-html="temp" class="text-35 md:text-25 leading-10"/>
    </div>

    <div class="flex-initial pl-20px">
      <text-label first value="feels like:"/>
      <h3 v-html="feels"/>
      <text-label value="description:"/>
      <h3 v-html="description"/>
    </div>

  </container-widget>
</template>

<script>
import {getTemp} from "@/assets/helpers";
export default {
  props:['uid'],
  computed:{
    weather(){
      return this.$store.state.weather[this.uid] || null
    },
    icon(){
      return this.weather.weather[0].icon
    },
    temp(){
      return getTemp(this.weather.main.temp)
    },
    feels(){
      return getTemp(this.weather.main.feels_like)
    },
    description(){
      return this.weather.weather[0].main
    }
  }
}
</script>
