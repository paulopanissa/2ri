import * as restify from 'restify';
import { NotFoundError } from 'restify-errors';
import { Model, authorize } from '../../config';
import { User } from './users.model'

class UserRouter extends Model<User> {

    pageSize = 20

    constructor() {
        super(User)
        this.on('beforeRender', document => {
            document.password = undefined
        })
    }

    envelope(document) {
        let resource = super.envelope(document)
        resource._links.phones = `${this.basePath}/${resource._id}/phones`
        return resource
    }

    applyRoutes(app: restify.Server) {

        app.get(`${this.basePath}`, [ 
            authorize('owner', 'oficial', 'substituto'),
            this.findByEmail,
            this.findAll])
        app.get(`${this.basePath}/:id`, [
            authorize('owner', 'oficial', 'substituto'),
            this.validadeId,
            this.findById])
        app.post(`${this.basePath}`, this.store)
        app.put(`${this.basePath}/:id`, [this.validadeId, this.replace])
        app.patch(`${this.basePath}/:id`, [this.validadeId, this.update])
        app.del(`${this.basePath}/:id`, [this.validadeId, this.delete])
        app.get(`${this.basePath}/:id/phones`, [this.validadeId, this.findPhones])
        app.put(`${this.basePath}/:id/phones`, [this.validadeId, this.replacePhone])


    }

    
    findByEmail = (req, res, next) => {
        if(req.query.email) {
            let email = req.query.email
            User.findByEmail(email)
                .then(user => [user])
                .then(this.renderAll(res, next))
                .catch(next)
        }else {
            next()
        }
    }

    findPhones = (req, res, next) => {
        User.findById(req.params.id, "+phones")
            .then(rest => {
                if(!rest) {
                    throw new NotFoundError("Telefone(s) não encontrado")
                }
                else {
                    res.json(rest.phones)
                    return next()
                }
            })
    }

    createPhone = (req, res, next) => {
        let options = { new: true }
        User.findByIdAndUpdate(
            {_id: req.params.id},
            { $push: { phones: req.body}}, options)
            .then(rest => {
                if(!rest){
                    throw new NotFoundError("Telefone(s) não encontrado")
                }else {
                    res.json(rest)
                    return next()
                }
            })
            .catch(next)
    }

    replacePhone = (req, res, next) => {
        User.findById(req.params.id, )
            .then(rest => {
                if(!rest){
                    throw new NotFoundError("Telefone(s) não encontrado")
                }else {
                    rest.phones = req.body
                    return rest.save()
                }
            })
            .then(rest => {
                res.json(rest.phones)
                return next()
            }).catch(next)
    }
}

export const userRouter = new UserRouter()
