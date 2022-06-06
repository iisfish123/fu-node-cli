#!/usr/bin/env node



console.log(123321)
console.log(process.version)
const commands = require('../commander/version')

commands.getRemote()