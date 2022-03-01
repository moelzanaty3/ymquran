const express = require('express')
const axios = require('axios')
const { TwitterClient } = require('twitter-api-client')
const cron = require('node-cron')
const morgan = require('morgan')

const { accessToken, apiKey, apiSecret, accessTokenSecret } = require('./config')

const utils = require('./utils')

// https://github.com/PLhery/node-twitter-api-v2/blob/master/doc/examples.md#Createaclient
const twitterClient = new TwitterClient({ apiKey, apiSecret, accessToken, accessTokenSecret })

const app = express()
app.use(morgan('short'))
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
      const ayahNumber = data.surah.numberOfAyahs
      tweet = `{${ayahText}} - ${ayahSurah} (${ayahNumber})`
    }
    return tweet
  } catch (err) {
    console.error(err)
  }
}

const tweet = async () => {
  try {
    const text = await getAyah()
    await twitterClient.tweets.statusesUpdate({ status: text })
  } catch (err) {
    console.error(err)
  }
}

// Schedule tasks to be run on the server.
cron.schedule('*/10 * * * *', function () {
  console.log('tweet a tweet every 10 minute - ' + Date.now())
  tweet()
})


app.get('/', async (req, res) => {
  res.send('Hello from YM Quran Bot 🌍')
})

// Start the Server
app.listen(port, () => {
  console.log(`server running 0.0.0.0:${port}`)
  console.log(`press CTRL+C to stop server`)
})
