const request = require('request');

var getWeather = (lat,lng, callback) => {
    request({
        url:`https://api.darksky.net/forecast/53132d6b4a5ee9cde97a255c60f67896/${lat},${lng}`,
        json: true
    }, (error, response,body) => {
        if(!error && response.statusCode === 200){
            callback(undefined,{
                temperature: body.currently.temperature,
                apparentTemperature: body.currently.apparentTemperature
            });
        }else{
            callback('Unable to fetch weather')
        }
    });
}

module.exports = {
    getWeather
}