const fs = require('fs')
const inquirer = require('inquirer')
const chalk = require('chalk')
const extra = require('fs-extra')

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
    if (!action) {
      process.exit(1)
      return 
    } 
    await extra.remove(targetPath)
  }
}


const create = async (projectName, options) => {
  const targetPath = `${process.cwd()}/${projectName}`
  await isEmptyDir(targetPath)
  console.log(chalk.gray(''))
  await require('./pull')(targetPath)
  // return Promise.resolve()
}

module.exports = (...args) => {
  return create(...args).then(() => {
    return true
  }).catch(err => {
    // stopSpinner(false) // do not persist
    // error(err)
    // if (!process.env.VUE_CLI_TEST) {
    //   process.exit(1)
    // }
  })
}






