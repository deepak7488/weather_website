const request = require('request')
const forcast = ({ latitude, longitude, place } = {}, callback) => {
    const url = 'http://api.weatherstack.com/current?access_key=452f4f583a01bfa725d6705b011c1180&query=' + latitude + ',' + longitude //+ '&units=s'
    request({ url, json: true }, (error, { body }) => {
        if (error) {
            callback('Unabe to connect Weather service', undefined, undefined)
        } else if (body.error) {

            callback('Unable to find location', undefined, undefined)
        } else {


            callback(undefined,
                body.current.weather_descriptions[0] + ". It is currently " + body.current.temperature + " °C Out. It feels like " + body.current.feelslike + " °C Out. The Humidity is " + body.current.humidity + "%."
                // temperature: body.current.temperature,
                // place: place
                , `${body.location.name},${body.location.region},${body.location.country}`)

        }
    })
}
module.exports = {
        forcast: forcast
    }
    // https://junglee-weather-application.herokuapp.com