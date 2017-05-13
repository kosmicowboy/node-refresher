const request = require('request');

var geocodeAddress = (address) => {
    return new Promise((resolve, reject) => {
        const url = 'https://maps.googleapis.com/maps/api/geocode/json?address='
        var encodedAddress = encodeURIComponent(address);

        request({
            url: `${url} ${encodedAddress}`,
            json: true
        }, (error, response, body) => {
            debugger;
            if (error){
                reject('Unable to connect to Google servers.');
            } else if (body.status ===  'ZERO_RESULTS') {
                reject('Unable to find that address.');
            } else if (body.status === 'OK') {
                resolve({
                    address: body.results[0].formatted_address,
                    latitude: body.results[0].geometry.location.lat,
                    longitude: body.results[0].geometry.location.lng
                });
            }
        });
    });
};

geocodeAddress('77040').then((location) => {
    console.log(JSON.stringify(location, undefined, 2));
}, (error) => {
    console.log(errorMessage);
});