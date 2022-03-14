import MyComponent from '../../../../slices/Form';
import SliceZone from 'vue-slicezone'

export default {
  title: 'slices/Form'
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
      mock: {"variation":"default","name":"Default","slice_type":"form","items":[{"type":"text","required":false,"label":"revolutionize magnetic relationships","column":"utilize visionary architectures","placeholder":"target turn-key interfaces"},{"type":"email","required":false,"label":"envisioneer rich initiatives","column":"optimize cross-media communities","placeholder":"extend innovative web services"},{"type":"text","required":false,"label":"integrate front-end e-commerce","column":"extend global convergence","placeholder":"innovate B2C initiatives"}],"primary":{"publish":false,"inline":true,"title":"visualize open-source models","description":[{"type":"paragraph","text":"Dolor in ipsum occaecat est.","spans":[]}],"action":"transition web-enabled ROI","background":"white"},"id":"_Default"}
    }
  },
  template: '<SliceZone :slices="[mock]" :resolver="resolve" />'
})
_Default.storyName = 'Default'
