import * as restify from 'restify'
import * as mongoose from 'mongoose'
const env = require('../config/env/env')()
import { Router, mergePatchBodyParser, errorHandler } from '../config';


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
                console.log(env)
                this.app = restify.createServer({
                    name: 'registro-api',
                    version: '1.0.0'
                })
                
                this.app.use(restify.plugins.queryParser())
                this.app.use(restify.plugins.bodyParser())
                this.app.use(mergePatchBodyParser)
                
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
}
