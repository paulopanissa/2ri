import {Router} from '../../config'
import * as restify from 'restify'

class MainRouter extends Router {
  applyRoutes(app: restify.Server) {
    app.get('/', (req, res, next)=>{
      res.json({
        users: '/api/users'
        })
    })
  }
}

export const mainRouter = new MainRouter()
