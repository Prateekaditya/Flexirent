const express = require('express');
const router = express.Router();
const controllers =  require('../controllers/user.controllers')
router.post('/register',controllers.register)
router.post('/login',controllers.login)


module.exports = router