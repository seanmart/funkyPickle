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
    transition: false,
    render: false,
    ready:false,
    nav:[],
    events:{},
    pages:{},
    components:{}
  }),
  mutations:{
    transition:(state,x)=> state.transition = x,
    render:(state)=> state.render = true,
    ready:(state,x)=> state.ready = x,
    page:(state,{page,data}) => (state.pages[page] = data),
    set:(state,{key,data})=> (state[key] = data),
    component:(state,{name,data}) => state.components[name] = data,
    event:(state,{id,data}) => state.events[id] = data
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
    async getEvent({state,commit},id){
      if(state.events[id]) return
      let results = await this.$prismic.api.getByUID(page)
      if (results){
        let data = await checkComponents(results.data.body)
        commit('page',{page, data})
      }
    },
    async nuxtServerInit({commit,dispatch}){

      let links = []
      let navData = await this.$prismic.api.query(this.$prismic.predicates.at('document.type', 'page'))
      let settingsData = await this.$prismic.api.getSingle('global_settings')

      if (navData){
        navData.results.forEach(page => links.push({to:`/${page.uid}`,label: page.data.page_label}))
        links.push({to:`/learn`, label: 'Learn'})
        links.push({href:settingsData.data.shop_link.url, label: 'Shop'})
        commit('set',{key:'nav',data: links})
      }

      if (settingsData) commit('set',{key:'settings',data: settingsData.data})

    }
  }
}
