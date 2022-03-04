import weather from "@/assets/weather.json";

export default{
  state:()=>({
    events:{},
    pages:{},
    weather:{},
    settings:{
      links:[],
      signup:{},
      footer:{}
    },
    lists:{
      articles:[],
      events:[],
    }
  }),
  mutations:{
    EVENT:(state,[key,data]) => state.events[key] = data,
    PAGE:(state,[key,data]) => state.pages[key] = data,
    WEATHER:(state,data) => state.weather = data,
    SETTINGS:(state,data) => state.settings = data,
    LIST:(state,[key,data]) => state.lists[key] = data
  },
  actions:{
    async SETTINGS({commit}){
      let res = await this.$prismic.api.getSingle("settings");
      if (!res) return

      let signup = {title: res.data.signup_title,form: res.data.form, action: res.data.macro_link}
      let footer = {text: res.data.footer_text}

      let links = res.data.links.map((item) => {
        let {link_type,type,url,uid} = item.primary.link
        return {
          href: link_type == "Web" ? url : null,
          to: link_type == "Document" ? `/${type == 'page' ? uid : type}` : null,
          label: item.primary.label
        }
      })

      commit('SETTINGS',{links,signup,footer})
    },
    async nuxtServerInit({dispatch,commit}){
      await dispatch('SETTINGS')
      commit('WEATHER',weather)
    }
  }
}
