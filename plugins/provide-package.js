const fs = require('fs')
const path = require('path')
const root = process.cwd()

module.exports = (options) => {
  const { db, aggregate, redis } = options
  const file = `${options.name}/package.json`
  const targetPath = path.join(root, file)
  const obj = JSON.parse(fs.readFileSync(targetPath, 'utf8'))
  // console.log(JSON.parse(json).dependencies)
}