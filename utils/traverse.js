const fs = require('fs')
const path = require('path')
 
// 文件夹路径
// let filePath = path.resolve('./src')
 
// fileDisplay(filePath)
 
// 遍历文件夹
function fileDisplay(filePath) {
  //根据文件路径读取文件，返回文件列表
  fs.readdir(filePath, function(err, files) {
    if (err) {
      console.error(err, "读取文件失败")
    } else {
      //遍历读取到的文件列表
      files.forEach(function(filename) {
        //获取当前文件的绝对路径
        let fileDir = path.join(filePath, filename)
        //根据文件路径获取文件信息
        fs.stat(fileDir, function(err, stats) {
          if (err) {
            console.error('获取文件信息失败')
          } else {
            let isFile = stats.isFile() 
            let isDir = stats.isDirectory() 
            if (isFile) {
              // 是文件，打印文件路径
              console.log(fileDir)
            }
            if (isDir) {
              //是文件夹，继续递归
              fileDisplay(fileDir) 
            }
          }
        })
      })
    }
  })
}

module.exports = {
  fileDisplay
}