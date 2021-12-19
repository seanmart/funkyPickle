import events from '../assets/placeholders/events'

export default {
  state:()=>({
    nav:[
      {label:'About',url:'/about'},
      {label:'Events',url:'/events'},
      {label:'Happening Now',url:'/now'},
      {label:'Pickleball 101',url:'/learn'},
      {label:'Shop',url:'/'}
    ],
    pages:{},
    preloader: true,
    events:[],
    signup:{}
  }),
  mutations:{
    setPage:(state,{page,data}) => (state.pages[page] = data),
    set:(state,{key,data})=> (state[key] = data)
  },
  actions:{
    nuxtServerInit({commit,dispatch}){
      dispatch('getEvents')
      dispatch('getSignup')
    },
    async getPage({state,commit},page){
      if (!state.pages[page]){
        let data = await this.$prismic.api.getSingle(page)
        data && commit('setPage',{page,data})
      }
    },
    getEvents({commit}){
      commit('set',{key:'events',data:events})
    },
    async getSignup({commit}){
      let data = await this.$prismic.api.getSingle('signup')
      data && commit('set',{key:'signup',data})
    }
  }
}
