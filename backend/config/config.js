const path = require('path')
const logDirPath = path.join(__dirname, '/../logs/')
const logPath = path.join(logDirPath, 'app.log')
const { statSync, mkdirSync, writeFileSync } = require('fs')
const bunyan = require('bunyan')
const { merge } = require('lodash')
require('dotenv').config()


try {
  statSync(logPath)
} catch (err) {
  mkdirSync(logDirPath)
  writeFileSync(logPath, '')
}

global.log = bunyan.createLogger({
  name: 'ex4Broker',
  level: 'info',
  serializers: bunyan.stdSerializers,
  streams: [{ path: logPath }, { stream: process.stdout, color: 'blue' }]
})

var config = {
  default: {
    database: process.env.DB_MONGO,
    appUrl: 'http://localhost:3002',
    ports: {
      app: 3000
    },
  }
}

exports.get = function get(env) {
  const obj = {}
  merge(obj, config.default)
  merge(obj, config[env] || {})
  return obj
}
