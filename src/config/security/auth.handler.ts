import * as restify from "restify";
import * as jwt from 'jsonwebtoken';
import { User } from "../../app/users";
import {NotAuthorizedError} from "restify-errors";
const env = require('../env/env')()

export const authenticate: restify.RequestHandler = (req, res, next) => {
    const { email, password } = req.body
    User.findByEmail(email, '+password') //
        .then(user => {
            if (user && user.matches(password)){
                const token = jwt.sign({sub: user.email, iss: 'registro-api'}, env.security.apiToken)
                res.json({
                    name: user.full_name,
                    email: user.email,
                    photo: user.photo || null,
                    accessToken: token
                })
                return next(false)
            } else {
                return next(new NotAuthorizedError("Invalid Credentials"))
            }
        }).catch(next)
}