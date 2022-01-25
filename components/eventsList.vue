<template lang="html">
  <section class="c-event-list o-container o-space">

    <template v-if="data.primary.title">
      <h2 class="t-headline" v-html="data.primary.title" ref="title" />
    </template>

    <template v-for="event in eventList">

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
import { getDay, getMonth } from "@/assets/js/helpers";
import { mapState } from "vuex";
export default {
  props: ["data"],
  data: () => ({
    getDay,
    getMonth,
  }),
  mounted() {
    this.$bus.$once("REVEAL", this.handleReveal);
    this.handleMounted();
  },
  computed: {
    ...mapState(["eventsList"]),
    eventList() {
      return this.data.primary.limit ? this.eventsList.slice(0, this.data.primary.limit) : this.eventsList;
    },
  },
  methods: {
    handleMounted() {},
    handleReveal() {},
    formatCityState(city, state) {
      return city && state ? `${city}, ${state}` : city || state || "No Location Announced";
    },
  },
};
</script>

<style lang="scss">
.c-event-list{

  .c-event{
    display: flex;
    flex-direction: column;
    box-shadow: 0px 2px 5px rgba($blue,.2);
    background: white;
    margin-bottom: 5vw;
    outline: none;
    color: $black;
  }

  .c-date--wrapper{
    flex: 0 0 auto;
    position: relative;
    padding: 10vw 0px 20vw;
    @include dark-gradient;
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    color: white;
    overflow: hidden;
  }

  .c-date{
    position: relative;
    z-index: 1;
    font-size: 10vw;
  }

  .c-image{
    @include cover;
    z-index: 0;
    opacity: .5;
    transition-property: transform, opacity;
    transition-duration: .5s;
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
    transition-duration: .5s;
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
    transition-duration: .25s;
  }

  .c-location--wrapper{
    flex: 0 0 auto;
    margin-top: 2vw;
    text-align: center;
  }

  .c-icon{
    fill: $pink;
    height: 3vw;
    margin-right: 1vw;
    font-size: 0;
    line-height: 0;
  }

  .c-arrow--wrapper{
    display: none;
  }

  .c-event-btn{
    text-align: center;
  }

  @media screen and (min-width: $medium){

    .c-event{
      margin-bottom: 1.5rem;
    }

    .c-date--wrapper{
      padding: 2rem 0px 5rem;
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
      height: 1rem;
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
      text-align: left;
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
      transition-duration: .25s;
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
