import queries from '@/assets/js/queries'

function camelize(str) {
  return str.indexOf("_") > 0
  ? str.split('_').map((w,i) => i > 0 ? w.charAt(0).toUpperCase() + w.slice(1) : w).join("")
  : str
}

async function checkComponents(data){
  for (let i = 0; i < data.length; i++){
    data[i].component = camelize(data[i].slice_type)
    data[i].hasComponent = await import(`@/components/${data[i].component}`)
      .then((_res) => {return true})
      .catch((_error) => {return false})
  }
  return data
}

export default {
  state:()=>({
    pageLoaded: false,
    reveal: false,
    columns:{
      show:false,
      complete:false
    },
    nav:[],
    event:{},
    events:[],
    page:{},
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
    async page({state,commit},page){
      if (!state.page[page]){
        let results = await this.$prismic.api.getByUID('page', page)
        if (results){
          let data = await checkComponents(results.data.body)
          commit('page',{page, data})
        } else {
          return null
        }
      }
      return state.page[page]
    },
    async event({state,commit},id){
      if (!state.event[id]){
        let results = await this.$prismic.api.getByUID('event', id)
        if (results){
          commit('event',{id, data: results.data.body})
        } else {
          return null
        }
      }
      return state.event[id]
    },
    async events({commit}){

      let date = new Date()
      date.setDate(date.getDate() - 1)

      let results = await this.$prismic.api.query([
        this.$prismic.predicates.at('document.type', 'event'),
        this.$prismic.predicates.date.after('my.event.date', date.toISOString().split('T')[0])
      ],
        {graphQuery:queries.events,orderings:'[my.event.date]'}
      )

      if (results){
        commit('events',results.results)
      } else {
        return null
      }

    },
    async nav({commit}){
      let results = await this.$prismic.api.getSingle('settings')
      let links =[]

      if(results){
        results.data.links.forEach(item => item.page.uid && links.push({
          to:`/${item.page.uid}`,
          label: item.label
        }))
        commit('set',{key:'nav',data: links})
      }
    },
    async nuxtServerInit({dispatch}){
      await dispatch('nav')
      await dispatch('events')
    }
  }
}
