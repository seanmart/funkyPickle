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
    setEvents:(state,evnts)=> state.events = evnts,
    setNav:(state,nav) => state.nav = nav,
    setPage:(state,{key,data}) => (state.pages[key] = data),
    setSignup:(state,data)=> state.signup = data
  },
  actions:{
    nuxtServerInit({commit,dispatch}){
      dispatch('getEvents')
      dispatch('getSignup')
    },
    async getHome({state,commit}){
      if (!state.pages.home){
        let data = await this.$prismic.api.getSingle('home')
        data && commit('setPage',{key:'home',data})
      }
    },
    async getEvents({commit}){
      commit('setEvents',events)
    },
    async getSignup({commit}){
      let data = await this.$prismic.api.getSingle('signup')
      console.log(data)
      data && commit('setSignup',data)
    }
  },
  getters:{
    signup:(state)=>state.signup.data,
    events:(state)=>state.events,
    nav:(state)=>state.nav,
    home:(state)=>{
      if (!state.pages.home) return {}
      let home = state.pages.home
      let landing = {
        video: home.data.landing_video,
        image: home.data.landing_image
      }
      let slices = home.data.body
      let id = home.id
      return {landing,slices,id}
    }
  }
}
