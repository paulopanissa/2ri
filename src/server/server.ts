import * as restify from 'restify'
import * as fs from 'fs'
import * as mongoose from 'mongoose'
const env = require('../config/env/env')()
import { Router, mergePatchBodyParser, errorHandler, tokenParser } from '../config';

export class Server {

    app: restify.Server

    initializeDb(): mongoose.MongooseThenable {
        (<any>mongoose).Promise = global.Promise
        return mongoose.connect(env.db.url, {
            useMongoClient: true
        })
    }

    initRoutes(routers: Router[]): Promise<any>{
        return new Promise((resolve, reject)=>{
            try {

                const options: restify.ServerOptions = {
                    name: 'registro-api',
                    version: '1.0.0',
                }

                if(env.security.enabledHTTPS) {
                    options.certificate = fs.readFileSync(env.security.certificate)
                    options.key = fs.readFileSync(env.security.key)
                }

                this.app = restify.createServer(options)
                
                this.app.use(restify.plugins.queryParser())
                this.app.use(restify.plugins.bodyParser())
                this.app.use(mergePatchBodyParser)
                this.app.use(tokenParser)
                
                // Routes
                for (let router of routers) {
                    router.applyRoutes(this.app)
                }

                this.app.listen(env.server.port, ()=>{
                    resolve(this.app)
                })
                
                this.app.on('restifyError', errorHandler)

            } catch(error) {
                reject(error)
            }
        })
    }

    bootstrap(routers: Router[] = []): Promise<Server>{
        return this.initializeDb().then(() => 
               this.initRoutes(routers).then(() => this))
    }

    shutdown(){
        return mongoose.disconnect().then(()=>this.app.close())
    }
}
