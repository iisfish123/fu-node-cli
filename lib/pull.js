const download = require('download-git-repo')
const ora = require('ora')
const chalk = require('chalk')

// todo: github template
module.exports = (path) => {
  return new Promise((resolve, reject) => {
    const spinner = ora(chalk.blue('正在拉取模板...')).start()
    download('direct:https://github.com/iisfish123/cli-template#main', path, {clone: true},  (err) => {
      if (err) {
        // console.log(err)
        spinner.fail(chalk.red('网络问题，请重新拉取'))
        reject()
        return 
      }
      spinner.succeed(chalk.green('模板拉取完成！'))
      resolve()
    })
  }) 
}