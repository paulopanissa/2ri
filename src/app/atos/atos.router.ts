import * as restify from 'restify';
import { NotFoundError } from 'restify-errors';
import { Model, authorize } from '../../config';
import { Ato } from './atos.model'

class AtosRouter extends Model<Ato> {

    constructor() {
        super(Ato)
    }

    applyRoutes(app: restify.Server) {
        app.get(`${this.basePath}`, this.findAll)
        app.post(`${this.basePath}`, this.store)
    }

    storeTest = (req, res, next) => {
        console.log(req.body)
        res.json(req.body)
        return next()
    }

}

export const atosRouter = new AtosRouter()
