require('dotenv').config()

module.exports = {
  port: process.env.PORT,
  twitterAPIKey: process.env.TWITTER_API_KEY,
  twitterAPISecret: process.env.TWITTER_API_SECRET,
  twitterAccessToken: process.env.TWITTER_ACCESS_TOKEN,
  twitterAccessTokenSecret: process.env.TWITTER_ACCESS_TOKEN_SECRET
}
