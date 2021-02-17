const path = require('path')
const express = require('express')
const hbs = require('hbs')
const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')

const app = express()

//Difine paths for Express config
const publicDirectoryName = path.join(__dirname, '../public')
const viewsPath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')

//Setup handlebars engine and views location
app.set('view engine', 'hbs')
app.set('views', viewsPath)
hbs.registerPartials(partialsPath)

//Setup static directory to serve
app.use(express.static(publicDirectoryName))

app.get('', (req, res) => {
    //res.send('D:\Node.Js\web-server\public\index.html')
    res.render('index', {
        title: 'Weather App',
        name: 'Abu Raihan Rony'
    })
})

app.get('/help', (req, res) => {
    res.render('help', {
        title: 'Help page',
        name: 'Abu Raihan Rony'
    })
})

app.get('/about', (req, res) => {
    res.render('about', {
        title: 'About me',
        name: 'Abu Raihan Rony'
    })
})

app.get('/weather', (req, res) => {
    if (!req.query.address) {
        return res.send({
            error: 'You must provide an address'
        })
    }

    geocode(req.query.address, (error, { latitude, longitude, location } = {}) => {
        if (error) {
            return res.send({
                error: error
            })
        }

        forecast(latitude, longitude, (error, forecastData) => {
            if (error) {
                return res.send({
                    error: error
                })
            }

            //console.log(location)
            res.send(forecastData)
        })
    })
})

app.get('/products', (req, res) => {
    if (!req.query.search) {
        return res.send({
            error: 'You must provide a search term'
        })
    }

    console.log(req.query.search)
    res.send({
        products: []
    })
})

app.get('/help/*', (req, res) => {
    res.render('404', {
        title: '404',
        name: 'Abu Raihan Rony',
        errorMessage: 'Help article not found'
    })
})


app.get('*', (req, res) => {
    res.render('404', {
        title: '404',
        name: 'Abu Raihan Rony',
        errorMessage: 'Page not found'
    })
})

app.listen(2000, () => {
    console.log('Server is up on port 2000.')
})