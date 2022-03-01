<template lang="html">
  <container class="event-list" ref="container">

    <section-title v-if="theTitle" :value="theTitle"/>

    <template v-for="event in events">
      <nuxt-link :to="`/events/${event.uid}`" class="event-list__event bg-white overflow-hidden mb-10px rounded-lg flex flex-col items-stretch lg:flex-row lg:h-120 shadow-bottom">
        <div class="relative h-250 flex-grow-0 flex-shrink-0 flex flex-col justify-center text-center text-white overflow-hidden pb-40 bg-black lg:pb-0 lg:pr-40 lg:h-auto lg:w-150">
          <h3 class="relative z-10 font-header font-bold leading-09 uppercase text-50 lg:text-20">
            <span class="lg:block" v-html="getMonth(event.data.start_date)" />
            <span class="lg:block lg:text-60" v-html="getDay(event.data.start_date)" />
          </h3>
          <div v-if="event.data.image.url" class="event-list__image absolute inset-0 z-0 bg-cover bg-center opacity-40" :style="{ backgroundImage: `url(${event.data.image.url})` }" />
        </div>

        <div class="reative z-10 flex-grow-0 flex-shrink-0 h-0 flex flex-row justify-center items-center lg:flex-col lg:h-full lg:w-0">
          <div class="relative h-80 w-80 rounded-full bg-lime shadow-bottom overflow-hidden">
            <div v-if="event.data.ball_image.url || event.data.logo.url" class="absolute inset-0 bg-cover bg-center" :style="{ backgroundImage: `url(${event.data.ball_image.url || event.data.logo.url})` }" />
          </div>
        </div>

        <div class="flex-auto mt-40 p-25 flex flex-col justify-center lg:mt-0 lg:ml-40 lg:p-20">
          <text-scroll>
            <h3 class="event-list__title px-10 font-header uppercase font-bold text-35 lg:text-25 leading-none" v-html="event.data.title" />
          </text-scroll>
          <div class="flex flex-row items-center justify-center mt-05 lg:justify-start">
            <icon class="mr-05 h-10 fill-pink" wayfinder />
            <span class="text-14 lg:text-10 font-medium" v-html="formatCityState(event.data.city, event.data.state)" />
            <span class="ml-10 inline-block py-05 px-10 rounded-md bg-gray">
              weather
            </span>
          </div>
        </div>
      </nuxt-link>
    </template>
    <div v-if="link" class="mt-40 text-center md:text-left">
      <btn pink value="View All Events" to="/events" />
    </div>
  </container>
</template>

<script>
import { getDay, getMonth } from "@/assets/helpers";
import { mapState } from "vuex";
import query from "@/assets/eventListQuery";
export default {
  props: {
    data: { type: Object, default: null },
    link: { type: Boolean, default: true },
    title: { type: String, default: null },
  },
  fetchKey: "event-list",
  async fetch() {
    if (this.$store.state.lists.events.length == 0) {
      let data = await query(this.$prismic);
      this.$store.commit("LIST", ["events", data.results]);
    }
  },
  computed: {
    ...mapState({
      eventsData: (state) => state.lists.events,
      weather: state => state.weather
    }),
    theTitle() {
      if (this.data) return this.data.primary.title;
      if (this.title) return this.title;
      return null;
    },
    events() {
      if (this.eventsData.length == 0) return [];
      if (this.data && this.data.primary.limit) return this.eventsData.slice(0, this.data.primary.limit);
      return this.eventsData;
    },
  },
  methods: {
    getDay,
    getMonth,
    formatCityState(city, state) {
      return city && state ? `${city}, ${state}` : city || state || "No Location Announced";
    },
  },
};
</script>

<style lang="css">
.event-list__event .event-list__image {
  transition: transform 0.35s;
  transform: scale(1.1);
}
.event-list__event .event-list__title {
  transition: color 0.35s;
}

.event-list__event:hover .event-list__title {
  color: theme("colors.pink");
}
.event-list__event:hover .event-list__image {
  transform: scale(1.01);
}
</style>
