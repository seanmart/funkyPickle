<template lang="html">
  <div class="c-mini-weather-widget t-bold" v-if="data">
    <icon class="c-mini-weather-widget__icon" :icon="data.weather[0].icon"/>
    <span class="c-mini-weather-widget__temp" v-html="`${data.weather[0].main}, ${getTemp(data.main.temp)}`"/>
  </div>
</template>

<script>
import {getTemp} from '~/@js/helpers'
import {mapState} from 'vuex'
export default {
  props:['uid'],
  data:()=>({getTemp}),
  computed:{
    ...mapState(['weather']),
    data(){
      return this.weather[this.uid] || null
    }
  }
}
</script>

<style lang="scss">
  .c-mini-weather-widget{
    background: lighten($black,70%);
    color:white;
    fill:white;
    display: inline-flex;
    flex-direction: row;
    align-items: center;
    border-radius: .5rem;
    padding: 5px 10px;
    font-size: 10px;

    .c-mini-weather-widget__icon{
      height: 12px;
      margin-right: 5px;
    }
  }
</style>
