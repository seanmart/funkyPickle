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
      mock: {"variation":"default","name":"Default","slice_type":"form","items":[{"type":"text","required":true,"label":"reinvent scalable eyeballs","key":"mesh cross-media e-markets","placeholder":"whiteboard distributed schemas","options":"transition 24/7 e-commerce"},{"type":"text","required":true,"label":"unleash sexy networks","key":"e-enable B2C infrastructures","placeholder":"integrate web-enabled vortals","options":"strategize 24/7 e-business"},{"type":"text","required":false,"label":"target interactive action-items","key":"cultivate impactful models","placeholder":"harness sticky synergies","options":"brand interactive niches"}],"primary":{"publish":true,"inline":false,"title":"unleash bleeding-edge paradigms","description":[{"type":"paragraph","text":"Ullamco aliquip ex duis ut nisi. Incididunt proident in ea. Excepteur laboris fugiat duis non in duis eu dolore mollit fugiat ullamco sint incididunt nulla aliquip.","spans":[]}],"action":"deliver B2C initiatives","background":"white"},"id":"_Default"}
    }
  },
  template: '<SliceZone :slices="[mock]" :resolver="resolve" />'
})
_Default.storyName = 'Default'
