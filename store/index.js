import events from '../assets/placeholders/events'

export default {
  state:()=>({
    nav:[],
    pages:{},
    preloader: true,
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
    async nuxtServerInit({commit,dispatch}){

      let navData = await this.$prismic.api.query(this.$prismic.predicates.at('document.type', 'page'))
      if (navData){
        let links = []
        navData.results.forEach(page => page.uid !== 'home' && links.push({route:`/${page.uid}`, label: page.uid}))
        links.push({route:`/learn`, label: 'Learn'})
        links.push({url:`https://www.google.com`, label: 'Shop'})
        commit('set',{key:'nav',data: links})
      }

      let settingsData = await this.$prismic.api.getSingle('global_settings')
      if (settingsData){
        commit('set',{key:'settings',data: settingsData.data})
      }

      commit('set',{key:'events',data:events})

    },
    async getPage({state,commit},page){
      if (!state.pages[page]){
        let data = await this.$prismic.api.getByUID('page',page)
        data && commit('setPage',{page,data})
      }
      setTimeout(()=>commit('setTransition',false),500)
    },
    async getLearn({commit}){
      setTimeout(()=>commit('setTransition',false),500)
    }
  }
}
