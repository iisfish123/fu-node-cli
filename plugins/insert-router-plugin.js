const { declare } = require('@babel/helper-plugin-utils')
const importModule = require('@babel/helper-module-imports')
const template = require('@babel/template').default


const insertPlugin = declare((api, options, dirname) => {
    api.assertVersion(7)

    return {
        visitor: {
            Program: {
                enter (path, state) {
                    // path.traverse({
                    //     ImportDeclaration (curPath) {
                    //         const requirePath = curPath.get('source').node.value
                    //         if (requirePath === options.trackerPath) {
                    //             const specifierPath = curPath.get('specifiers.0')
                    //             if (specifierPath.isImportSpecifier()) {
                    //                 state.trackerImportId = specifierPath.toString()
                    //             } else if(specifierPath.isImportNamespaceSpecifier()) {
                    //                 state.trackerImportId = specifierPath.get('local').toString()
                    //             }
                    //             path.stop()
                    //         }
                    //     }
                    // })
                    // if (!state.trackerImportId) {
                    //     state.trackerImportId  = importModule.addDefault(path, 'tracker',{
                    //         nameHint: path.scope.generateUid('tracker')
                    //     }).name
                    //     state.trackerAST = api.template.statement(`${state.trackerImportId}()`)()
                    // }
                }
            },
            'ClassMethod|ArrowFunctionExpression|FunctionExpression|FunctionDeclaration'(path, state) {
                const bodyPath = path.get('body')
                if (bodyPath.isBlockStatement()) {
                    const routerTemplate = template(`router.get('/${options.name}/index.json', controller.${options.name}.index)`)({})
                    bodyPath.node.body.push(routerTemplate)
                } else {
                    // const ast = api.template.statement(`{${state.trackerImportId}()return PREV_BODY}`)({PREV_BODY: bodyPath.node})
                    // bodyPath.replaceWith(ast)
                }
            }
        }
    }
})
module.exports = insertPlugin
