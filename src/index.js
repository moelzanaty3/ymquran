const express = require('express')
const axios = require('axios')
const { TwitterClient } = require('twitter-api-client')
const config = require('./config')
const utils = require('./utils')

console.log(config)
console.log(utils)

const app = express()
const port = process.env.PORT || 8080

const getAyah = async () => {
  const ayahNumber = utils.randomNumbersBetween(1, 6236)
  try {
    const response = await axios(`https://api.alquran.cloud/v1/ayah/${ayahNumber}`)
    const data = response.data.data ? response.data.data : {}
    let tweet
    if (data && data.text) {
      const ayahText = data.text
      const ayahSurah = data.surah.name
      const ayahNumber = data.number
      tweet = `${ayahSurah} (${ayahNumber}) - {${ayahText}}`
    }
    return tweet
    //TODO send the tweet
  } catch (err) {
    console.error(err)
  }
}

const tweet = async () => {
  try {
    const text = await getAyah()
    await twitterClient.tweets.statusesUpdate({ status: text })
    console.log('Tweeted!')
  } catch (err) {
    console.error(err)
  }
}

app.get('/', async (req, res) => {
  res.send('Hello from YM Quran Bot 🌍')
})

// Start the Server
app.listen(port, () => {
  console.log(`server running 0.0.0.0:${port}`)
  console.log(`press CTRL+C to stop server`)
})
