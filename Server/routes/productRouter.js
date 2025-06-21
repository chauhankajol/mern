const router=require('express').Router()
 const productCtrl=require('../controllers/productCtrl')
router.route('/products')
.get(productCtrl.getProduct)
.post(productCtrl.createProducts)




router.route('/product/:id')
.delete(productCtrl.deleteProduct)
.put(productCtrl.updateProduct)

module.exports=router