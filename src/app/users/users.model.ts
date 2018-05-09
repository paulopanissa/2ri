import * as mongoose from 'mongoose'
import * as bcrypt from 'bcrypt'
const env    = require('../../config/env/env')()
import { validateCPF } from '../../config'

export interface Phones extends mongoose.Document {
    type: string,
    number: string,
    whast_app: boolean
}

export interface User extends mongoose.Document {
    username: string,
    email: string,
    password: string,
    first_name: string,
    last_name: string,
    full_name: string,
    photo?: string,
    office?: string,
    gender?: string,
    cpf?: string,
    ramal?: string,
    phones?: Phones[],
    matches(password:string):boolean,
    hasAny(...profiles: string[]): boolean // hasAny(['admin', 'user'])
}

export interface UserModel extends mongoose.Model<User> {
    findByEmail(email: string, projection?: string): Promise<User>
}

const phoneSchema = new mongoose.Schema({
    type: {
        type: String,
        required: true,
        select: true,
        enum: ['FIXO', 'CELULAR']
    },
    number: {
        type: String,
        require: true
    },
    whast_app: {
        type: Boolean,
        required: false
    }
})

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        unique: true,
        required: true,
        maxlength: 40,
        minlength: 3
    },
    email: {
        type: String,
        unique: true,
        match: /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
        required: true        
    },
    password: { 
        type: String,
        select: false,
        required: true
    },
    first_name: {
        type: String,
        required: true
    },
    last_name: {
        type: String,
        required: true
    },
    full_name: {
        type: String,
        required: true,
        uppercase: true
    },
    photo: {
        type: String,
        required: false
    },
    office: {
        type: String,
        required: false
    },
    gender: {
        type: String,
        required: false,
        enum: ['Masculino', 'Feminino', 'Indefinido']
    },
    cpf: {
        type: String,
        required: false,
        validate: {
            validator: validateCPF,
            message: '{PATH}: Invalid CPF ({VALUE})'
        }
    },
    profiles: {
        type: [String],
        required: false
    },
    ramal: {
        type: String,
        required: false
    },
    phones: {
        type: [phoneSchema],
        required: false,
        select: true,
        default: []
    },
    createdAt: {
        type: Date,
        required: true,
        default: Date.now
    },
    updatedAt: {
        type: Date,
        required: true,
        default: Date.now
    }
})

// find to email
userSchema.statics.findByEmail = function(email:string, projection: string) {
    return this.findOne({email}, projection)
}
userSchema.methods.matches = function(password: string): boolean {
    return bcrypt.compareSync(password, this.password)
}

userSchema.methods.hasAny = function(...profiles: string[]) : boolean {
    return profiles.some(profile => this.profiles.indexOf(profile) !== -1)
}

const hashPassword = (obj, next)=>{
    bcrypt.hash(obj.password, env.security.saltRounds)
        .then(hash=>{
            obj.password = hash
            next()
        }).catch(next)
}

const saveMiddleware = function (next){
    const user: User = this
    if(!user.isModified('password')){
        next()
    }else{
        hashPassword(user, next)
    }
}

const updateMiddleware = function(next) {
    this.getUpdate().updatedAt = Date.now()
    if(!this.getUpdate().password) {
        next()
    }else{
        hashPassword(this.getUpdate(), next)
    }
}

// new user bcrypt Password
userSchema.pre('save', saveMiddleware)
// findOneAndUpdate check change password -> bcrypt
userSchema.pre('findOneAndUpdate', updateMiddleware)
// update check change password -> bcrypt
userSchema.pre('update', updateMiddleware)


export const User = mongoose.model<User, UserModel>('User', userSchema)
