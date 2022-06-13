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
    const createResult = await require('../lib/create')(name, options)
    const render = require('../lib/render')(name, options)
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
  // .option('-name', 'separator character', 'test')
  .action(async (name, options) => {
    require('../lib/add')(name)
    // console.log(name, options)
  })

program.parse()

// compareVersion()