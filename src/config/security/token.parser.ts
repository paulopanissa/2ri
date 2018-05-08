import * as restify from 'restify'
import * as jwt from 'jsonwebtoken'
import { User } from "../../app/users";
const env = require('../env/env')()

export const tokenParser: restify.RequestHandler = (req, res, next) => {
    const token = extractToken(req)
    if(token) {
        jwt.verify(token, env.security.apiToken, applyBearer(req, next))
    } else {
        next()
    }
}

function extractToken(req: restify.Request){
    // Authorization: Bearer TOKEN(JWT)
    let token = undefined
    const authorization = req.header('authorization')
    if(authorization) {
        const parts: string[] = authorization.split(' ')
        if(parts.length === 2 && parts[0] === "Bearer"){
            token= parts[1]
        }
        return token
    }
}

function applyBearer(req: restify.Request, next): (error, decoded) => void  {
    return (error, decoded) => {
        if(decoded){
            User.findByEmail(decoded.sub)
                .then(user => {
                    if(user){
                        // associar user in request
                        req.authenticated = user
                        // Finalizar a Autenticação
                    }
                }).catch(next)
        } else {
            next()
        }
    }
}