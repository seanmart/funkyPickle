<template lang="html">
  <section class="c-event-list o-container o-space">

    <template v-if="data.primary.title">
      <h2 class="t-xxl t-bold-xl u-mb-xl" v-html="data.primary.title" />
    </template>

    <template v-for="event in events">

      <nuxt-link :to="`/events/${event.uid}`" class="c-event-list__event u-fc u-fr--lg u-mb-md u-shadow-y u-shadow--hover">

        <div class="c-event__date--wrapper u-fcc u-cover-container">
          <h3 class="c-date__text--wrapper t-header">
            <span class="c-date__text is-month" v-html="getMonth(event.data.start_date)"/>
            <span class="c-date__text is-day" v-html="getDay(event.data.start_date)"/>
          </h3>
          <div v-if="event.data.image.url" v-image:cover="event.data.image.url" class="c-date__bg u-cover"/>
        </div>

        <div class="c-event__logo--wrapper u-frc u-fcc--lg">
          <event-logo :image="event.data.logo.url" :start="event.data.start_date" :end="event.data.end_date"/>
        </div>

        <div class="c-event__info--wrapper u-fcc--lg u-fas--lg u-p-xl">
          <text-scroll class="c-info__title--wrapper t-header">
            <h3 class="c-info__title u-px-md" v-html="event.data.title"/>
          </text-scroll>
          <div class="c-info__location--wrapper u-fcc u-frc--lg u-fjs--lg u-pt-md">
            <div class="c-info__location t-sm--lg">
              <icon class="u-mr-xs t-svg-rg t-svg-sm--lg" wayfinder/>
              <span v-html="formatCityState(event.data.city,event.data.state)"/>
            </div>
            <mini-weather-widget class="c-info__weather u-mt-lg u-ml-lg--lg" :uid="event.uid"/>
          </div>
        </div>
      </nuxt-link>

    </template>

    <template v-if="data.primary.link.uid">
      <div class="c-event-list__btn--wrapper u-mt-xxl">
        <btn :to="data.primary.link.uid" value="View All Events" big rainbow/>
      </div>
    </template>

  </section>
</template>

<script>
import { getDay, getMonth } from "@/assets/js/helpers";
import {mapState} from 'vuex'
import query from '@/assets/js/eventListQuery'
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
    max-width: 100%;
    overflow: hidden;
    border-radius: 8px;
    outline: none;
    position: relative;
    background: white;
    z-index: 1;
    &:last-child{
      margin-bottom:0px;
    }
  }

  .c-event__date--wrapper{
    flex: 0 0 auto;
    @include dark-gradient;
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
    position: relative;
    z-index: 2;
  }

  .c-event__info--wrapper{
    flex: 1 1 auto;
    margin-top: 5rem;
  }
  .c-info__title--wrapper{
    font-size: 4rem;
    letter-spacing: -.05rem;
  }
  .c-info__title{
    transition-property: color;
    transition-duration: $event-list-dur;
  }

  .c-info__location{
    svg{fill:$pink}
  }

  .c-event-list__btn--wrapper{
    text-align: center;
  }

  @media(min-width: $screen-lg){

    .c-event-list__event{
      height: 13rem;
    }

    .c-event__date--wrapper{
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
    }

    .c-event__info--wrapper{
      margin-top: 0px;
      margin-left: 4rem;
      height: 100%;
    }

    .c-info__title--wrapper{
      font-size: 3rem;
      letter-spacing: -.03rem;
    }

    .c-info__weather{
      margin-top: 0px;
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
