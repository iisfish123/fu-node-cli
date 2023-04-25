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
    } 
    await extra.remove(targetPath)
  }
}

const selectDBModel = async () => {
  const { action } = await inquirer.prompt([
    {
      name: 'action',
      type: 'list',
      message: `请选择你数据库类型:`,
      choices: [
        { name: 'Mongodb', value: 1 },
        { name: 'Mysql', value: 2 }
      ]
    }
  ])
  return action
}

const selectDBAggregate = async () => {
  const { action } = await inquirer.prompt([
    {
      name: 'action',
      type: 'input',
      message: `请输入你数据库名（集合名）:`
    }
  ])
  if (!action) {
    console.log(`${chalk.red('')}`)
    await selectDBAggregate()
    return
  }
  return action
}

const selectRedis = async () => {
  const { action } = await inquirer.prompt([
    {
      name: 'action',
      type: 'confirm',
      message: `是否使用redis做缓存:`
    }
  ])
  return action
}

const create = async (projectName, options) => {
  const targetPath = `${process.cwd()}/${projectName}`

  // 判断目录，是否删除
  await isEmptyDir(targetPath)
  // // console.log(chalk.gray(''))

  await require('./pull')(targetPath)

  // 获取 db 选择
  const db = await selectDBModel() 

  // 获取 数据库集合 名称
  const aggregate = await selectDBAggregate() 
  // console.log(db, aggregate)

  const redis = await selectRedis() 
  
  return Promise.resolve({
    db,
    aggregate,
    redis
  })
}

module.exports = (...args) => {
  return create(...args)
}






