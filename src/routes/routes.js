const express = require('express');
const bodyParser = require('body-parser')

const app = express();
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended: true}))

const { createOneOrder, updateOneOrder, deleteOneOrder } = require('../services/models.service');

app.post('/delivery/createOneOrder', (req, res) => {
  return createOneOrder(req, res)
})
app.patch('/delivery/updateOneOrder', (req, res) => {
  return updateOneOrder(req, res)
})
app.patch('/delivery/received', (req, res) => {
  return updateOneOrder(req, res)
})
app.delete('/delivery/deleteOrder', (req, res) => {
  return deleteOneOrder(req, res)
})


module.exports = app