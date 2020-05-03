const axios = require('axios')

const weather = (lat, lon, callback) => {
    const url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=metric&appid=0f5dfda27631cefe62dd93c4b365474b`
    
    axios.get(url)
       .then(response => {
           callback(undefined, {
               Min: response.data.main.temp_min,
               Max: response.data.main.temp_max
           })
        })
        .catch(error => {
            callback('Cannot find temperature updates', undefined)
        })
}

module.exports = weather

