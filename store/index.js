import { getDateOffset } from "@/assets/js/helpers";
import eventsWeather from "@/data/weather.json";

export default {
  state: () => ({
    nav: [],
    events: {},
    eventsList: [],
    eventsWeather: {},
    pages: {},
    data: {},
  }),
  mutations: {
    nav: (state, data) => (state.nav = data),
    pages: (state, { page, data }) => (state.pages[page] = data),
    events: (state, { id, data }) => (state.events[id] = data),
    eventsList: (state, data) => (state.eventsList = data),
    eventsWeather: (state, data) => (state.eventsWeather = data),
  },
  actions: {
    async getSettings({ commit }) {
      let links = [];
      let res = await this.$prismic.api.getSingle("settings");

      if (res) {
        res.data.links.forEach(
          (item) =>
            item.page.uid &&
            links.push({
              to: `/${item.page.uid}`,
              label: item.label,
            })
        );
        commit("nav", links);
      }
    },
    async getEventsListData({ commit }) {
      let date = getDateOffset(-1);
      let res = await this.$prismic.api.query([this.$prismic.predicates.at("document.type", "event"), this.$prismic.predicates.date.after("my.event.end_date", date)], {
        graphQuery: `{
        event
        {
        title
        state
        city
        logo
        uid
        start_date
        image
        }
        }`,
        orderings: "[my.event.start_date]",
      });

      res && commit("eventsList", res.results);
    },
    async nuxtServerInit({ dispatch, commit }) {
      await dispatch("getSettings");
      await dispatch("getEventsListData");
      commit("eventsWeather", eventsWeather);
    },
  },
};
