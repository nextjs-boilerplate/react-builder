const path = require('path')
const fs = require('fs-extra')
const Promise = require('bluebird')
const zipFolder = require('zip-folder')

const tmplPath = path.join(__dirname, '..', '.builder', 'template')
const targetPath = path.join(__dirname, '..', '.builder', 'project')
const targetZip = path.join(__dirname, '..', '.builder', 'project.zip')

module.exports = (req, res, next) => {
  //删掉文件
  Promise.all([
    targetPath,
    targetZip,
  ].map((x) => {
    return fs.exists(x).then((exists) => {
      if (exists) {
        return fs.remove(x)
      }
    })
    return true
  })).then(() => {
    //拷贝
    return fs.copy(tmplPath, targetPath)
  }).then(() => {
    //剔除pages/_builder
    return fs.remove(path.join(targetPath, 'pages', '_builder'))
  }).then(() => {
    //剔除node_modules
    return fs.remove(path.join(targetPath, 'node_modules'))
  }).then(() => {
    //压缩到zip
    const zipFolderP = Promise.promisify(zipFolder)
    return zipFolderP(targetPath, targetZip)
  }).then(() => {
    res.sendFile(targetZip)
  }).catch((e) => {
    console.log(e)
    res.send(e.toString())
  })
}