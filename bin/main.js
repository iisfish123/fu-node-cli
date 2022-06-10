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
    require('../lib/create')(name, options)
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
    require('../lib/add')
    // console.log(name, options)
    // compareVersion()
  })

program.parse()

// compareVersion()