import MyComponent from '../../../../slices/Link';
import SliceZone from 'vue-slicezone'

export default {
  title: 'slices/Link'
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
      mock: {"variation":"default","name":"Default","slice_type":"link","items":[],"primary":{"label":"cultivate turn-key ROI","link":{"link_type":"Web","url":"http://google.com"}},"id":"_Default"}
    }
  },
  template: '<SliceZone :slices="[mock]" :resolver="resolve" />'
})
_Default.storyName = 'Default'
