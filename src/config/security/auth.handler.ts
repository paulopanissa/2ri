import * as restify from "restify";
import * as jwt from 'jsonwebtoken';
import { User } from "../../app/users";
import {NotAuthorizedError} from "restify-errors";
const env = require('../env/env')()

export const authenticate: restify.RequestHandler = (req, res, next) => {
    const { email, password } = req.body
    User.findByEmail(email, '+password') //
        .then(user => {
            console.log(user.matches(password))
            if (user && user.matches(password)){
                // gerar token
                const token = jwt.sign({sub: user.email, iss: 'registro-api'}, env.security.apiToken)
                res.json({
                    name: user.full_name,
                    email: user.email,
                    accessToken: token
                })
                return next(false)
            } else {
                return next(new NotAuthorizedError("Invalid Credentials"))
            }
        }).catch(next)
}