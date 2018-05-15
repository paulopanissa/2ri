import * as restify from 'restify'
import { Router } from '../../config'
import { authenticate } from '../../config'


class AuthRouter extends Router {

    applyRoutes(app: restify.Server) {
        app.post('/api/authenticate', authenticate)
    }
}

export const authRouter = new AuthRouter()
