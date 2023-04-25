const ejs = require('ejs')
const fs = require('fs')
const path = require('path')
const { fileDisplay } = require('../utils/traverse')

// ejs.render()
module.exports = (name, options) => {
  const fileList = fileDisplay(path.join(process.cwd(), `/${name}`))
  const templateOption = { projectName: name, ...options }
  fileList.forEach(async item => {
    const str = await ejs.renderFile(item, templateOption) // return Promie.resolve()
    fs.writeFileSync(item, str)
  })
}
