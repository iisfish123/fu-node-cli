const path = require('path')
const fs = require('fs')
const ejs = require('ejs')
// const buffer = require('')

const tmplPath = path.join(__dirname, `../../tmpl/sonar`)
const root = process.cwd()

/**
 * rcName: .npmrc获取的key值
 * token: 对应ejs模版的字段名
 */
const fields = [
  { field: 'token', rcName: 'fu-sonar-token' },
  { field: 'server', rcName: 'fu-sonar-server-host' }
]

/**
 * 拿到.npmrc配置文件设置的token
 * params: fu-sonar-server-host
 * params: fu-sonar-token
 * @returns token
 */
function getNpmrc() {
  const { execSync } = require('child_process')
  const result = execSync('npm config list', { encoding: 'utf8' })
  const bufArr = result.split('\n')
  const bufItem = bufArr
    .map(item => {
      const split = item.split('=')
      const rcKey = String(split[0]).replace(/\s*/g, "")
      const rcKeys = fields.map(v => v.rcName)
      if (rcKey && rcKeys.includes(rcKey)) {
        return {
          [fields.find(value => value.rcName === rcKey).field]: item.match(/"([^"]*)"/)[1]
        }
      }
    })
    .filter(item => item)
    .reduce((curr, last) => {
      return { ...last, ...curr}
    }, {})
  return bufItem
}

/**
 * 命令行交互
 * @returns token
 */
async function getProjectKey () {
  const inquirer = require('inquirer')
  const { action } = await inquirer.prompt([
    {
      name: 'action',
      type: 'input',
      message: `请输入projectKey(如测试项目: Fuse-Test)`
    }
  ])
  if (!action) {
    process.exit(1)
  }
  return action
}

/**
 * 
 * @returns 模版引擎数据
 */
async function getData() {
  const projectKey = await getProjectKey()
  return { projectKey, ...getNpmrc() }
}

/**
 * 工具函数
 * @param {filePath} tmpl 
 * @param {object} data 
 * @returns 
 */
function renderSync(tmpl, data) {
  return new Promise(resolve => {
    ejs.renderFile(tmpl, data, (err, res) => {
      if (err) console.log(err)
      resolve(res)
    })
  })
}

/**
 * 处理模版，并且复制到 process.cwd()的目录下，也就是需要初始化sonar配置的业务工程根目录下
 */
async function tmplHandle() {
  const arr = ['sonar-project.properties', 'report.json', 'sonarqube_formatter.js']
  const data = await getData()
  for (let i = 0; i < arr.length; i++) {
    const tmpl = path.join(tmplPath, `${arr[i]}`)
    const str = await renderSync(tmpl, data)
    const outputPath = path.join(root, `/${arr[i]}`)
    fs.writeFileSync(outputPath, str)
  }
}
// tmplHandle()


function packageHandle() {
  const prettier = require('prettier')
  const jsonPath = path.join(root, '/package.json')
  const json = require(jsonPath)
  json.scripts.lintTo="eslint --ext .js,.vue src -f ./sonarqube_formatter.js -o report.json || true"
  json.scripts.sonar="npm run lintTo && sonar-scanner"
  // 将 JSON 对象转为字符串并格式化
  const jsonStr = prettier.format(JSON.stringify(json), { parser: 'json' })
  fs.writeFileSync(path.join(root, 'package.json'), jsonStr)
}
// packageHandle()


/**
 * 自动安装npm 包
 * @returns 自动退出
 */
function autoInstall() {
  return new Promise((resolve, reject) => {
    const { exec } = require('child_process')
    const ora = require('ora')
    const chalk = require('chalk')
    const spinner = ora(chalk.blue('正在安装sonar依赖包...')).start()
    const install = exec('npm install -D sonarqube-scanner@^3.0.1')
    install.stdout.on('data', (data) => {
      // console.log(`stdout: ${data}`)
    })
    install.stderr.on('data', (data) => {
      spinner.fail(chalk.red('npm install -D sonarqube-scanner@^3.0.1 安装失败，请手动安装'))
      console.error(`error: ${data}`)
      reject()
    })
    install.on('close', (code) => {
      console.log(`child process exited with code ${code}`)
      spinner.succeed(chalk.green('依赖包安装完成！'))
      resolve()
      process.exit(0)
    })
  })
}

/**
 * 修改gitIgonre文件
 */
async function gitIgonre() {
  const ignore = path.join(root, '/.gitignore')
  fs.readFile(ignore, (err, data) => {
    if (err) throw err
    const str = data.toString() + '\n' + '.scannerwork/'
    fs.writeFile(ignore, str, (error) => {
      if (error) throw error
    })
  })
}

async function init() {
  gitIgonre()
  await tmplHandle()
  await packageHandle()
  await autoInstall()
}

init()
