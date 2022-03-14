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
      mock: {"variation":"default","name":"Default","slice_type":"events","items":[],"primary":{"publish":false,"title":"leverage plug-and-play initiatives","description":[{"type":"paragraph","text":"Amet ad tempor id duis pariatur excepteur excepteur eiusmod velit elit occaecat incididunt sunt magna. Labore amet ut commodo id amet id excepteur officia consectetur deserunt.","spans":[]}],"count":1067},"id":"_Default"}
    }
  },
  template: '<SliceZone :slices="[mock]" :resolver="resolve" />'
})
_Default.storyName = 'Default'
