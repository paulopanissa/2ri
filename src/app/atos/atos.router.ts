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
        app.post(`${this.basePath}`, this.atoStore)
    }

    atoStore = (req, res, next) => {
        console.log(req.body)
    }
}

export const atosRouter = new AtosRouter()
