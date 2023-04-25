#!/usr/bin/env node

const {getRemoteVersion, getLocalVersion, compareVersion} = require('../lib/version')
const { Command } = require('commander')
const program = new Command()


// compareVersion()
// process.exit(1)

program
  .version(getLocalVersion())
  .usage('<command> [options]')

// todo: action
program
  .command('init <project-name>')
  .alias('-i')
  .description('创建一个新项目')
  .option('-d, --default', 'default config')
  .action(async (name, options) => {
    // 获取远程模板，并且获得命令行选项
    const createResult = await require('../lib/create')(name, options)

    // ejs.render()
    const render = await require('../lib/render')(name, options)
    // console.log(createResult)

    // 进入胶水层
    // require('../plugins/provide-config')({ name, ...createResult })
    // require('../plugins/provide-plugin')({ name, ...createResult })
    require('../plugins/provide-package')({ name, ...createResult })
    
  })

program
  .command('check')
  .description('检测cli版本')
  .option('-d, --default', 'default config')
  .action(async (name, options) => {
    compareVersion()
  })

program
  .command('add <router-name>')
  .alias('-a')
  .description('创建一个egg新路由')
  .action(async (name, options) => {
    require('../lib/add')(name)
    // console.log(name, options)
  })

program
  .command('sonar')
  .alias('-s')
  .description('初始化Sonar配置')
  .action(async (name, options) => {
    require('../core/sonar/index')
  })

program.parse()
