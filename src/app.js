const path = require('path')
const chalk = require('chalk')
const express = require('express')
const hbs = require('hbs');
const { runInNewContext, runInThisContext } = require('vm');
const geocode = require('./util/getgeo.js')
const forcast = require('./util/weatheforecast.js')

//define path and express config
const path_directory = path.join(__dirname, '../public1')
const views_path = path.join(__dirname, '../Templates/views')
const partial_path = path.join(__dirname, '../Templates/partials')
const app = express()
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
                    error1: error
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
app.listen(3000, () => {
    console.log('server is up on port 3000!')
})