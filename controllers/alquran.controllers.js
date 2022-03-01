const axios = require('axios')

const utils = require('../utils')

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

module.exports = {
  getAyah
}
