export function uid(){
  return Date.now().toString(36) + Math.random().toString(36).substr(2)
}

export function camelize(str) {
  return str.indexOf("_") > 0
  ? str.split('_').map((w,i) => i > 0 ? w.charAt(0).toUpperCase() + w.slice(1) : w).join("")
  : str
}

export async function checkComponents(data){
  for (let i = 0; i < data.length; i++){
    data[i].component = camelize(data[i].slice_type)
    data[i].hasComponent = await import(`@/components/${data[i].component}`)
      .then((_res) => {return true})
      .catch((_error) => {return false})
  }
  return data
}

export function getDate(o = 0){
  let d = new Date()
  d.setDate(d.getDate() + o)

  let month = '' + (d.getMonth() + 1),
      day = '' + d.getDate(),
      year = d.getFullYear();

  if (month.length < 2)
      month = '0' + month;
  if (day.length < 2)
      day = '0' + day;

  return [year, month, day].join('-');
}

export function toDate(date){
  return new Date(`${date}T00:00:00-07:00`)
}

export function getDay(date){
  date = toDate(date)
  return date.getDate().toString().padStart(2, '0')
}

export function getMonth(date,format = 'long'){
  date = toDate(date)
  return new Intl.DateTimeFormat('en-US', {month:format}).format(date)
}

export function getYear(date){
  date = toDate(date)
  return date.getFullYear()
}
