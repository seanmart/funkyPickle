import weather from "@/assets/weather.json";

export default{
  state:()=>({
    articles:{},
    events:{},
    pages:{},
    weather:{},
    signup:{},
    navigation:[],
    lists:{
      articles:[],
      events:[],
    }
  }),
  mutations:{
    ARTICLE:(state,[key,data]) => state.articles[key] = data,
    EVENT:(state,[key,data]) => state.events[key] = data,
    PAGE:(state,[key,data]) => state.pages[key] = data,
    WEATHER:(state,data) => state.weather = data,
    SIGNUP:(state,data) => state.signup = data,
    NAIGATION:(state,data) => state.navigation = data,
    LIST:(state,[key,data]) => state.lists[key] = data
  },
  actions:{
    async SIGNUP({commit}){
      let res = await this.$prismic.api.getSingle("signup");
      if (!res) return

      commit('SIGNUP', res.data)
    },
    async NAV({commit}){
      let res = await this.$prismic.api.getSingle("navigation");
      if (!res) return

      let links = res.data.body.map((item) => {
        return {
          to:`/${item.primary.link.type == 'page' ? item.primary.link.uid : item.primary.link.type}`,
          label: item.primary.label
        }
      })

      commit("NAIGATION",links);

    },
    async nuxtServerInit({dispatch,commit}){
      await dispatch('NAV')
      await dispatch('SIGNUP')
      commit('WEATHER',weather)
    }
  }
}
