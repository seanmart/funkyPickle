<template lang="html">
  <widget class="c-weather-widget" v-if="data">
    <template>

        <div class="c-icon--wrapper o-widget-space">
          <weather-icon class="c-icon" :icon="data.weather[0].icon"/>
        </div>

        <div class="c-content--wrapper o-widget-space">

          <div class="c-temp--wrapper o-widget-gap">
            <h3 class="c-temp t-header" v-html="getTemp(data.main.temp)" />
            <span class="c-description" v-html="data.weather[0].main" />
          </div>

          <div class="c-info--wrapper">
            <table class="c-info">
              <template v-for="item in info">
              <tr class="c-info-row" v-if="item.value">
                <td class="c-info-label" v-html="item.label" />
                <td v-html="item.value" />
              </tr>
            </template>
            </table>
          </div>

        </div>

    </template>
  </widget>
</template>

<script>
import widget from "./widget";
import { mapState } from "vuex";
import {getTemp,getTime} from '@/assets/js/helpers'

export default {
  name: "WeatherWidget",
  props: ["uid"],
  components: { widget },
  computed: {
    ...mapState({
      weatherData: state => state.meta.weather
    }),
    data(){
      return this.weatherData[this.uid] || null
    },
    info(){
      if (!this.data) return []
      let fl = this.data.main.feels_like || null
      let h = this.data.main.humidity || null
      let sr = this.data.sys.sunrise || null
      let ss = this.data.sys.sunset || null
      return [
        {label: 'Feels Like', value: fl ? this.getTemp(fl) : null },
        {label: 'Humidity', value: h ? h + '%' : null },
        {label: 'Sunrise', value: sr ? this.getTime(sr) : null },
        {label: 'Sunset', value: ss ? this.getTime(ss) : null },
      ]
    }
  },
  methods: {
    getTemp(k) {
      return getTemp(k)
    },
    getTime(t) {
      return getTime(t,this.data.timezone || 0)
      let o = this.data.timezone || 0;
    }
  },
};
</script>

<style lang="scss">
.c-weather-widget {
  .c-widget-content{
    display: flex;
    flex-direction: row;
    align-items: stretch;
  }
  .c-icon--wrapper{
    flex: 0 0 20%;
    display: flex;
    justify-content: center;
    align-items: center;
    background: $pink;
  }
  .c-icon{
    flex: 0 0 100%;
    fill: white;
  }

  .c-content--wrapper{
    flex: 1 1 auto;
    display: flex;
    flex-direction: row;
    align-items: center;
  }

  .c-temp--wrapper{
    flex: 1 1 auto;
    text-align: center;
  }

  .c-temp{
    font-size: 13vw;
  }

  .c-info--wrapper{
    flex: 0 0 auto;
  }

  .c-info{
    font-weight: 800;
  }

  .c-info-label{
    opacity: .5;
    text-align: right;
    padding-right: 20px;
    font-weight: 400;
  }

  @media screen and (min-width: $medium){

    .c-temp{
      font-size: 4rem;
    }

  }
}
</style>
