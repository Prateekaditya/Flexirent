const express = require('express')
const router =express.Router();
const {protect} = require('../middlewares/auth')
const controllers = require('../controllers/cart.controllers')

router.post('/add',protect,controllers.addToCart)
router.get('/:userId',protect,controllers.getCart)
router.put('/update',protect,controllers.updateCart)
router.delete('/remove',protect,controllers.removeItem)

module.exports=router;