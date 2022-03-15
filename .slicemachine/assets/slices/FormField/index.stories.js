import MyComponent from '../../../../slices/FormField';
import SliceZone from 'vue-slicezone'

export default {
  title: 'slices/FormField'
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
      mock: {"variation":"default","name":"Default","slice_type":"form_field","items":[],"primary":{"type":"email","label":"enable front-end markets","column":"generate world-class e-markets","required":false,"placeholder":"reintermediate synergistic action-items"},"id":"_Default"}
    }
  },
  template: '<SliceZone :slices="[mock]" :resolver="resolve" />'
})
_Default.storyName = 'Default'
