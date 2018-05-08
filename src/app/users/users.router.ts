import * as restify from 'restify';
import { NotFoundError } from 'restify-errors';
import { Model } from '../../config';
import { User } from './users.model'

class UserRouter extends Model<User> {

    constructor() {
        super(User)
        this.on('beforeRender', document => {
            document.password = undefined
        })
    }    

    applyRoutes(app: restify.Server) {

        app.get('/api/users', this.findAll)
        app.get('/api/users/:id', [this.validadeId, this.findById])
        app.post('/api/users', this.store)
        app.put('/api/users/:id', [this.validadeId, this.replace])
        app.patch('/api/users/:id', [this.validadeId, this.update])
        app.del('/api/users/:id', [this.validadeId, this.delete])

        app.get('/api/users/:id/phones', [this.validadeId, this.findPhones])
        app.post('/api/users/:id/phones', [this.validadeId, this.createPhone])
        app.put('/api/users/:id/phones', [this.validadeId, this.replacePhone])
    }

    
    findByEmail = (req, res, next) => {
        if(req.query.email) {
            User.find({email: req.query.email})
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
