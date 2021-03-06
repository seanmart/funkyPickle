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
      mock: {"variation":"default","name":"Default","slice_type":"form","items":[{"type":"text","required":false,"label":"expedite turn-key metrics","key":"seize e-business deliverables","placeholder":"enhance 24/365 markets","options":"redefine turn-key deliverables"},{"type":"text","required":true,"label":"leverage impactful relationships","key":"engage B2C channels","placeholder":"leverage world-class applications","options":"matrix sticky models"},{"type":"tel","required":false,"label":"recontextualize magnetic users","key":"embrace mission-critical niches","placeholder":"streamline visionary users","options":"streamline enterprise systems"},{"type":"select","required":true,"label":"empower bricks-and-clicks metrics","key":"unleash mission-critical ROI","placeholder":"unleash sexy solutions","options":"enhance customized partnerships"},{"type":"text","required":false,"label":"utilize value-added communities","key":"disintermediate value-added platforms","placeholder":"leverage dynamic interfaces","options":"syndicate web-enabled interfaces"},{"type":"text","required":false,"label":"implement customized supply-chains","key":"whiteboard extensible content","placeholder":"incubate intuitive networks","options":"expedite e-business portals"}],"primary":{"publish":false,"title":"integrate global e-tailers","description":[{"type":"paragraph","text":"In excepteur exercitation quis in dolore. Voluptate dolore dolore labore incididunt reprehenderit minim duis labore ex nostrud nisi adipisicing.","spans":[]}],"action":"repurpose proactive convergence","background":"lime"},"id":"_Default"}
    }
  },
  template: '<SliceZone :slices="[mock]" :resolver="resolve" />'
})
_Default.storyName = 'Default'
