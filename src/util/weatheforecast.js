const request = require('request')
const forcast = ({ latitude, longitude, place } = {}, callback) => {
    const url = 'http://api.weatherstack.com/current?access_key=452f4f583a01bfa725d6705b011c1180&query=' + latitude + ',' + longitude //+ '&units=s'
    request({ url, json: true }, (error, { body }) => {
        if (error) {
            callback('Unabe to connect Weather service', undefined)
        } else if (body.error) {

            callback('Unable to find location', undefined)
        } else {


            callback(undefined,
                "It is currently " + body.current.temperature + " °C And it is " + body.current.humidity + " g.kg-1 Humidity at " + "latitude= " + body.location.lat + " longitude= " + body.location.lon
                // temperature: body.current.temperature,
                // place: place
            )

        }
    })
}
module.exports = {
    forcast: forcast
}