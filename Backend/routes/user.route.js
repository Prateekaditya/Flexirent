const express = require('express');
const router = express.Router();
const controllers = require('../controllers/user.controllers');
const { protect, isSeller } = require('../middlewares/auth');
router.get('/:id',protect,controllers.getProfile)
router.post('/register', controllers.register);
router.post('/login', controllers.login);
router.patch('/details', protect, controllers.addAddandPhone);
router.get('/:userId',protect,controllers.getUserAddresses);

module.exports = router;