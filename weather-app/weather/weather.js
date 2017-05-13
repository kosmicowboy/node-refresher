const request = require('request');

var getWeather = (lat, lng, callback) => {
    request({
        url: `https://api.darksky.net/forecast/f2c2e048caad602a834f717bd4603ac7/${lat},${lng}`,
        json: true
    }, (error, response, body) => {
        if (error || response.statusCode !== 200) {
            callback('Unable to fetch weather.')
        } else if (!error && response.statusCode === 200) {
            callback(undefined, {
                temperature: body.currently.temperature,
                apparentTemperature: body.currently.apparentTemperature
            }); 
        }
    });
}

module.exports.getWeather = getWeather;

