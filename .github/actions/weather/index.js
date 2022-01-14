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
  let results = await client.getAllByType("event")
  console.log(results)
}

getWeather()
