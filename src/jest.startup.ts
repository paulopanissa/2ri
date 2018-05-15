import * as jestCli from 'jest-cli'
import {authRouter, userRouter} from "./app";
import { User, Ato } from './app'
import {Server} from "./server/server";
const env = require('./config/env/env')()

let server: Server

const beforeAllTests = () => {
    env.db.url = process.env.DB_URL || 'mongodb://localhost/cayache-api-test'
    env.server.port = process.env.SERVER_PORT || 3001
    server = new Server()
    return server.bootstrap([authRouter, userRouter])
        .then(() => User.remove({}).exec())
        .then(() => Ato.remove({}).exec())
        .catch(console.error)
}

const afterAllTests = () => {
    return server.shutdown()
}

beforeAllTests()
    .then(() => jestCli.run())
    .then(() => afterAllTests())
    .catch(console.error)