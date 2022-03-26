const Users = require('../lib/users')
const users = new Users()

async function initialize () {
  await users.initialize()
}
initialize()

const addUser = async ctx => {
  try {
    await users.addUser(ctx.request.body)
    ctx.body = `${ctx.request.body.firstName} is created`
  } catch (error) {
    ctx.status = 500
    ctx.message = 'Something is wrong with the form!'
  }
}

const getAllUsers = async ctx => {
  try {
    const allUsers = await users.findUsers()
    ctx.body = allUsers
  } catch (error) {
    ctx.status = 500
    ctx.message = 'Something is wrong getting all the users'
  }
}

const deleteUser = async (ctx, next) => {
  try {
    await users.deleteUser({
      _id: ctx.params.id
    })
    ctx.body = 'User deleted successfully'
  } catch (error) {
    ctx.status = 500
    ctx.message = 'Something is wrong deleting the user'
  }
}

const getUserInfo = async (ctx, next) => {
  try {
    const findUser = await users.findUser({
      _id: ctx.params.id
    })
    ctx.body = findUser
  } catch (error) {
    ctx.status = 500
    ctx.message = 'Something is wrong getting the information of the user'
  }
}

const updateUser = async (ctx, next) => {
  try {
    await users.updateUser(
      {
        _id: ctx.params.id
      },
      ctx.request.body
    )
    ctx.body = 'User updated successfully'
  } catch (error) {
    ctx.status = 500
    ctx.message = 'Something is wrong getting the information of the user'
  }
}

module.exports = { addUser, getAllUsers, deleteUser, getUserInfo, updateUser }
