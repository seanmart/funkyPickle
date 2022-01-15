export default {
  state: () => ({
    fetching: 0,
    loading: true,
    pageLoaded: false,
    reveal: false,
    columns: {
      show: false,
      complete: false,
    },
    nav: [],
    events: {},
    pages: {},
    fetchData: {},
  }),
  mutations: {
    fetching: (state, x) => (state.fetching = x),
    loading: (state, x) => (state.loading = x),
    pageLoaded: (state, x) => (state.pageLoaded = x),
    reveal: (state, x) => (state.reveal = x),
    columnsComplete: (state, x) => (state.columns.complete = x),
    columnsShow: (state, x) => (state.columns = { show: x, complete: false }),
    pages: (state, { page, data }) => (state.pages[page] = data),
    events: (state, { id, data }) => (state.events[id] = data),
    nav: (state, data) => (state.nav = data),
    fetchData: (state, { key, data }) => (state.fetchData[key] = data),
  },
  actions: {
    fetchingStarted({ commit, state }) {
      commit("fetching", state.fetching + 1);
    },
    fetchingComplete({ state, commit }) {
      commit("fetching", state.fetching - 1);
      if (!state.fetching && !state.loading) setTimeout(() => commit("pageLoaded", true), 1000);
    },
    loadingComplete({ state, commit }) {
      commit("loading", false);
      !state.fetching && commit("pageLoaded", true);
    },
    enteringPage({ commit }) {
      commit("columnsShow", false);
    },
    leavingPage({ commit }) {
      commit("columnsShow", true);
      commit("pageLoaded", false);
      commit("fetching", 0);
      commit("reveal", false);
    },
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
