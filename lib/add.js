const { transformFromAstSync } = require('@babel/core')
const  parser = require('@babel/parser')
const insertPlugin = require('../plugins/insert-router-plugin')
const fs = require('fs')
const path = require('path')

const sourceCode = fs.readFileSync(path.join(process.cwd(), '/app/router.js'), {
    encoding: 'utf-8'
})

const ast = parser.parse(sourceCode, {
    sourceType: 'unambiguous'
})

const { code } = transformFromAstSync(ast, sourceCode, {
    plugins: [[insertPlugin, {
        trackerPath: 'tracker'
    }]]
})



// console.log(code)

