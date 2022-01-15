export default {
  state: () => ({
    nav: [],
    events: {},
    pages: {},
    fetchData: {},
    loading: 0,
    status: ""
  }),
  mutations: {
    loading:(state,x)=> state.loading = x,
    nav: (state, data) => (state.nav = data),
    pages: (state, { page, data }) => (state.pages[page] = data),
    events: (state, { id, data }) => (state.events[id] = data),
    fetchData: (state, { key, data }) => (state.fetchData[key] = data),
    status: (state, status) => (state.status = status),
  },
  actions: {
    loading({commit,state},isLoading){
      commit('loading',state.loading + (isLoading ? 1 : -1) )
      if(state.loading == 0) commit('status','LOADED')
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
