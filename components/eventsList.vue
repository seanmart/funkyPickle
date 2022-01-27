<template lang="html">
  <section class="c-event-list o-container o-space">

    <template v-if="data.primary.title">
      <h2 class="t-headline" v-html="data.primary.title" ref="title" />
    </template>

    <template v-for="event in events">

      <nuxt-link :to="`/events/${event.uid}`" class="c-event">

        <div class="c-date--wrapper">
          <h3 class="c-date t-header">
            <span class="c-date-item month" v-html="getMonth(event.data.start_date)"/>
            <span class="c-date-item day" v-html="getDay(event.data.start_date)"/>
          </h3>
          <div v-if="event.data.image.url" v-image:cover="event.data.image.url" class="c-image"/>
        </div>

        <div class="c-logo--wrapper">
          <div class="c-logo" v-image:cover="event.data.logo.url"/>
        </div>

        <div class="c-info--wrapper">
          <text-scroll class="c-event-title--wrapper t-header">
            <h3 class="c-event-title" v-html="event.data.title"/>
          </text-scroll>
          <div class="c-location--wrapper">
            <icon class="c-icon" wayfinder/>
            <span class="c-location" v-html="formatCityState(event.data.city,event.data.state)"/>
            <template v-if="weather[event.uid]">
              <div class="c-weather">
                <weather-icon :icon="weather[event.uid].weather[0].icon"/>
                <span v-html="`${weather[event.uid].weather[0].main}, ${getTemp(weather[event.uid].main.temp)}`"/>
              </div>
            </template>
          </div>
        </div>

        <div class="c-arrow--wrapper">
          <icon class="c-arrow" arrow/>
          <div class="c-rainbow"/>
        </div>

      </nuxt-link>
    </template>

    <div class="u-space-top c-event-btn" v-if="data.primary.link.uid" ref="btn">
      <btn :to="`/${data.primary.link.uid}`" big rainbow>view all events</btn>
    </div>

  </section>
</template>

<script>
import { getDay, getMonth, getTemp } from "@/assets/js/helpers";
import {mapState} from 'vuex'
import eventsList from '@/graphQueries/eventsList'
export default {
  props: ["data"],
  async fetch(){
    if (this.$store.state.meta.events.length == 0){
    let data = await eventsList(this.$prismic)
    this.$store.commit('meta',{key:'events',data: data.results})
    }
  },
  data: () => ({
    getDay,
    getMonth,
    getTemp
  }),
  computed: {
    ...mapState({
      eventsData: state => state.meta.events,
      weather: state => state.meta.weather
    }),
    events() {
      return this.data.primary.limit ? this.eventsData.slice(0, this.data.primary.limit) : this.eventsData;
    },
  },
  methods: {
    formatCityState(city, state) {
      return city && state ? `${city}, ${state}` : city || state || "No Location Announced";
    },
  },
};
</script>

