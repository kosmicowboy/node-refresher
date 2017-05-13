const request = require('request');

var geocodeAddress = (address, callback) => {
    const url = 'https://maps.googleapis.com/maps/api/geocode/json?address='
    var encodedAddress = encodeURIComponent(address);

    request({
        url: `${url} ${encodedAddress}`,
        json: true
    }, (error, response, body) => {
        debugger;
        if (error){
            callback('Unable to connect to Google servers.');
        } else if (body.status ===  'ZERO_RESULTS') {
            callback('Unable to find that address.');
        } else if (body.status === 'OK') {
            callback(undefined, {
                address: body.results[0].formatted_address,
                latitude: body.results[0].geometry.location.lat,
                longitude: body.results[0].geometry.location.lng
            });
        }
    });
};

module.exports.geocodeAddress = geocodeAddress;



