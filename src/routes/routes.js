const express = require('express');
const bodyParser = require('body-parser')

const app = express();
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))

const {
  createOneOrder,
  updateOneOrder,
  deleteOneOrder,
  getOneOrder,
  getTotalAmount,
  countProducts
} = require('../services/models.service');

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
app.get('/delivery/getOneOrder', (req, res) => {
  return getOneOrder(req, res)
})
app.get('/delivery/getTotalAmount', (req, res) => {
  return getTotalAmount(req, res)
})
app.get('/delivery/countProducts', (req, res) => {
  return countProducts(req, res)
})


module.exports = app