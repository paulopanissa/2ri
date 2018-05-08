import { Server } from './server/server';
import { authRouter, userRouter } from './app';

const server = new Server()

server
.bootstrap([
    authRouter,
    userRouter
])
.then(server => {
    console.log('Server is listening on: ', server.app.address())
})
.catch(error => {
    console.log('Server failed to start')
    console.log(error)
    process.exit(1)
})
