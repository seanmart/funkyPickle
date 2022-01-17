<template lang="html">
  <widget class="c-weather-widget" :hide="!data">
    <template #content>
      <template v-if="data">
        <div class="c-icon--wrapper">
          <weather-icon :icon="data.weather[0].icon" />
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
import weatherIcon from "./weatherIcon";
import widget from "../widget";
import { mapState } from "vuex";

export default {
  name: "WeatherWidget",
  props: ["uid"],
  components: { weatherIcon, widget },
  computed: {
    ...mapState(["eventsWeather"]),
    data() {
      return this.eventsWeather[this.uid] || null;
    },
  },
  methods: {
    getTemp(k) {
      return `${Math.round(((k - 273.15) * 9) / 5 + 32)}°F`;
    },
    getTime(t) {
      let o = this.data.timezone || 0;
      return new Date(t * 1000 + o * 1000).toLocaleTimeString("en-US", {
        timeZone: "UTC",
        hour: "2-digit",
        minute: "2-digit",
      });
    },
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
    svg {
      display: block;
      width: 7rem;
    }
  }

  .c-temp--wrapper {
    flex: 0 0 auto;
    text-align: center;

    .c-temp-value {
      font-size: 5rem;
    }
  }

  .c-bar {
    flex: 0 0 1px;
    align-self: stretch;
    background: $pink;
  }

  .c-info--wrapper {
    flex: 0 0 auto;

    .c-info-table {
      text-align: left;
      font-weight: 800;
      font-size: 1.4rem;
    }
    .c-info-label {
      text-align: right;
      padding-right: 1.5rem;
      font-weight: 400;
      opacity: 0.75;
    }
  }
}
</style>
