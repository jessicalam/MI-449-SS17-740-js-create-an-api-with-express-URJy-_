var express = require('express')
var app = express()
var port = process.env.PORT || 8080
var anotherFile = require('todolist.js')

app.get('/', function (request, response) {
  response.json({
    welcome: 'welcome to my API!'
  })
})

app.listen(port)
