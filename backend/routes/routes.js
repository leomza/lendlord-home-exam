const Router = require('koa-router')
const router = new Router()
const userController = require('../controllers/users')

router.get('/getUsers', userController.getAllUsers)
router.get('/userData/:id', userController.getUserInfo)
router.get('/getManagerAndEmployees/:id', userController.getManager)
router.post('/newUser', userController.addUser)
router.post('/deleteUser/:id', userController.deleteUser)
router.post('/updateUser/:id', userController.updateUser)

router.allowedMethods()
module.exports = router
