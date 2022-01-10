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

export function yesterday(){
  let date = new Date()
  date.setDate(date.getDate() - 1)
  return date
}
