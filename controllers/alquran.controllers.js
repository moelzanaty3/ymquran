const axios = require('axios')

const utils = require('../utils')

const getAyah = async () => {
  try {
    let ayahText = ''
    let ayahData = {}
    let tweet
    while (true) {
      const ayahNumber = utils.randomNumbersBetween(1, 6236)
      const response = await axios(`https://api.alquran.cloud/v1/ayah/${ayahNumber}`)
      ayahData = response.data.data ? response.data.data : {}
      if (ayahData.text.length <= 250) break
    }
    if (ayahData && ayahData.text) {
      ayahText = ayahData.text
      const ayahSurah = ayahData.surah.name
      const ayahNumber = ayahData.surah.numberOfAyahs
      tweet = `{${ayahText}} - ${ayahSurah} (${ayahNumber})`
    }
    console.log(tweet)
    return tweet
  } catch (err) {
    console.error(err)
  }
}

module.exports = {
  getAyah
}
