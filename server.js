var todos = require('./todos.js')
var express = require('express')
var app = express()
var bodyParser = require('body-parser')
app.use(bodyParser.json())
var port = process.env.PORT || 8080

// retrieves todo list
app.get('/todos', function (request, response) {
  response.json(todos)
})

// retrieves specific todo item
app.get('/todos/:id', function (request, response) {
  if (!todos[request.params.id]) {
    response.status(404).end('There is no task for ' + request.params.id)
    return
  }
  response.json(todos[request.params.id])
})

app.post('/todos', function (request, response) {
  var id = request.body.task.trim().toLowerCase().split(' ').join('-')
  todos[id] = { // adds new todo item
    task: request.body.task.trim(),
    isDone: request.body.isDone
  }
  response.redirect('/todos/' + id)
})

app.delete('/todos/:id', function (request, response) {
  if (!todos[request.params.id]) {
    response.status(404).end('There is no task for ' + request.params.id)
    return
  }
  delete todos[request.params.id] // deletes todo item
  response.redirect('/todos')
})

app.put('/todos/:id', function (request, response) { // updates todo item
  var product = todos[request.params.id]
  if (!todos[request.params.id]) {
    response.status(404).end('There is no task for ' + request.params.id)
    return
  }
  if (request.body.task !== undefined) {
    product.task = request.body.task.trim()
  }
  if (request.body.isDone !== undefined) {
    product.isDone = request.body.isDone
  }
  response.redirect('/todos')
})

app.use(function (request, response, next) {
  response.status(404).end(request.url + 'not found') // listens for bad requests
})

app.listen(port)
