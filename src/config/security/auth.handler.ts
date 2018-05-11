import * as restify from "restify";
import * as jwt from 'jsonwebtoken';
import * as ms from 'millisecond'
import { User } from "../../app/users";
import {NotAuthorizedError} from "restify-errors";

const env = require('../env/env')()

export const authenticate: restify.RequestHandler = (req, res, next) => {
    const { email, password, remember } = req.body
    console.log(remember)
    User.findByEmail(email, '+password') //
        .then(user => {
            if (user && user.matches(password)){
                if(!user.is_active){
                    return next(new NotAuthorizedError("User is not active."))
                }else {
                    let expiredAt = remember ? ms('365 days') : ms('8 hours') ;
                    const token = jwt.sign({
                        exp: expiredAt,
                        sub: user.email, 
                        iss: 'registro-api'}, 
                        env.security.apiToken)

                    res.json({
                        name: user.full_name,
                        first_name: user.first_name,
                        last_name: user.last_name,
                        email: user.email,
                        photo: user.photo || null,
                        accessToken: token
                    })
                    return next(false)
                }
            } else {
                return next(new NotAuthorizedError("Invalid Credentials"))
            }
        }).catch(next)
}