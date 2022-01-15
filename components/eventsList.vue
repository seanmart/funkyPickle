<template lang="html">
  <section class="c-events-list o-container o-top o-bottom">
    <div class="c-header--wrapper u-gap-bottom-rg" v-if="data.primary.title">
      <h2 class="t-headline-rg" v-html="data.primary.title" ref="title" />
    </div>

    <div class="c-list" v-if="eventList.length > 0">
      <template v-for="(event, i) in eventList">
        <div class="c-event" ref="events">
          <nuxt-link :to="`/events/${event.uid}`" class="c-event--wrapper">
            <div class="c-date--wrapper">
              <h3 class="c-date c-month t-header" v-html="getMonth(event.data.start_date, 'short')" />
              <h3 class="c-date c-day t-header" v-html="getDay(event.data.start_date)" />
              <div class="c-rainbow" />
            </div>
            <div class="c-logo--wrapper">
              <div class="c-logo" v-image:cover="event.data.logo.url" />
            </div>
            <div class="c-info--wrapper">
              <text-scroll class="c-title--wrapper">
                <h3 class="c-title t-header" v-html="event.data.title" />
              </text-scroll>
              <span class="c-location"><icon wayfinder />{{ `${event.data.city}, ${event.data.state}` }}</span>
            </div>
            <div class="c-arrow--wrapper">
              <div class="c-bg">
                <div class="c-rainbow">
                  <icon arrow />
                </div>
              </div>
            </div>
          </nuxt-link>
        </div>
      </template>
    </div>
    <div v-else class="c-no-list">No events found</div>

    <div class="u-gap-top-rg c-event-btn" v-if="data.primary.link.uid" ref="btn">
      <btn :to="`/${data.primary.link.uid}`" rainbow arrow>view all events</btn>
    </div>
  </section>
</template>

<script>
import { getDate, getDay, getMonth } from "@/assets/js/helpers";
export default {
  props: ["data"],
  fetchKey: "event-list",
  async fetch() {

    let data = this.$store.state.fetchData.events;

    if (!data) {
      let date = getDate(-1);
      let results = await this.$prismic.api.query([this.$prismic.predicates.at("document.type", "event"), this.$prismic.predicates.date.after("my.event.end_date", date)], {
        graphQuery: `{
        event
        {
        title
        state
        city
        logo
        uid
        start_date
        }
        }`,
        orderings: "[my.event.start_date]",
      });
      if (results) {
        data = results.results;
        this.$store.commit("fetchData", { key: "events", data });
      }
    }

    this.events = data || [];
  },
  data: () => ({
    events: [],
    getDay,
    getMonth,
  }),
  created(){
    this.$bus.$emit('LOADING',true)
  },
  watch:{
    events(){
      this.$bus.$emit('LOADING',false)
    }
  },
  computed: {
    eventList() {
      return this.data.primary.limit ? this.events.slice(0, this.data.primary.limit) : this.events;
    },
  },
};
</script>
<style lang="scss">
.c-events-list {
  $event-list-space: 2.5rem;
  $event-list-duration: 0.25s;

  .c-header--wrapper {
    overflow: hidden;
  }

  .c-event {
    margin-bottom: $event-list-space / 2;
    box-shadow: 0px 2px 5px rgba($blue, 0.2);
    background: white;
    border-radius: 8px;
    overflow: hidden;
    transition-property: box-shadow;
    transition-duration: $event-list-duration;
    cursor: pointer;
    &:last-child {
      margin-bottom: 0px;
    }
  }

  .c-event--wrapper {
    height: 100%;
    display: flex;
    flex-direction: row;
    align-items: stretch;
  }

  .c-rainbow {
    opacity: 0;
    transition-duration: $event-list-duration;
    transition-property: opacity;
    animation: animate-gradient-vertical 5s infinite;
    animation-play-state: paused;
    @include cover;
    @include rainbow-gradient(0);
    background-size: 100% 200%;
  }

  .c-date--wrapper {
    flex: 0 0 auto;
    padding: $event-list-space 0px;
    position: relative;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    min-width: 10rem;
    @include dark-gradient;
  }
  .c-date {
    flex: 0 0 auto;
    color: white;
    position: relative;
    z-index: 1;
    &.c-month {
      font-size: 4.5rem;
    }
    &.c-day {
      font-size: 5.5rem;
    }
  }

  .c-logo--wrapper {
    flex: 0 0 auto;
    display: flex;
    justify-content: center;
    align-items: center;
    padding: $event-list-space;
    padding-right: 0px;
    min-width: 10rem;
  }
  .c-logo {
    flex: 0 0 auto;
    height: 8rem;
    width: 8rem;
    border-radius: 50%;
    overflow: hidden;
    box-shadow: 0px 2px 5px rgba($blue, 0.2);
    transition-duration: $event-list-duration;
    transition-property: box-shadow;
  }

  .c-info--wrapper {
    flex: 1 1 auto;
    display: flex;
    flex-direction: column;
    padding: $event-list-space;
  }
  .c-title--wrapper {
    flex: 1 1 auto;
  }
  .c-title {
    font-size: 4rem;
    padding: 0px 2rem;
    transition-duration: $event-list-duration;
    transition-property: color;
  }
  .c-location {
    flex: 0 0 auto;
    display: block;
    opacity: 0.5;
    transition-duration: $event-list-duration;
    transition-property: opacity;
    svg {
      height: 1.2rem;
      margin-right: 1rem;
      transition-duration: $event-list-duration;
      transition-property: fill;
    }
  }

  .c-arrow--wrapper {
    flex: 0 0 auto;
    width: $event-list-space * 2;
    position: relative;
    overflow: hidden;
  }
  .c-bg {
    @include cover;
    @include dark-gradient;
    transform: translateX(50%);
    transition-duration: $event-list-duration;
    transition-property: transform;
    .c-rainbow {
      display: flex;
      justify-content: center;
      align-items: center;
      fill: white;
    }
    svg {
      flex: 0 0 40%;
      transition-duration: $event-list-duration;
      transition-property: opacity;
    }
  }

  @media screen and (max-width: $mobile) {
    .c-event-btn {
      text-align: center;
    }

    .c-date--wrapper .c-rainbow {
      display: none;
    }
    .c-logo--wrapper {
      display: none;
    }
    .c-arrow--wrapper {
      width: $event-list-space * 1.5;
    }
    .c-info--wrapper .c-location {
      display: none;
    }
    .c-bg {
      transition: none;
      transform: none;
      .c-rainbow {
        opacity: 1;
      }
    }
  }
}

.c-events-list .c-event--wrapper:hover,
.c-events-list .c-event--wrapper:active,
.is-desktop .c-events-list .c-event--wrapper:focus {
  outline: none;
  box-shadow: 0px 5px 8px rgba($blue, 0.3);

  .c-rainbow {
    opacity: 1;
    animation-play-state: running;
  }
  .c-logo {
    box-shadow: 0px 5px 8px rgba($blue, 0.3);
  }
  .c-bg {
    transform: translateX(0px);
  }
  .c-location {
    opacity: 1;
    svg {
      fill: $pink;
    }
  }
  .c-title {
    color: $purple;
  }
}
</style>
