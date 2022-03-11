import weather from "@/assets/weather.json";
import { getDateOffset } from "@/assets/helpers";

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
    async EVENTS_LIST({commit}){

      let date = getDateOffset(1);
      let res = await this.$prismic.api.query([
        this.$prismic.predicates.at("document.type", "event"),
        this.$prismic.predicates.date.after("my.event.start_date", date)
      ], {
        graphQuery: `{
        event
        {
        title
        state
        city
        logo
        image
        ball_image
        uid
        start_date
        end_date
        }
        }`,
        orderings: "[my.event.start_date]",
      });

      commit("LIST", ["events", res.results]);

    },
    async SETTINGS({commit}){
      let res = await this.$prismic.api.getSingle("settings");
      if (!res) return

      let signup = {
        title: res.data.signup_title,
        form: res.data.form[0].items,
        submit: res.data.form[0].primary.submit
      }

      let footer = {
        text: res.data.footer_text,
        social: res.data.social
      }

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
      await dispatch('EVENTS_LIST')
      commit('WEATHER',weather)
    }
  }
}
