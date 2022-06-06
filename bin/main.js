#!/usr/bin/env node

const {getRemoteVersion, getLocalVersion, compareVersion} = require('../commander/version')
const { Command } = require('commander')
const program = new Command()

program
  .version(getLocalVersion())
  .usage('<command> [options]')

// todo: action
program
  .command('init <project-name>')
  .alias('-i')
  .description('创建一个新项目')
  .option('-s, --separator <char>', 'separator character', 'test')
  .action((name, options) => {
    console.log(name, options)
  })

program
  .command('add <router-name>')
  .alias('-a')
  .description('创建一个egg新路由')
  .option('-name', 'separator character', 'test')
  .action((name, options) => {
    console.log(name, options)
  })

program.parse()

// compareVersion()