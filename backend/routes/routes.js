const Router = require('koa-router')
const router = new Router()
const userController = require('../controllers/users')

router.post('/newUser', userController.addUser)
router.get('/getUsers', userController.getAllUsers)
router.post('/deleteUser/:id', userController.deleteUser)
router.post('/updateUser/:id', userController.updateUser)
router.get('/userData/:id', userController.getUserInfo)

router.allowedMethods()
module.exports = router
