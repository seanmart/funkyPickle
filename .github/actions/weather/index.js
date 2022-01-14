const core = require('@actions/core');

async function getWeather(){
  const PRISMIC_ACCESS_TOKEN = core.getInput('PRISMIC_ACCESS_TOKEN'))
  const PRISMIC_END_POINT = core.getInput('PRISMIC_END_POINT'))
  const WEATHER_ACCESS_TOKEN = core.getInput('WEATHER_ACCESS_TOKEN'))

  console.log(!!PRISMIC_ACCESS_TOKEN,!!PRISMIC_END_POINT,!!WEATHER_ACCESS_TOKEN)
}

getWeather()
