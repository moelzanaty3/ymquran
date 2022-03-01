const twitterControllers = require('./controllers/twitter.controllers')

module.exports.run = async (event, context, callback) => {
  try {
    await twitterControllers.tweet()
    const response = {
      statusCode: 200,
      body: JSON.stringify({
        message: 'We tweeted an Ayah! Our bot completed successfully!',
        data: event
      })
    }
    callback(null, response)
  } catch (err) {
    console.log('Error executing Lambda function:', error)
    callback(error, null)
  }
}
