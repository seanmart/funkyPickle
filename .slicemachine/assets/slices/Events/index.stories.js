import MyComponent from '../../../../slices/Events';
import SliceZone from 'vue-slicezone'

export default {
  title: 'slices/Events'
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
      mock: {"variation":"default","name":"Default","slice_type":"events","items":[],"primary":{"publish":false,"title":"revolutionize web-enabled e-commerce","description":[{"type":"paragraph","text":"Commodo laboris esse sit.","spans":[]}],"count":4979},"id":"_Default"}
    }
  },
  template: '<SliceZone :slices="[mock]" :resolver="resolve" />'
})
_Default.storyName = 'Default'
