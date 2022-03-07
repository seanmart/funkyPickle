import imagesLoaded from 'imagesloaded'

export default function(ctx, inject){
  inject('loaded', imagesLoaded)
}
