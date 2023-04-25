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
config.redis = {
  client: {
    port: 6379,          // Redis port
    host: '127.0.0.1',   // Redis host
    password: 'auth',
    db: 0
  },
}
`
const mongodbTmpl = `
  // MongoDB 数据库
  exports.mongoose = {
    client: {
      url: 'mongodb://localhost:27017/<%= aggregate %>',
      options: {
        // user: 'root',
        // pass: '123456',
        useCreateIndex: true,
        useNewUrlParser: true,
        useFindAndModify: false,
        useUnifiedTopology: true,
      },
    },
  }
`

module.exports = (options) => {
  const { db, aggregate, redis } = options
  const file = `${options.name}/config/config.default.js`
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
    BlockStatement(path, state) {
      const index = path.node.body.findIndex(item => {
        return types.isReturnStatement(item)
      })
      path.node.body.splice(index, 0, ...tmplArr)
    }
  })
  const { code, map } = generate(ast)
  // console.log('----------------this is config', code, targetPath)
  fs.writeFileSync(targetPath, code)
}