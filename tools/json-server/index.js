
const path = require('path')
const fs = require('fs')
const jsonServer = require('json-server')

const server = jsonServer.create()

//没有.build目录则创建
const folderPath = path.join(__dirname, '..', '..', '.builder')
if (!fs.existsSync(folderPath)) {
  fs.mkdirSync(folderPath)
}

//没有默认数据则创建
const filePath = path.join(folderPath, 'db.json')
if (!fs.existsSync(filePath)) {
  fs.writeFileSync(filePath, JSON.stringify(require('./db')))
}

const router = jsonServer.router(filePath)
const middlewares = jsonServer.defaults()

server.use(middlewares)
server.use(router)
server.listen(3007, () => {
  console.log('JSON Server is running on port 3007')
})