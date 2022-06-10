const fs = require('fs')
const download = require('download-git-repo')
const { traverse } = require('../../utils/traverse')
const inquirer = require('inquirer')
const chalk = require('chalk')
const extra = require('fs-extra')

const downloadAsync = async () => {
  await new Promise((resolve, reject) => {
    download('direct:https://github.com/iisfish123/cli-template#main', 'src/', {clone: true},  (err) => {
      if (err) {
        console.log(err)
        reject()
        return 
      }
      resolve()
    })
  }) 
}

const getTmpl = async (targetPath) => {
  if (!isEmptyDir(targetPath)) {
    
  }
  const res = await downloadAsync()
  // const targetPath = `${process.cwd()}/src`
  // traverse(targetPath)
}

const isEmptyDir = async (targetPath) => {
  if (fs.existsSync(targetPath)) {
    const { action } = await inquirer.prompt([
      {
        name: 'action',
        type: 'list',
        message: `目录 ${chalk.cyan(targetPath)} 已存在. 请选择以下动作:`,
        choices: [
          { name: 'Overwrite', value: 'overwrite' },
          { name: 'Cancel', value: false }
        ]
      }
    ])
    // console.log(action)
    if (!action) {
      process.exit(1)
      return 
    } 
    await extra.remove(targetPath)
  }
}

const projectName = 'offlineupdate'
const targetPath = `${process.cwd()}/${projectName}`

// console.log(isEmptyDir(targetPath))
// tmpl(targetPath)
isEmptyDir(targetPath)




