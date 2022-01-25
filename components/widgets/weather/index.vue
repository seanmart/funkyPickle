<template lang="html">
  <widget class="c-weather-widget" :hide="!data">
    <template #content>
      <template v-if="data">
        <div class="c-icon--wrapper">
          <weather-icon class="c-icon" :icon="data.weather[0].icon" />
        </div>

        <div class="c-temp--wrapper">
          <h3 class="c-temp-value t-header" v-html="getTemp(data.main.temp)" />
          <span class="c-temp-description" v-html="data.weather[0].main" />
        </div>

        <div class="c-bar" />

        <div class="c-info--wrapper">
          <table class="c-info-table">
            <tr class="c-info-row" v-if="data.main.feels_like">
              <td class="c-info-label" v-html="'Feels Like'" />
              <td v-html="getTemp(data.main.feels_like)" />
            </tr>
            <tr class="c-info-row" v-if="data.main.humidity">
              <td class="c-info-label" v-html="'Humidity'" />
              <td v-html="data.main.humidity + '%'" />
            </tr>
            <tr class="c-info-row" v-if="data.sys.sunrise">
              <td class="c-info-label" v-html="'Sunrise'" />
              <td v-html="getTime(data.sys.sunrise)" />
            </tr>
            <tr class="c-info-row" v-if="data.sys.sunset">
              <td class="c-info-label" v-html="'Sunset'" />
              <td v-html="getTime(data.sys.sunset)" />
            </tr>
          </table>
        </div>
      </template>
    </template>
  </widget>
</template>

<script>
import widget from "../widget";
import { mapState } from "vuex";
import {getTemp,getTime} from '@/assets/js/helpers'

export default {
  name: "WeatherWidget",
  props: ["uid"],
  components: { widget },
  computed: {
    ...mapState(["eventsWeather"]),
    data() {
      return this.eventsWeather[this.uid] || null;
    },
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
  .c-widget-content {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
  }
  .c-icon--wrapper {
    flex: 0 0 auto;
    width: 20%;
  }
  .c-icon{
    display: block;
    width: 100%;
  }
  .c-temp--wrapper {
    flex: 0 0 auto;
    text-align: center;
  }
  .c-temp-value {
    font-size: 10vw;
  }
  .c-bar {
    flex: 0 0 1px;
    align-self: stretch;
    background: $pink;
  }
  .c-info--wrapper {
    flex: 0 0 auto;
    line-height: 1.4;
  }
  .c-info-table {
    text-align: left;
    font-weight: 800;
  }
  .c-info-label {
    text-align: right;
    padding-right: 3vw;
    font-weight: 400;
    opacity: 0.4;
  }

  @media screen and (min-width: $medium) {
    .c-temp-value {
      font-size: 3rem;
    }
    .c-info--wrapper {
      line-height: 1.6;
    }
    .c-info-label {
      padding-right: .75rem;
    }
  }

  @media screen and (min-width: $huge) {

    .c-temp-value {
      font-size: 3.25rem;
    }
    .c-info-label {
      padding-right: .65rem;
    }
  }
}
</style>
