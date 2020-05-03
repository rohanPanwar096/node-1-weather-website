const axios = require('axios')

const geoCode = (address, callback) => {
    const geoCodeUrl = 'https://api.mapbox.com/geocoding/v5/mapbox.places/'+ encodeURIComponent(address) + '.json?access_token=pk.eyJ1Ijoicm9oYW4tMzIxIiwiYSI6ImNrOWJiaDI2ODBkNnUzbWxrcjhwZmI3bDcifQ.q-SEkV9HsLCAKE5IOHPXsw&limit=1' 
    axios.get(geoCodeUrl)
        .then(response => {
            callback(undefined, {
                latitude: response.data.features[0].center[1],
                longitude: response.data.features[0].center[0],
                location: response.data.features[0].place_name
            })
        })
        .catch(error => {
            callback('Unable to find position of place ', undefined)
        });
}

module.exports = geoCode