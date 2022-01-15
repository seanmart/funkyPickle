const weather = require('~/assets/weather')

export default {
  state:()=>({
    weather,
    pageLoaded: false,
    reveal: false,
    columns:{
      show:false,
      complete:false
    },
    nav:[],
    event:{},
    events:null,
    page:{}
  }),
  mutations:{
    pageLoaded:(state,x)=> state.pageLoaded = x,
    reveal:(state,x)=> state.reveal = x,
    page:(state,{page,data}) => state.page[page] = data,
    set:(state,{key,data})=> state[key] = data,
    event:(state,{id,data}) => state.event[id] = data,
    events:(state,data) => state.events = data,
    columnsComplete:(state,x)=> state.columns.complete = x,
    columnsShow:(state,x)=> state.columns = {show:x,complete:false}
  },
  actions:{
    async nuxtServerInit({commit}){

      let results = await this.$prismic.api.getSingle('settings')
      let links =[]

      if(results){
        results.data.links.forEach(item => item.page.uid && links.push({
          to:`/${item.page.uid}`,
          label: item.label
        }))
        commit('set',{key:'nav',data: links})
      }

    }
  }
}
