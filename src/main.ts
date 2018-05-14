import { Server } from './server/server';
import { mainRouter, authRouter, userRouter, atosRouter } from './app';
const env = require('./config/env/env')()

const server = new Server()

server
.bootstrap([
    mainRouter,
    authRouter,
    userRouter,
    atosRouter
])
.then(server => {
    if(process.env.NODE_ENV === 'development'){
        const port = process.env.SERVER_PORT || env.server.port
        console.log(`Server is running in: http://localhost:${port}`)
    }else {
        console.log('Server is listening on: ', server.app.address())
    }    
})
.catch(error => {
    console.log('Server failed to start')
    console.log(error)
    process.exit(1)
})
