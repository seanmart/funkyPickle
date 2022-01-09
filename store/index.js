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
    ready:false,
    reveal: false,
    nav:[],
    events:{},
    eventsMetaData:[],
    pages:{},
  }),
  mutations:{
    ready:(state,x)=> state.ready = x,
    reveal:(state,x)=> state.reveal = x,
    page:(state,{page,data}) => (state.pages[page] = data),
    set:(state,{key,data})=> (state[key] = data),
    eventData:(state,{id,data}) => state.events[id] = data,
    eventsMetaData:(state,data) => state.eventsMetaData = data
  },
  actions:{
    async page({state,commit,dispatch},page){
      if (state.pages[page]) return
      let results = await this.$prismic.api.getByUID('page', page)
      if (results){
        let data = await checkComponents(results.data.body)
        commit('page',{page, data})
      }
    },
    async single({state,commit,dispatch},page){
      if (state.pages[page]) return
      let results = await this.$prismic.api.getSingle(page)
      if (results){
        let data = await checkComponents(results.data.body)
        commit('page',{page, data})
      }
    },
    async event({state,commit},id){
      if(state.events[id]) return
      let results = await this.$prismic.api.getByUID(id)
      if (results){
        let data = await checkComponents(results.data.body)
        commit('page',{page, data})
      }
    },
    async eventsMetaData({state,commit}){
      if (state.eventsMetaData.length > 0) return true

      let date = new Date()
      date.setDate(date.getDate() - 1)
      
      let results = await this.$prismic.api.query([
        this.$prismic.predicates.at('document.type', 'event'),
        this.$prismic.predicates.date.after('my.event.date', date.toISOString().split('T')[0])
      ],
        {graphQuery:queries.events,orderings:'[my.event.date]'}
      )

      results
      ? commit('eventsMetaData',results.results)
      : console.log(results)
      return !!results
    },
    async nuxtServerInit({commit,dispatch}){

      let results = await this.$prismic.api.getSingle('global_settings',{fetchLinks:[
        'page.uid','page.label','learn.uid','learn.label','shop.uid','shop.label'
      ]})
      let pages =[]

      if(results){
        results.data.nav.forEach(item => {
          if (item.page.data){
            pages.push({to:`/${item.page.data.uid}`, label: item.page.data.label})
          } else {
            console.log(`item type ${item.type} has no nav data`)
          }
        })
        commit('set',{key:'nav',data: pages})

      }


      //if (settingsData) commit('set',{key:'settings',data: settingsData.data})

    }
  }
}
