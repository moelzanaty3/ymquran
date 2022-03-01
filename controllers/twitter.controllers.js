const { TwitterClient } = require('twitter-api-client')

const alquranControllers = require('./alquran.controllers')

const { accessToken, apiKey, apiSecret, accessTokenSecret } = require('../config')

// https://github.com/PLhery/node-twitter-api-v2/blob/master/doc/examples.md#Createaclient
const twitterClient = new TwitterClient({ apiKey, apiSecret, accessToken, accessTokenSecret })

const tweet = async () => {
  try {
    const text = await alquranControllers.getAyah()
    await twitterClient.tweets.statusesUpdate({ status: text.slice(0, 100) })
  } catch (err) {
    console.error(err)
  }
}

module.exports = {
  tweet
}
