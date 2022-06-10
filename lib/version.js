const path = require('path')
const pkg = require(path.join(__dirname, '../package.json'))
const pacote = require('pacote')
const ora = require('ora')
const semverDiff = require('semver-diff')
const chalk = require('chalk')

const getLocalVersion = () => {
  return pkg.version
}

// todo: 检测私密源是否可用
const getRemoteVersion = async () => {
  let parsed
  try {
    parsed = await pacote.manifest('fu-node-cli')
  } catch (e) {

  }
  return parsed.version
}

const compareVersion = async () => {
  const spinner = ora('正在检查cli版本').start();
  const local = getLocalVersion()
  const remote = await getRemoteVersion()
  let text 
  if (semverDiff(local, remote)) {
    text = chalk.red(`发现新版本，请手动更新到最新版本: ${remote}`)
  } else {
    text = chalk.green(`暂无发现更新`)
  }
  console.log('', '当前版本: ', local, ' ', '最新版本: ', remote)
  spinner.succeed(`fu-node-cli版本检查完毕${text}`)
  
}

module.exports = {
  getLocalVersion,
  getRemoteVersion,
  compareVersion
}
