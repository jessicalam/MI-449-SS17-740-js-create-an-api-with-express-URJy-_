var todolist = require('./todolist.js')
var express = require('express')
var app = express()
var bodyParser = require('body-parser')
app.use(bodyParser.json())
var port = process.env.PORT || 8080

// retrieves todo list
app.get('/todolist', function (request, response) {
  response.json(todolist)
})

// retrieves specific todo item
app.get('/todolist/:id', function (request, response) {
  if (!todolist[request.params.id]) {
    response.status(404).end('Oops! There is no task for ' + request.params.id)
    return
  }
  response.json(todolist[request.params.id])
})

// adds new todo item
app.post('/todolist', function (request, response) {
  var id = request.body.task.trim().toLowerCase().split(' ').join('-')
  todolist[id] = {
    task: request.body.task.trim(),
    isDone: request.body.isDone
  }
  response.redirect('/todolist/' + id)
})

// deletes todo item
app.delete('/todolist/:id', function (request, response) {
  delete todolist[request.params.id]
  response.redirect('/todolist')
})

// updates todo item
app.put('/todolist/:id', function (request, response) {
  var product = todolist[request.params.id]
  if (request.body.task !== undefined) {
    product.task = request.body.task.trim()
  }
  if (request.body.isDone !== undefined) {
    product.isDone = request.body.isDone
  }
  response.redirect('/todolist')
})

// listens for bad requests
app.use(function (request, response, next) {
  response.status(404).end(request.url + ' not found')
})

app.listen(port)
