import * as mongoose from 'mongoose'
const env    = require('../../config/env/env')()
import { validateCPF, saveMiddleware, updateMiddleware } from '../../config'

export interface Phones extends mongoose.Document {
    type: string,
    number: string,
    isWhastapp: boolean
}

export interface User extends mongoose.Document {
    username: string,
    email: string,
    password: string,
    firstName: string,
    lastName: string,
    fullName: string,
    office?: string,
    gender?: string,
    cpf?: string,
    phones?: Phones[],
    ramal?: string
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
    whastapp: {
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
    firstName: {
        type: String,
        required: true
    },
    lastName: {
        type: String,
        required: true
    },
    fullName: {
        type: String,
        required: true,
        uppercase: true
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
    phones: {
        type: [phoneSchema],
        required: false,
        select: true,
        default: []
    },
    ramal: {
        type: String,
        required: false
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


userSchema.pre('save', saveMiddleware)
userSchema.pre('findOneAndUpdate', updateMiddleware)
userSchema.pre('update', updateMiddleware)


export const User = mongoose.model<User>('User', userSchema)
