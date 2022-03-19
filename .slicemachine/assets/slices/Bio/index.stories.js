import MyComponent from '../../../../slices/Bio';
import SliceZone from 'vue-slicezone'

export default {
  title: 'slices/Bio'
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
      mock: {"variation":"default","name":"Default","slice_type":"bio","items":[],"primary":{"name":"benchmark cross-platform networks","text":[{"type":"paragraph","text":"Nostrud sunt incididunt aliquip est adipisicing laboris aliquip id cillum pariatur dolore dolor cillum.","spans":[]}]},"id":"_Default"}
    }
  },
  template: '<SliceZone :slices="[mock]" :resolver="resolve" />'
})
_Default.storyName = 'Default'
