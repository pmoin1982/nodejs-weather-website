const request = require('request')

const geocode = (address, callback) => {
    const urlGeocode = 'https://api.mapbox.com/geocoding/v5/mapbox.places/'+address+'.json?access_token=pk.eyJ1IjoicG1vaW4xOTgyIiwiYSI6ImNrOXl4cGFzbjAyd20zbG1kd2NtNjYyYXYifQ.oDH5zQir9qewd_hhd9elhQ'
    request({url: urlGeocode, json: true}, (error, response) =>{
        if (error) {
            callback("Unable to connect to location service", undefined);
        } else if (response.body.features.length === 0) {
            callback("Unable to find location. Try again", undefined);
        } else {
            callback(undefined, {
                fullAddress: response.body.features[0].place_name,
                latitude: response.body.features[0].center[0],
                longitude: response.body.features[0].center[1]
            });
        }
    })
}

module.exports = geocode;