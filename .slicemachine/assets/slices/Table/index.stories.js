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
      mock: {"variation":"default","name":"Default","slice_type":"table","items":[],"primary":{"publish":true,"title":[{"type":"heading1","text":"Deliver open-source interfaces","spans":[]}],"description":[{"type":"paragraph","text":"Ullamco eiusmod fugiat sint laborum proident cupidatat non.","spans":[]}]},"id":"_Default"}
    }
  },
  template: '<SliceZone :slices="[mock]" :resolver="resolve" />'
})
_Default.storyName = 'Default'
