const parser = require('@babel/parser');
const traverse = require('@babel/traverse').default;
const generate = require('@babel/generator').default;
const types = require('@babel/types');
const template = require('@babel/template').default;
// const insertPlugin = require('../plugins/add-router-plugin')
const fs = require('fs')
const path = require('path')
const root = process.cwd()
const file = '/test/ast/config.default.js'
const targetPath = path.join(root, file)

const tmpl = template(`const a = 1`)({})

const ast = parser.parse(fs.readFileSync(targetPath, 'utf8'), {
  sourceType: 'unambiguous',
})
traverse(ast, {
  BlockStatement(path, state) {
    const index = path.node.body.findIndex(item => {
      return types.isReturnStatement(item)
    })
    path.node.body.splice(index, 0, tmpl)
  }
})
const { code, map } = generate(ast)
console.log(code)