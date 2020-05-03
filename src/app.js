const path = require('path')
const express = require('express')
const hbs = require('hbs')
const geocode = require('./utils/geocode')
const weather = require('./utils/forcast')


const app = express()
const port = process.env.PORT || 3000

//define paths to express config
const publicDirPath = path.join(__dirname, '../public')
const viewsPath = path.join(__dirname,'../templates/views')
const partials = path.join(__dirname, '../templates/partials')
hbs.registerPartials(partials)
//Setup handlebars engine and views location
app.set('view engine', 'hbs')
app.set('views', viewsPath)


//SETUP STATIC DIRECTORY TO SERVE
app.get('', (req,res) => {
    res.render('index',{
        title: 'Weather',
        name: 'Rohan Panwar'
    })
})

app.get('/help', (req,res) => {
    res.render('help',{
        title: 'HELP',
        name: 'Rohan Panwar'
    })
})

app.get('/about', (req,res) => {
    res.render('about',{
        title: 'About Us',
        name: 'Rohan Panwar'
    })
})

app.use(express.static(publicDirPath))

app.get('/weather', (req, res) => {
    if(!req.query.address){
        return res.send({
            error: 'You must enter the address'
        })
    }

    geocode(req.query.address, (error, { latitude, longitude, location } = {}) => {
        if (error) {
            return res.send({ error })
        }

        weather(latitude, longitude, (error,{ Min, Max, loc, info, Des}) =>{
            return res.send({
                Location: loc,
                Minimum: Min,
                Maximum: Max,
                Condition: info,
                Description: Des
            })
        })
    })
}) 

app.get('/products', (req,res) => {
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

app.get('/help/*', (req,res) => {
    res.render('new',{
        title: 'Help article not found'
    })
})

app.get('*',(req,res) => {
    res.render('newbie',{
        title: 'Page not found'
    })
})

app.listen(port, () => {
    console.log('Server is Running on' + port)
})