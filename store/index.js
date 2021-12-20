import events from '../assets/placeholders/events'

export default {
  state:()=>({
    nav:[],
    pages:{},
    events:[],
    settings:{},
    transition:false
  }),
  mutations:{
    setTransition:(state,x)=> (state.transition = x),
    setPage:(state,{page,data}) => (state.pages[page] = data),
    set:(state,{key,data})=> (state[key] = data)
  },
  actions:{
    async getPage({state,commit},page){
      if (state.pages[page]) return
      let results = await this.$prismic.api.getByUID('page', page)
      results && commit('setPage',{page, data: results.data.body })
    },
    async getSingle({state,commit},page){
      if (state.pages[page]) return
      let results = await this.$prismic.api.getSingle(page)
      results && commit('setPage',{page, data: results.data.body })
    },
    async nuxtServerInit({commit,dispatch}){

      let links = []
      let navData = await this.$prismic.api.query(this.$prismic.predicates.at('document.type', 'page'))
      let settingsData = await this.$prismic.api.getSingle('global_settings')
      let eventsData = {data: events}

      if (navData){
        navData.results.forEach(page => links.push({route:`/${page.uid}`,label: page.data.page_label}))
        links.push({route:`/learn`, label: 'Learn'})
        links.push({url:`https://www.google.com`, label: 'Shop'})
        commit('set',{key:'nav',data: links})
      }

      if (settingsData) commit('set',{key:'settings',data: settingsData.data})
      if(eventsData) commit('set',{key:'events',data:eventsData.data})

    }
  }
}
