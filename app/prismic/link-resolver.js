export default function(doc) {
  if (doc.type === 'home') {
    return '/';
  }
  if (doc.type === 'page') {
    return `/${doc.uid}`;
  }
  if (doc.type == 'event'){
    return `/event/${doc.uid}`
  }
}
