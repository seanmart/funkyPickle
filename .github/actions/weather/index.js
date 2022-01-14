import {getInput} from "@actions/core"
import * as prismic from "@prismicio/client"
import fetch from "node-fetch";

async function getWeather(){

  const PRISMIC_ACCESS_TOKEN = getInput('PRISMIC_ACCESS_TOKEN')
  const PRISMIC_END_POINT = getInput('PRISMIC_END_POINT')
  const WEATHER_ACCESS_TOKEN = getInput('WEATHER_ACCESS_TOKEN')

  let client = getPrismicClient(PRISMIC_END_POINT,PRISMIC_ACCESS_TOKEN)
  let events = await client.getAllByType("event")
  let doc = {}

  if (events){
    for(const event of events){
      let data = await getWeatherData(event.data.map,WEATHER_ACCESS_TOKEN)
      doc[event.uid] = data
    }
    await fs.writeFile('eventsWeatherData/index.json', doc, 'utf8')
  }
}

function getPrismicClient(endPoint,accessToken){
  return prismic.createClient(endPoint,{
    accessToken,
    fetch: async (url,options)=>{
      const res = await fetch(url,options)
      if (res.ok) return res
    }
  })
}

async function getWeatherData(coordinates,accessToken){
  let lon = coordinates.longitude
  let lat = coordinates.latitude
  let exclude = 'minutely,hourly,daily,alerts'

  if(lon && lat){
    let query = `lat=${lat}&lon=${lon}&exclude=${exclude}&appid=${accessToken}`
    let res = await fetch(`https://api.openweathermap.org/data/2.5/onecall?${query}`)
    if (res.ok){
      let data = await res.json()
      return data
    }
  }
  return {}
}

getWeather()
