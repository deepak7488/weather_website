const request = require('request')
const geocode = (address, callback) => {
    const url = 'https://api.mapbox.com/geocoding/v5/mapbox.places/' + encodeURIComponent(address) + '.json?access_token=pk.eyJ1IjoianVuZ2xlZS1wYW5kYTEyIiwiYSI6ImNrcnU5a2M4aTAydDEydW8zbWlma3hydm4ifQ.CoXjk84Dr4S-Hg22ymPuZg'
        //setTimeout(() => {

    request({ url, json: true }, (error, { body }) => {
        if (error) {
            callback('Unabe to connect service', undefined)
        } else if (body.features.length == 0) {

            callback('Unable to find location try different location', undefined)
        } else {


            callback(undefined, {
                latitude: body.features[0].center[1],
                longitude: body.features[0].center[0],
                location: body.features[0].place_name
            })

        }
    })

    //}, 2000)
}
module.exports = {
    geocode: geocode
}