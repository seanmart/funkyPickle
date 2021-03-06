import MyComponent from '../../../../slices/Carousel';
import SliceZone from 'vue-slicezone'

export default {
  title: 'slices/Carousel'
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
      mock: {"variation":"default","name":"Default","slice_type":"carousel","items":[{"image":{"dimensions":{"width":900,"height":500},"alt":"Placeholder image","copyright":null,"url":"https://images.unsplash.com/photo-1601933973783-43cf8a7d4c5f?w=900&h=500&fit=crop"},"link":{"link_type":"Web","url":"https://prismic.io"},"title":[{"type":"heading1","text":"Implement compelling action-items","spans":[]}],"description":[{"type":"paragraph","text":"Aute mollit commodo qui eu commodo mollit anim incididunt veniam exercitation Lorem. Voluptate anim eiusmod occaecat ullamco aute do Lorem ut ipsum excepteur.","spans":[]}]},{"image":{"dimensions":{"width":900,"height":500},"alt":"Placeholder image","copyright":null,"url":"https://images.unsplash.com/photo-1589652717521-10c0d092dea9?w=900&h=500&fit=crop"},"link":{"link_type":"Web","url":"http://twitter.com"},"title":[{"type":"heading1","text":"Grow frictionless bandwidth","spans":[]}],"description":[{"type":"paragraph","text":"Dolor et magna sunt ut irure eu esse duis non.","spans":[]}]}],"primary":{"title":"exploit killer functionalities","description":[{"type":"paragraph","text":"Proident eiusmod velit pariatur velit excepteur sunt exercitation nisi ex dolore laboris. Nulla do ut id labore amet enim ipsum adipisicing deserunt aliquip.","spans":[]}]},"id":"_Default"}
    }
  },
  template: '<SliceZone :slices="[mock]" :resolver="resolve" />'
})
_Default.storyName = 'Default'
