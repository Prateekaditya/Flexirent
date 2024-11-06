const express = require('express');
const { protect,isSeller } = require('../middlewares/auth');
const router = express.Router();
const controllers = require('../controllers/product.controllers')
const upload = require('../config/multer')


router.get('/',protect,controllers.getProducts)
router.post('/create',protect,(upload.single("image")),isSeller,controllers.createProduct)
router.get('/seller',protect,isSeller,controllers.getSellerProduct)
router.patch('/review/:id',protect,controllers.addReview)
router.patch('/:id',protect,isSeller,(upload.single("image")),controllers.editProduct)
router.delete('/:id',protect,isSeller,controllers.deleteProduct)
router.get('/:id',protect,controllers.singleProduct)
module.exports = router;