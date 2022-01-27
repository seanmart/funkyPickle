import weather from "@/data/weather.json";

export default {
  state: () => ({
    nav: [],
    events: {},
    articles:{},
    pages: {},
    meta:{
      weather:{},
      events:[],
      articles:[]
    }
  }),
  mutations: {
    nav: (state, data) => (state.nav = data),
    pages: (state, { page, data }) => (state.pages[page] = data),
    events: (state, { id, data }) => (state.events[id] = data),
    articles: (state, { id, data }) => (state.articles[id] = data),
    meta: (state, {key,data}) => (state.meta[key] = data)
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
    async nuxtServerInit({ dispatch, commit }) {
      await dispatch("getSettings");
      commit("meta", {key:'weather', data: weather});
    },
  },
};
