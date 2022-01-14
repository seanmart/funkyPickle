const core = require('@actions/core');

async function getWeather(){
  const PRISMIC_ACCESS_TOKEN = JSON.parse(getInput('PRISMIC_ACCESS_TOKEN'))
  const PRISMIC_END_POINT = JSON.parse(getInput('PRISMIC_END_POINT'))
  const WEATHER_ACCESS_TOKEN = JSON.parse(getInput('WEATHER_ACCESS_TOKEN'))

  console.log(!!PRISMIC_ACCESS_TOKEN,!!PRISMIC_END_POINT,!!WEATHER_ACCESS_TOKEN)
}

getWeather()
