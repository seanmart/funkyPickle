<template lang="html">
  <widget class="c-weather-widget">
    <template #content>
      <template v-if="current">

        <div class="c-icon--wrapper">
          <weather-icon :icon="current.weather[0].icon"/>
        </div>

        <div class="c-temp--wrapper">
          <h3 class="c-temp-value t-header" v-html="getTemp(current.temp)"/>
          <span class="c-temp-description" v-html="current.weather[0].main"/>
        </div>

        <div class="c-bar"/>

        <div class="c-info--wrapper">
          <table class="c-info-table">
            <template v-for="(item,i) in info">
              <tr class="c-info-row">
                <template v-if="current[item.key]">
                  <td class="c-info-label" v-html="`${item.label}:`"/>
                  <td v-if="item.temp" v-html="getTemp(current[item.key])"/>
                  <td v-else-if="item.time" v-html="getTime(current[item.key])"/>
                  <td v-else v-html="current[item.key]"/>
                </template>
              </tr>
            </template>
          </table>
        </div>

      </template>
    </template>
  </widget>
</template>

<script>
import weatherIcon from './weatherIcon'
const getWeather = () => import("~/data/weather.json").then((m) => m.default || m);

export default {
  props: ["uid"],
  name: 'WeatherWidget',
  components:{weatherIcon},
  async fetch() {

    let data = this.$store.state.fetchData.weather;

    if (!data) {
      data = await getWeather();
      this.$store.commit("fetchData", { key: "weather", data });
    }

    this.data = data;
  },
  data: () => ({
    data: {},
    info:[
      {label:'Feels Like',key:'feels_like',temp:true},
      {label:'Humidity',key:'humidity'},
      {label:'Sunrise',key:'sunrise',time:true},
      {label:'Sunset',key:'sunset',time:true}
    ]
  }),
  computed:{
    current(){
      let eventData = this.data[this.uid] || {}
      return eventData.current || null
    }
  },
  methods:{
    getTemp(k){
      return `${Math.round((k - 273.15) * 9/5 + 32)}°F`
    },
    getTime(t){
      let date = new Date(t * 1000)
      let hrs = date.getHours()
      let min = date.getMinutes()
      let ampm = hrs >= 12 ? 'pm' : 'am';
      hrs = hrs % 12
      min = min < 10 ? '0'+min : min;

      return `${hrs}:${min} ${ampm}`

    }
  }
}
</script>

<style lang="scss">
.c-weather-widget{

  .c-widget-content{
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
  }

  .c-icon--wrapper{
    flex: 0 0 auto;
    svg{
      display: block;
      width: 7rem;
    }
  }

  .c-temp--wrapper{
    flex: 0 0 auto;
    text-align: center;

    .c-temp-value{
      font-size: 5rem;
    }
  }

  .c-bar{
    flex: 0 0 1px;
    align-self: stretch;
    background: $pink;
  }

  .c-info--wrapper{
    flex: 0 0 auto;

    .c-info-table{
      text-align: left;
      font-weight: 800;
      font-size: 1.4rem;
    }
    .c-info-label{
      text-align: right;
      padding-right: 1.5rem;
      font-weight: 400;
      opacity: .75;
    }
  }
}
</style>
