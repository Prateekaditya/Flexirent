const express = require('express');
const router = express.Router();
const {protect,isSeller} = require('../middlewares/auth')
const controller = require('../controllers/order.controllers.js')

router.get('/',protect,controller.getOrderUser)

module.exports = router;
