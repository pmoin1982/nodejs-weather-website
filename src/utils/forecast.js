const request = require('request')

const forecast = (latitude, longitude, callback) => {
    const urlForecast = 'http://api.openweathermap.org/data/2.5/onecall?lat='+latitude+'&lon='+longitude+'&appid=b12b8b982ebb0e8eb359f881ebcf5177'
    request({url: urlForecast, json: true}, (error, response) =>{
        if (error) {
            callback("Unable to connect to weather service", undefined)
        } else if (response.body.cod === '400') {
            callback("Unable to find weather data. Try again", undefined)
        } else {
            callback(undefined, {
                currentTemp: response.body.current.temp,
                weatherDesc: response.body.current.weather[0].description
            })
        }
    })
}

module.exports = forecast;


