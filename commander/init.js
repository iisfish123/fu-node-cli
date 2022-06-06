const commandList = [
  require('./init'), // init create node-server
  // require('./version'), // get version
  // require('./run'), // run bff-service
]
exports.register = (program) => {
  commandList.forEach((command) => {
    command.register(program)
  })
}