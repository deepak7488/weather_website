const path = require('path')
const chalk = require('chalk')
const express = require('express')
const hbs = require('hbs');
const geocode = require('./util/getgeo.js')
const forcast = require('./util/weatheforecast.js')

//define path and express config
const path_directory = path.join(__dirname, '../public')
const app = express()
const port = process.env.PORT || 3000;
const views_path = path.join(__dirname, '../Templates/views')
const partial_path = path.join(__dirname, '../Templates/partials')
    //setup handlebars engine and views location
app.set('views', views_path)
app.set('view engine', 'hbs')
hbs.registerPartials(partial_path)
    //setup static directroy to serve
app.use(express.static(path_directory))
app.get('', (req, res) => {
    res.render('index', {
        title: 'Weather app',
        name: 'Deepak Jaiswal'
    })
})
app.get('/about', (req, res) => {
    res.render('about', {
        title: 'About me',
        name: 'Deepak Jaiswal'
    })
})
app.get('/help', (req, res) => {
    res.render('help', {
        title: "Help",
        name: "Deepak Jaiswal",
        helptext: "This is some Helpful Text"
    })
})
app.get("/weather", (req, res) => {

    if (req.query.latitude && req.query.longitude) {

        return forcast.forcast({ latitude: req.query.latitude, longitude: req.query.longitude }, (error, forcast, location) => {
            if (error) {
                return res.send({
                    error
                })
            }
            return res.send({
                forcast,
                location
            })


        })
    }
    if (!req.query.address) {
        return res.send({
            error: "must provide address"
        })
    }

    geocode.geocode(req.query.address, (error, { latitude, longitude, location } = {}) => {
        if (error) {
            return res.send({ error })
        }
        forcast.forcast({ latitude, longitude }, (error, forcast) => {
            if (error) {
                return res.send({
                    error
                })
            }
            return res.send({
                forcast,
                location,
                address: req.query.address
            })


        })

    })
})
app.get('/help/*', (req, res) => {

    res.render('error', {
        title: 'Help article not found',
        name: "Deepak Jaiswal",
        errormessage: "error 404"
    })
})
app.get('*', (req, res) => {
    res.render('error', {
            title: '404',
            name: "Deepak Jaiswal",
            errormessage: "Page not found"
        }

    )

})
app.listen(port, () => {
    console.log('server is up on port ' + port + "!")
})