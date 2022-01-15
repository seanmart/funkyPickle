export default {
  state: () => ({
    nav: [],
    events: {},
    pages: {},
    fetchData: {},
  }),
  mutations: {
    nav: (state, data) => (state.nav = data),
    pages: (state, { page, data }) => (state.pages[page] = data),
    events: (state, { id, data }) => (state.events[id] = data),
    fetchData: (state, { key, data }) => (state.fetchData[key] = data)
  },
  actions: {
    async settingsInit({ commit }) {
      let results = await this.$prismic.api.getSingle("settings");
      let links = [];

      if (results) {
        results.data.links.forEach(
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
    async weatherInit() {},
    async nuxtServerInit({ dispatch }) {
      await dispatch("settingsInit");
    },
  },
};
