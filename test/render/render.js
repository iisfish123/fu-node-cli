const ejs = require('ejs')
const fs = require('fs')
const path = require('path')

const renderOption = {
  projectName: 'lkz'
}
// console.log(path.resolve(__filename, '/template.js'))
const targetPath = [path.join(__dirname, '/template.js')]
for(let i of targetPath) {
  const js = ejs.render(fs.readFileSync(i, 'utf8'), renderOption)
  fs.writeFileSync(i, js.toString(), 'utf8')
  // console.log(js)
}

