var express = require('express')
var logger = require('morgan')
var bodyParser = require('body-parser')
var axios = require('axios')

var app = express()


app.set('view engine', 'ejs')

app.use(express.static("public"))
app.use(logger('dev'))

app.set('views', __dirname + '/public')

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))

app.get('/', function(request, response){
    response.render('home.ejs')
})

app.post('/', function(request, response){
    var food = request.body.food
    var YOUR_APP_ID = 'fc40abc8'
    var YOUR_APP_KEY = 'f023066a5a862984f725dbb792149d40'
    var apiUrl = `https://api.edamam.com/search?q=${food}&app_id=${YOUR_APP_ID}&app_key=${YOUR_APP_KEY}`
    axios.get(apiUrl)
    .then(function(res){
        response.render('results.ejs', { data: res.data })
    })
})

var port = process.env.PORT || 8080
app.listen(port, function(){
    console.log('Server running on port:' + port)
})