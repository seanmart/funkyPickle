export function uid(){
  return Date.now().toString(36) + Math.random().toString(36).substr(2)
}

export function camelize(str) {
  return str.indexOf("_") > 0
  ? str.split('_').map((w,i) => i > 0 ? w.charAt(0).toUpperCase() + w.slice(1) : w).join("")
  : str
}

export async function checkComponents(d){
  for (let i = 0; i < d.length; i++){
    d[i].component = camelize(d[i].slice_type)
    d[i].hasComponent = await import(`@/components/${d[i].component}`)
      .then((_res) => {return true})
      .catch((_error) => {return false})
  }
  return d
}

export function getDate(o = 0){
  let d = new Date()
  d.setDate(d.getDate() + o)

  let m = '' + (d.getMonth() + 1),
      w = '' + d.getDate(),
      y = d.getFullYear();

  if (m.length < 2)
      m = '0' + m;
  if (w.length < 2)
      w = '0' + w;

  return [y, m, w].join('-');
}

export function toDate(d){
  return new Date(`${d}T00:00:00-07:00`)
}
export function getDay(d){
  d = toDate(d)
  return d.getDate().toString().padStart(2, '0')
}
export function getMonth(d,f = 'long'){
  d = toDate(d)
  return new Intl.DateTimeFormat('en-US', {month:f}).format(d)
}
export function getYear(d){
  d = toDate(d)
  return d.getFullYear()
}
export function getStyle(e, s){
    let sv = "";
    if(document.defaultView && document.defaultView.getComputedStyle){
        sv = document.defaultView.getComputedStyle(e, "").getPropertyValue(s);
    }
    else if(e.currentStyle){
        s = s.replace(/\-(\w)/g, function (sm, p1){
            return p1.toUpperCase();
        });
        sv = e.currentStyle[s];
    }
    return parseFloat(sv);
}
