import {getInput} from "@actions/core"
import * as prismic from "@prismicio/client"
import fetch from "node-fetch";

async function getWeather(){
  const PRISMIC_ACCESS_TOKEN = getInput('PRISMIC_ACCESS_TOKEN')
  const PRISMIC_END_POINT = getInput('PRISMIC_END_POINT')
  const WEATHER_ACCESS_TOKEN = getInput('WEATHER_ACCESS_TOKEN')

  let client = prismic.createClient(PRISMIC_END_POINT,{
    accessToken:PRISMIC_ACCESS_TOKEN,
    fetch: async (url,options)=>{
      const res = await fetch(url,options)
      if (res.ok) return res
    }
  })
  let events = await client.getAllByType("event")

  if (events){

    const getData = async (map)=>{
      let lon = map.longitude
      let lat = map.latitude
      let exclude = 'minutely,hourly,daily,alerts'

      if(lon && lat){
        let query = `lat=${lat}&lon=${lon}&exclude=${exclude}&appid=${WEATHER_ACCESS_TOKEN}`
        let res = await fetch(`https://api.openweathermap.org/data/2.5/onecall?${query}`)
        if (res.ok){
          return res.json()
        }
      }
    }

    for(const event of events){
      getData(event.data.map)
      .then(data =>{
        console.log(event.data.title)
        console.log(data)
      })
    }
  }
}

getWeather()
