import {getInput} from "@actions/core"
import * as prismic from "@prismicio/client"
import fetch from "node-fetch";

async function getWeather(){

  const PRISMIC_ACCESS_TOKEN = getInput('PRISMIC_ACCESS_TOKEN')
  const PRISMIC_END_POINT = getInput('PRISMIC_END_POINT')
  const WEATHER_ACCESS_TOKEN = getInput('WEATHER_ACCESS_TOKEN')

  let client = getPrismicClient(PRISMIC_END_POINT,PRISMIC_ACCESS_TOKEN)
  let events = await client.getAllByType("event")

  if (events){

    for(const event of events){
      getWeatherData(event.data.map,WEATHER_ACCESS_TOKEN)
      .then(data =>{
        console.log(event.data.title)
        console.log(data)
      })
    }
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
    if (res.ok) return res.json()
    return {}
  }
}

getWeather()
