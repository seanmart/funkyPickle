import events from '../assets/placeholders/events'

export default {
  state:()=>({
    nav:[],
    pages:{},
    preloader: true,
    events:[],
    signup:{},
    transition:false
  }),
  mutations:{
    setTransition:(state,x)=> (state.transition = x),
    setPage:(state,{page,data}) => (state.pages[page] = data),
    set:(state,{key,data})=> (state[key] = data)
  },
  actions:{
    nuxtServerInit({commit,dispatch}){
      dispatch('getNav')
      dispatch('getEvents')
      dispatch('getSignup')
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
    },
    getEvents({commit}){
      commit('set',{key:'events',data:events})
    },
    async getNav({commit}){
      let nav = []
      let data = await this.$prismic.api.query(this.$prismic.predicates.at('document.type', 'page'))
      if(data){
        data.results.forEach(page => page.uid !== 'home' && nav.push({route:`/${page.uid}`, label: page.uid}))
        nav.push({route:`/learn`, label: 'Learn'})
        nav.push({url:`https://www.google.com`, label: 'Shop'})
        commit('set',{key:'nav',data: nav})
      }
    },
    async getSignup({commit}){
      let data = await this.$prismic.api.getSingle('signup')
      data && commit('set',{key:'signup',data})
    }
  }
}