<style lang="scss">
.c-event-list{

  $events-list-dur: .75s;

  .c-event{
    display: flex;
    flex-direction: column;
    box-shadow: 0px 2px 5px rgba($blue,.2);
    background: white;
    margin-bottom: 5vw;
    outline: none;
    color: $black;
    overflow: hidden;
    border-radius: 8px;
    position: relative;
    z-index: 1;
  }

  .c-date--wrapper{
    flex: 0 0 auto;
    position: relative;
    z-index: 1;
    padding: 20vw 0px 30vw;
    @include dark-gradient;
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    color: white;
    overflow: hidden;
  }

  .c-date{
    font-size: 10vw;
  }

  .c-date-item{
    position: relative;
    z-index: 1;
  }

  .c-image{
    @include cover;
    z-index: 0;
    opacity: .5;
    transition-property: transform, opacity;
    transition-duration: $events-list-dur;
    transform: scale(1.1);
  }

  .c-logo--wrapper{
    flex: 0 0 auto;
    display: flex;
    justify-content: center;
    align-items: center;
    height: 0px;
    position: relative;
    z-index: 1;
  }

  .c-logo{
    flex: 0 0 auto;
    width: 20vw;
    height: 20vw;
    border-radius: 50%;
    box-shadow: 0px 2px 5px rgba($blue,.2);
    transition-property: transform;
    transition-duration: $events-list-dur;
    transform: scale(1.01);
  }

  .c-info--wrapper{
    flex: 0 0 auto;
    padding: 20vw 5vw 10vw;
  }

  .c-event-title--wrapper{
    height: 10vw;
    width: 100%;
  }

  .c-event-title{
    font-size: 10vw;
    padding: 0px 3vw;
    transition-property: color;
    transition-duration: $events-list-dur;
  }

  .c-location--wrapper{
    flex: 0 0 auto;
    margin-top: 2vw;
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
  }

  .c-icon{
    fill: $pink;
    height: 14px;
    flex: 0 0 auto;
    margin-right: 10px;
    font-size: 0;
    line-height: 0;
  }

  .c-location{
    flex: 0 0 auto;
  }

  .c-weather{
    flex: 0 0 auto;
    padding: 0px 12px;
    height: 22px;
    margin-left: 40px;
    border-radius: 7px;;
    background: lighten($black,70%);
    display: inline-flex;
    flex-direction: row;
    align-items: center;
    color: white;
    fill: white;
    font-size: 12px;
    line-height: .25;
    svg{
      height: 12px;
      margin-right: 5px;
    }
  }

  .c-arrow--wrapper{
    display: none;
  }

  .c-event-btn{
    text-align: center;
    position: relative;
    z-index: 1;
  }

  @media screen and (min-width: $medium){

    .c-event{
      margin-bottom: 1.5rem;
    }

    .c-date--wrapper{
      padding: 5rem 0px 8rem;
    }

    .c-date{
      font-size: 2.5rem;
    }

    .c-logo{
      width: 6rem;
      height: 6rem;
    }

    .c-info--wrapper{
      padding: 5rem 1rem 2rem;
    }

    .c-event-title--wrapper{
      height: 2.5rem;
    }

    .c-event-title{
      font-size: 2.5rem;
      padding: 0px 1rem;
    }

    .c-location--wrapper{
      margin-top: 1rem;
    }

    .c-icon{
      height: 16px;
      margin-right: 12px;
    }

    .c-event-btn{
      text-align: left;
    }
  }

  @media screen and (min-width: $huge){

    .c-event{
      flex-direction: row;
      align-items: stretch;
      height: 9rem;
      margin-bottom: 1rem;
    }

    .c-date--wrapper{
      padding: 0px;
      padding-right: 2.5rem;
      width: 11rem;
      text-align: center;
    }

    .c-date{
      font-size: 1.75rem;
    }

    .c-date-item{
      display: block;
      &.day{
        font-size: 4.5rem;
      }
    }

    .c-logo--wrapper{
      position: relative;
      height: 100%;
      width:2px;
      flex-direction: column;
    }

    .c-logo{
      width: 5rem;
      height: 5rem;
    }

    .c-info--wrapper{
      flex: 1 1 auto;
      padding: 0px;
      padding-left: 4.5rem;
      padding-right: 1rem;
      display: flex;
      flex-direction: column;
      justify-content: center;
    }

    .c-event-title--wrapper{
      height: 2rem;
    }

    .c-event-title{
      font-size: 2rem;
      padding: 0px .75rem;
    }

    .c-location--wrapper{
      justify-content: flex-start;
      margin-top: .5rem;
    }

    .c-arrow--wrapper{
      flex: 0 0 auto;
      padding: .5rem;
      @include dark-gradient;
      display: flex;
      justify-content: center;
      align-items: center;
      position: relative;
    }

    .c-arrow{
      fill: white;
      width: 1rem;
      position: relative;
      z-index: 1;
    }

    .c-rainbow{
      @include cover;
      @include rainbow-gradient(0);
      z-index: 0;
      opacity: 0;
      transition-property: opacity;
      transition-duration: $events-list-dur;
    }

  }
}

.is-desktop .c-event-list .c-event:hover,
.is-desktop .c-event-list .c-event:focus,
.c-event-list .c-event:active{
  .c-rainbow{
    opacity: 1;
  }
  .c-event-title{
    color: $purple;
  }
  .c-image{
    transform: scale(1.01);
    opacity: .35
  }
  .c-logo{
    transform: scale(1.1)
  }
}
</style>
