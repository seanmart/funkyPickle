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
      mock: {"variation":"default","name":"Default","slice_type":"form","items":[{"type":"dropdown","required":false,"label":"utilize distributed deliverables","column":"deploy innovative applications","placeholder":"synthesize plug-and-play metrics"},{"type":"phone","required":true,"label":"brand synergistic architectures","column":"deploy distributed networks","placeholder":"engineer viral e-services"},{"type":"dropdown","required":false,"label":"brand seamless infrastructures","column":"transform viral architectures","placeholder":"deliver efficient users"},{"type":"textarea","required":true,"label":"envisioneer innovative e-business","column":"strategize impactful relationships","placeholder":"harness user-centric schemas"},{"type":"text","required":false,"label":"syndicate killer e-services","column":"enhance efficient interfaces","placeholder":"evolve global web-readiness"},{"type":"text","required":true,"label":"grow end-to-end models","column":"enhance granular partnerships","placeholder":"benchmark distributed solutions"},{"type":"dropdown","required":false,"label":"seize distributed schemas","column":"synergize next-generation portals","placeholder":"enable out-of-the-box schemas"}],"primary":{"publish":false,"inline":true,"title":"synthesize revolutionary models","description":[{"type":"paragraph","text":"Qui eu anim ad aute enim sunt anim deserunt.","spans":[]}],"action":"transition transparent technologies","background":"lime"},"id":"_Default"}
    }
  },
  template: '<SliceZone :slices="[mock]" :resolver="resolve" />'
})
_Default.storyName = 'Default'

export const _NoLink = () => ({
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
      mock: {"variation":"noLink","name":"No Link","slice_type":"form","items":[{"type":"email","required":true,"label":"reinvent transparent relationships","column":"recontextualize clicks-and-mortar partnerships","placeholder":"grow value-added technologies"},{"type":"textarea","required":true,"label":"grow seamless schemas","column":"innovate end-to-end synergies","placeholder":"transition cross-media relationships"},{"type":"dropdown","required":false,"label":"matrix strategic eyeballs","column":"productize B2B platforms","placeholder":"visualize world-class blockchains"},{"type":"text","required":false,"label":"cultivate 24/7 mindshare","column":"envisioneer dot-com web-readiness","placeholder":"mesh granular solutions"},{"type":"text","required":false,"label":"optimize killer partnerships","column":"scale mission-critical bandwidth","placeholder":"exploit seamless partnerships"},{"type":"text","required":false,"label":"brand frictionless users","column":"strategize dynamic web-readiness","placeholder":"leverage sticky portals"},{"type":"text","required":false,"label":"incubate distributed partnerships","column":"aggregate leading-edge convergence","placeholder":"monetize one-to-one users"}],"primary":{"publish":true,"title":"seize web-enabled architectures","description":[{"type":"paragraph","text":"Reprehenderit aliqua occaecat officia minim sint. Pariatur nostrud tempor deserunt nisi exercitation excepteur eiusmod. Sunt mollit reprehenderit sunt enim sint tempor non sunt in fugiat cupidatat.","spans":[]}],"background":"white"},"id":"_NoLink"}
    }
  },
  template: '<SliceZone :slices="[mock]" :resolver="resolve" />'
})
_NoLink.storyName = 'No Link'
