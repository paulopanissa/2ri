import * as bcrypt from 'bcrypt'
const env = require('../env/env')()

export const hassPassword = (obj, next) => {
    bcrypt.hash(obj.password, env.security.saltRounds)
              .then(hash => {
                obj.password = hash
                  next()
              })
              .catch(next)
}

export const saveMiddleware = function (next) {
    const user = this
    if(user.isModified('password')){ 
        next()
    }else {
        hassPassword(user, next)
    }
}

export const updateMiddleware = function(next) {
    this.getUpdate().updatedAt = Date.now()
    if(!this.getUpdate().password) {
        next()
    }else{
        hassPassword(this.getUpdate(), next)
    }
}