let extension: string = 'ts'
let node_env: string = process.env.NODE_ENV ? process.env.NODE_ENV : 'development'

if ( node_env === 'production') {
        extension = 'js'
}

module.exports = () => require(`../env/env.${node_env}.${extension}`)