const path = require('path');
const express = require('express');
const hbs = require('hbs');
const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')

const app = express();

//express configuration paths
const publicDirPath = path.join(__dirname, '../public');
const viewsPath = path.join(__dirname, '../templates/views');
const partialsPath = path.join(__dirname, '../templates/partials');

//handlebars engine and views setup
app.set('view engine', 'hbs');
app.set('views', viewsPath);
hbs.registerPartials(partialsPath)

//static dirictory path
app.use(express.static(publicDirPath));


app.get('/', (req, res) => {
    res.render('index', {
        title: "Weather Information Site"
    })
})

app.get('/weather', (req, res) => {
    console.log(req.query)
    
    if (!req.query.address) {
        return res.send({
            error: "Please provide an address!"   
        })
    }

    // res.send({
    //     address: req.query.address
    // })

    const address = req.query.address;
    geocode(address,(geocodeError, {fullAddress, latitude, longitude} = {}) =>{
        //console.log("Geocode Error: ", geocodeError)
        if (geocodeError) {
            return res.send({
                error: geocodeError   
            })
        }
        forecast(latitude,longitude,(forecastError, forecastData) =>{
            //console.log("Forecast Error: ", forecastError)
            if (forecastError) {
                return res.send({
                    error: forecastError   
                })
            }
            
            //console.log("Forecast Data: ", forecastData)
            res.send(forecastData);
        })
    })
    
})

app.get('/about', (req, res) => {
    res.render('about', {
        title: "About ISM",
        author: "Parvez Moin"
    })
})

app.get('/help', (req, res) => {
    res.render('help', {
        title: "Help Page",
        helpText: "This block will help you through documentation."
    })
})

app.get('/help/*', (req, res) => {
    res.render('404', {
        title: "Page Not Found"
    })
})

app.get('*', (req, res) => {
    res.render('404', {
        title: "Page Not Found"
    })
})

app.listen(3000, () => {
    console.log('Server is up and running at port 3000.')
})