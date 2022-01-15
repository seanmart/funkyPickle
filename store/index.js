export default {
  state: () => ({
    fetching: 0,
    loading: false,
    pageLoaded: false,
    reveal: false,
    columns: {
      show: false,
      complete: false,
    },
    nav: [],
    event: {},
    events: null,
    page: {},
  }),
  mutations: {
    fetching: (state, x) => (state.fetching = x),
    loading: (state, x) => (state.loading = x),
    pageLoaded: (state, x) => (state.pageLoaded = x),
    reveal: (state, x) => (state.reveal = x),
    page: (state, { page, data }) => (state.page[page] = data),
    set: (state, { key, data }) => (state[key] = data),
    event: (state, { id, data }) => (state.event[id] = data),
    events: (state, data) => (state.events = data),
    columnsComplete: (state, x) => (state.columns.complete = x),
    columnsShow: (state, x) => (state.columns = { show: x, complete: false }),
  },
  actions: {
    fetchingStarted({ commit, state }) {
      commit("fetching", state.fetching + 1);
    },
    fetchingComplete({ state, commit }) {
      commit("fetching", state.fetching - 1);
      !state.fetching && !state.loading && commit("pageLoaded", true);
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
        commit("set", { key: "nav", data: links });
      }
    },
    async weatherInit() {},
    async nuxtServerInit({ dispatch }) {
      await dispatch("settingsInit");
    },
  },
};
