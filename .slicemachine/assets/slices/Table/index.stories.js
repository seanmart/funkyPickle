import MyComponent from '../../../../slices/Table';
import SliceZone from 'vue-slicezone'

export default {
  title: 'slices/Table'
}


export const _Default = () => ({
  components: {
    MyComponent,
    SliceZone
  },
  methods: {
    resolve() {
      return MyComponent
    }
  },
  data() {
    return {
      mock: {"variation":"default","name":"Default","slice_type":"table","items":[{"row":"facilitate mission-critical e-markets"},{"row":"deploy compelling action-items"},{"row":"unleash plug-and-play applications"}],"primary":{"publish":false,"title":"envisioneer impactful initiatives","description":[{"type":"paragraph","text":"Tempor consectetur dolore esse quis sunt et deserunt consectetur aute reprehenderit magna duis cillum.","spans":[]}],"link":"disintermediate strategic e-markets","headers":"grow granular blockchains"},"id":"_Default"}
    }
  },
  template: '<SliceZone :slices="[mock]" :resolver="resolve" />'
})
_Default.storyName = 'Default'
