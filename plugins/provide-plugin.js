const parser = require('@babel/parser');
const traverse = require('@babel/traverse').default;
const generate = require('@babel/generator').default;
const types = require('@babel/types');
const template = require('@babel/template').default;
const ejs = require('ejs')
const fs = require('fs')
const path = require('path')
const root = process.cwd()

const redisTmpl = `
exports.redis = {
  enable: true,
  package: 'egg-redis',
}
`
const mongodbTmpl = `
exports.mongoose = {
  enable: true,
  package: 'egg-mongoose',
}
`

module.exports = (options) => {
  const { db, aggregate, redis } = options
  const file = `${options.name}/config/plugin.js`
  const targetPath = path.join(root, file)
  const tmplArr = []
  if (db === 1) {
    tmplArr.push(template(ejs.render(mongodbTmpl, { aggregate }))({}))
  }
  if (redis) {
    tmplArr.push(template(redisTmpl)({}))
  }

  const ast = parser.parse(fs.readFileSync(targetPath, 'utf8'), {
    sourceType: 'unambiguous',
  })
  traverse(ast, {
    Program(path, state) {
      // console.log(path.node.body)
      const index = path.node.body.push(...tmplArr)
    }
  })
  const { code, map } = generate(ast)
  // console.log('--------------------', code)
  fs.writeFileSync(targetPath, code)
}