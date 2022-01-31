<template lang="html">
  <section class="c-event-list o-container o-space">

    <template v-if="data.primary.title">
      <h2 class="t-xxl t-bold-xl u-marg-bottom-xl" v-html="data.primary.title" />
    </template>

    <template v-for="event in events">

      <nuxt-link :to="`/event/${event.uid}`" class="c-event-list__event u-marg-bottom-md u-shadow-y u-shadow--hover">

        <div class="c-event__date--wrapper u-cover-container">
          <h3 class="c-date__text--wrapper t-header">
            <span class="c-date__text is-month" v-html="getMonth(event.data.start_date)"/>
            <span class="c-date__text is-day" v-html="getDay(event.data.start_date)"/>
          </h3>
          <div v-if="event.data.image.url" v-image:cover="event.data.image.url" class="c-date__bg u-cover"/>
        </div>

        <div class="c-event__logo--wrapper">
          <event-logo :image="event.data.logo.url" :start="event.data.start_date" :end="event.data.end_date"/>
        </div>

        <div class="c-event__info--wrapper">
          <div class="c-info--wrapper u-pad-xl u-pad-lg--md">
            <text-scroll class="c-info__title--wrapper t-header">
              <h3 class="c-info__title u-pad-x-md" v-html="event.data.title"/>
            </text-scroll>
            <div class="c-info__location--wrapper u-pad-top-xl u-pad-top-md--md">
              <icon class="c-info__icon u-marg-right-xs" wayfinder/>
              <span class="c-info__location" v-html="formatCityState(event.data.city,event.data.state)"/>
              <mini-weather-widget class="c-info__weather u-marg-left-lg" :uid="event.uid"/>
            </div>
          </div>
        </div>
      </nuxt-link>

    </template>

    <template v-if="data.primary.link.uid">
      <div class="c-event-list__btn--wrapper u-marg-top-xxl">
        <btn :to="data.primary.link.uid" value="View All Events" big rainbow/>
      </div>
    </template>

  </section>
</template>

<script>
import { getDay, getMonth } from "~/@js/helpers";
import {mapState} from 'vuex'
import query from '~/@js/eventListQuery'
export default {
  props: ["data"],
  async fetch(){
    if (this.$store.state.lists.events.length == 0){
    let data = await query(this.$prismic)
    this.$store.commit('LIST',{key:'events',data: data.results})
    setTimeout(()=>this.$bus.$emit('REFRESH'),250)
    }
  },
  data: () => ({
    getDay,
    getMonth
  }),
  computed: {
    ...mapState({
      eventsData: state => state.lists.events
    }),
    events() {
      if (this.eventsData.length == 0) return []
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

  $event-list-dur:.75s;

  .c-event-list__event{
    display: flex;
    flex-direction: column;
    max-width: 100%;
    overflow: hidden;
    border-radius: 8px;
    outline: none;
    position: relative;
    z-index: 1;
    &:last-child{
      margin-bottom:0px;
    }
  }

  .c-event__date--wrapper{
    flex: 0 0 auto;
    @include dark-gradient;
    display: flex;
    justify-content: center;
    align-items: center;
    height: 25rem;
    padding-bottom: 5rem;
    overflow: hidden;
  }
  .c-date__text--wrapper{
    position: relative;
    z-index: 1;
    color: white;
    font-size: 5rem;
  }
  .c-date__bg{
    opacity: .5;
    z-index: 0;
    transform: scale(1.1);
    transition-property: transform,opacity;
    transition-duration: $event-list-dur;
  }

  .c-event__logo--wrapper{
    flex: 0 0 auto;
    height: 0px;
    display: flex;
    justify-content: center;
    align-items: center;
    position: relative;
    z-index: 2;
  }

  .c-event__info--wrapper{
    background: white;
    flex: 1 1 auto;
  }
  .c-info__title--wrapper{
    font-size: 4rem;
    letter-spacing: -.05rem;
  }
  .c-info__title{
    transition-property: color;
    transition-duration: $event-list-dur;
  }

  .c-info__location--wrapper{
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
  }

  .c-info__icon{
    height:1.3rem;
    fill:$pink;
  }

  .c-event-list__btn--wrapper{
    text-align: center;
  }

  @media(max-width: $screen-lg - 1px){
    .c-event__info--wrapper{
      padding-top: 5rem;
    }
  }

  @media(min-width: $screen-lg){

    .c-event-list__event{
      flex-direction: row;
      height: 13rem;
    }

    .c-event__date--wrapper{
      flex-direction: column;
      height: auto;
      width: 15rem;
      padding-bottom:0px;
      padding-right: 4rem;
      text-align: center;
    }

    .c-date__text{
      display: block;
      &.is-month{
        font-size: 2.25rem;
      }
      &.is-day{
        font-size: 7rem;
      }
    }

    .c-event__logo--wrapper{
      height: 100%;
      width:0px;
      flex-direction: column;
    }

    .c-event__info--wrapper{
      padding-left: 4rem;
    }

    .c-info--wrapper{
      height: 100%;
      display: flex;
      flex-direction: column;
      justify-content: center;
    }

    .c-info__location--wrapper{
      justify-content: flex-start;
    }

    .c-info__title--wrapper{
      font-size: 3rem;
      letter-spacing: -.03rem;
    }

    .c-event-list__btn--wrapper{
      text-align: left;
    }

  }
}

.is-desktop .c-event-list .c-event-list__event:hover,
.is-desktop .c-event-list .c-event-list__event:focus,
.c-event-list .c-event-list__event:active{

  .c-info__title{
    color: $purple;
  }
  .c-date__bg{
    transform: scale(1.01);
    opacity: .35
  }
  .c-logo{
    transform: scale(1.1)
  }
}
</style>
