const userCtrl = require('../controllers/userCtrl');
const auth = require('../middlewares/auth');
const jwt =require('jsonwebtoken')

const router=require('express').Router()
router.post('/register',userCtrl.register)
router.post('/login',userCtrl.login)
router.get('/logout',userCtrl.logout)
router.post('/refresh_token',userCtrl.refreshtoken)
router.get('/infor', auth, userCtrl.getUser);
module.exports=router;