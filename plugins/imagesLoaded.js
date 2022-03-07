import imagesLoaded from 'imagesLoaded'

export default function(ctx, inject){
  inject('loaded', imagesLoaded)
}
