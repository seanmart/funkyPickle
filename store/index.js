import weather from "@/data/weather.json";

export default{
  state:()=>({
    articles:{},
    events:{},
    pages:{},
    weather:{},
    lists:{
      articles:[],
      events:[],
      nav:[]
    }
  }),
  mutations:{
    ARTICLE:(state,{key,data}) => state.articles[key] = data,
    WEATHER:(state,data) => state.weather = data,
    EVENT:(state,{key,data}) => state.events[key] = data,
    PAGE:(state,{key,data}) => state.pages[key] = data,
    LIST:(state,{key,data}) => state.lists[key] = data
  },
  actions:{
    async NAV({commit}){
      let res = await this.$prismic.api.getSingle("navigation");
      if (!res) return

      let links = res.data.body.map((item) => {
        return {
          to:`/${item.primary.link.type == 'page' ? item.primary.link.uid : item.primary.link.type}`,
          label: item.primary.label
        }
      })

      commit("LIST", {key: 'nav',data: links});

    },
    async nuxtServerInit({dispatch,commit}){
      await dispatch('NAV')
      commit('WEATHER',weather)
    }
  }
}
