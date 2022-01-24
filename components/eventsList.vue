<template lang="html">
  <section class="c-events-list o-container o-space">

    <template v-if="data.primary.title">
      <h2 class="t-headline" v-html="data.primary.title" ref="title" />
    </template>

    <div class="c-list">
      <template v-for="(event, i) in eventList">

          <nuxt-link :to="`/events/${event.uid}`" class="c-event">

            <div class="c-date--wrapper">
              <h3 class="c-month t-header" v-html="getMonth(event.data.start_date, 'short')" />
              <h3 class="c-day t-header" v-html="getDay(event.data.start_date)" />
              <div class="c-rainbow" />
            </div>

            <div class="c-logo--wrapper">
              <div class="c-logo">
                <div class="c-image" v-image:cover="event.data.logo.url" />
              </div>
            </div>

            <div class="c-info--wrapper">
              <text-scroll class="c-event-title--wrapper">
                <h3 class="c-event-title t-header" v-html="event.data.title" />
              </text-scroll>
              <div class="c-location">
                <icon wayfinder />
                <span v-html="formatCityState(event.data.city, event.data.state)" />
              </div>
            </div>

            <div class="c-arrow--wrapper">
              <div class="c-arrow-bg">
                <div class="c-rainbow">
                  <icon arrow />
                </div>
              </div>
            </div>
          </nuxt-link>

      </template>
    </div>

    <div class="u-space-top c-event-btn" v-if="data.primary.link.uid" ref="btn">
      <btn :to="`/${data.primary.link.uid}`" rainbow>view all events</btn>
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

$s-events-list-padding: 5vw;
$m-events-list-padding: 1rem;
$events-transition-timing: .35s;

.c-events-list {

  .c-rainbow{
    @include cover;
    @include rainbow-gradient(0);
    opacity: 0;
    transition: opacity $events-transition-timing;
  }

  .c-event{
    display: flex;
    flex-direction: row;
    background: white;
    overflow: hidden;
    box-shadow: 0px 2px 5px rgba($blue,.2);
    margin-bottom: 2vw;
    outline: none;
  }

  .c-date--wrapper{
    flex: 0 0 auto;
    width: 15vw;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    position: relative;
    padding: $s-events-list-padding 0px;
    @include dark-gradient;
    color: white;
  }

  .c-month{
    font-size: 6vw;
    line-height: 1.1;
    position: relative;
    z-index: 1;
  }
  .c-day{
    font-size: 8vw;
    position: relative;
    z-index: 1;
  }

  .c-logo--wrapper{
    display: none;
  }

  .c-logo{
    flex: 0 0 auto;
    width: 100%;
    position: relative;
  }

  .c-image{
    width: 100%;
    padding-bottom: 100%;
    border-radius: 50%;
    overflow: hidden;
    box-shadow: 0px 2px 5px rgba($blue,.2);
    background-position: center center;
  }

  .c-info--wrapper{
    flex: 1 1 auto;
    display: flex;
    flex-direction: column;
    justify-content: center;
    padding: $s-events-list-padding 2.5vw;
  }

  .c-event-title--wrapper{
    flex: 0 0 auto;
    height: 6vw;
    margin-bottom: 1.5vw;
  }

  .c-event-title{
    font-size: 7vw;
    padding: 0px 2vw;
    transition: color $events-transition-timing;
  }

  .c-location{
    flex: 0 0 auto;
    line-height: 1;
    font-size: 3.5vw;
    svg{
      height: 2.5vw;
      fill: $pink;
    }
  }

  .c-arrow--wrapper{
    flex: 0 0 auto;
    width: 5vw;
    position: relative;

    .c-rainbow{
      opacity: 1;
    }
  }

  .c-arrow-bg{
    @include dark-gradient;
    @include cover;

    .c-rainbow{
      display: flex;
      justify-content: center;
      align-items: center;
    }
    svg{
      fill: white;
      width: 60%;
    }
  }

  .c-event-btn{
    text-align: center;
  }

  @media screen and (min-width: $medium){

    .c-event{
      margin-bottom: .75rem;
    }

    .c-date--wrapper{
      width: 7rem;
      padding: $m-events-list-padding;
    }

    .c-month{
      font-size: 2rem;
    }
    .c-day{
      font-size: 3rem;
    }

    .c-logo--wrapper{
      display: flex;
      flex: 0 0 auto;
      width: 7rem;
      padding: $m-events-list-padding 0px;
      padding-left: 2vw;
    }

    .c-info--wrapper{
      padding: $m-events-list-padding 2vw;
    }

    .c-event-title--wrapper{
      height: 3rem;
      margin-bottom: .5vw;
    }

    .c-event-title{
      font-size: 2.5rem;
      padding: 0px 1rem;
    }

    .c-location{
      flex: 0 0 auto;
      opacity: .5;
      transition: opacity $events-transition-timing;
      svg{
        height: .6rem;
        fill: $black;
        transition: fill $events-transition-timing;
      }
    }

    .c-arrow--wrapper{
      width: 2rem;

      .c-rainbow{
        opacity: 0;
      }

    }

    .c-arrow-bg{
      transform: translateX(.5rem);
      transition: transform $events-transition-timing;
    }

    .c-event-btn{
      text-align: left;
    }

  }

}

.c-events-list .c-event:active,
.is-desktop .c-events-list .c-event:focus,
.is-desktop .c-events-list .c-event:hover{

  .c-rainbow{
    opacity: 1;
  }

  .c-event-title{
    color: $purple;
  }

  .c-location{
    opacity: 1;
    svg{
      fill: $pink;
    }
  }

  .c-arrow-bg{
    transform: translateX(0);
  }
}

</style>
