const express = require('express');
const isUser = require('../middleware/isUser.jwt');
const {
  placeOrder,
  getAllOrder,
  getOrder
} = require('../controllers/transaction.controller');

const router = express.Router();

router
  .get('/myBooking', isUser, getAllOrder)
  .post('/order', isUser, placeOrder)
  .get('/myBooking/:id', isUser, getOrder);

module.exports = router;
