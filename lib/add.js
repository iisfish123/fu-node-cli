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


// console.log(code)

module.exports = (name) => {
  const { code } = transformFromAstSync(ast, sourceCode, {
    plugins: [[insertPlugin, {
        name: name
    }]]
  })
  fs.writeFileSync(path.join(root, router), code, 'utf8')
}

// console.log(code)

