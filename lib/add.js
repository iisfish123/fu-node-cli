const { transformFromAstSync } = require('@babel/core')
const  parser = require('@babel/parser')
const insertPlugin = require('../plugins/insert-router-plugin')
const fs = require('fs')
const path = require('path')

const root = process.cwd()
const router = '/app/router.js'

const sourceCode = fs.readFileSync(path.join(root, router), {
    encoding: 'utf-8'
})

const ast = parser.parse(sourceCode, {
    sourceType: 'unambiguous'
})

// 转换为首字母大写
function toUpperCaseName(str) {
  return str.slice(0,1).toUpperCase() + str.slice(1)
}

// console.log(code)

module.exports = (name) => {
  const { code } = transformFromAstSync(ast, sourceCode, {
    plugins: [[insertPlugin, {
        name: name
    }]]
  })
  const { fileDisplay } = require('../utils/traverse')
  const ejs = require('ejs')

  const fileList = fileDisplay(path.join(__filename, '../../tmpl'))
  const templateOption = { name, toUpperCaseName: toUpperCaseName(name) }
  fileList.forEach(async item => {
    const str = await ejs.renderFile(item, templateOption) // return Promie.resolve()
    // fs.writeFileSync(item, str)
    // console.log(str)
    if (item.endsWith('controller.js')) {
      fs.writeFileSync(path.join(process.cwd(), `/app/controller/${name}.js`), str)
    }
    if (item.endsWith('service.js')) {
      fs.writeFileSync(path.join(process.cwd(), `/app/service/${name}.js`), str)
    }
  })
  fs.writeFileSync(path.join(root, router), code, 'utf8')
}

// console.log(code)

