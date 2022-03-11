<template lang="html">
  <container class="event-list" ref="container">

    <app-title v-if="this.data.primary.title" :value="this.data.primary.title" class="mb-space"/>

    <template v-for="event in events">
      <nuxt-link :to="`/event/${event.uid}`" class="event-list__event bg-white overflow-hidden mb-10px rounded-lg flex flex-col items-stretch lg:flex-row lg:h-120 shadow-bottom">
        <div class="relative h-250 flex-grow-0 flex-shrink-0 flex flex-col justify-center text-center text-white overflow-hidden pb-40 bg-black lg:pb-0 lg:pr-40 lg:h-auto lg:w-150">
          <h3 class="relative z-10 font-header font-bold leading-09 uppercase text-50 lg:text-20">
            <span class="lg:block" v-html="getMonth(event.data.start_date)" />
            <span class="lg:block lg:text-60" v-html="getDay(event.data.start_date)" />
          </h3>
          <div
            v-if="event.data.image.url"
            class="event-list__image absolute inset-0 z-0 bg-cover bg-center opacity-40 image"
            :style="{ backgroundImage: `url(${event.data.image.url})` }"
          />
        </div>

        <div class="reative z-10 flex-grow-0 flex-shrink-0 h-0 flex flex-row justify-center items-center lg:flex-col lg:h-full lg:w-0">
          <div class="relative h-80 w-80 rounded-full bg-lime shadow-bottom overflow-hidden">
            <div
              v-if="event.data.ball_image.url || event.data.logo.url"
              class="absolute inset-0 bg-cover bg-center image"
              :style="{ backgroundImage: `url(${event.data.ball_image.url || event.data.logo.url})` }"
            />
          </div>
        </div>

        <div class="flex-auto mt-40 p-25 flex flex-col justify-center lg:mt-0 lg:ml-40 lg:p-20">
          <text-scroll>
            <h3 class="event-list__title px-10 font-header uppercase font-bold text-35 lg:text-25 leading-none" v-html="event.data.title" />
          </text-scroll>
          <div class="flex flex-row items-center justify-center mt-20 md:mt-10 lg:justify-start" v-if="event.data.city || event.data.state">
            <icon class="mr-05 h-10 fill-pink" wayfinder/>
            <span class="font-semibold text-12 md:text-10" v-html="formatCityState(event.data.city, event.data.state)" />
            <app-weather class="ml-10" :uid="event.uid"/>
          </div>
        </div>
      </nuxt-link>
    </template>
    <div v-if="this.data.primary.limit" class="mt-40 text-center lg:text-left">
      <btn bg="pink" hoverBg="black" activeBg="black" value="View All Events" to="/events" />
    </div>
  </container>
</template>

<script>
import { getDay, getMonth } from "@/assets/helpers";
import { mapState } from "vuex";
import query from "@/assets/eventListQuery";
export default {
  props:['data'],
  computed: {
    ...mapState({
      eventsData: (state) => state.lists.events,
      weather: state => state.weather
    }),
    events() {
      if (this.eventsData.length == 0) return [];
      if (this.data.primary.limit) return this.eventsData.slice(0, this.limit);
      return this.eventsData;
    },
  },
  methods: {
    getDay,
    getMonth,
    formatCityState(city, state) {
      return city && state ? `${city}, ${state}` : city || state
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
