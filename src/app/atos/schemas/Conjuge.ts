import * as mongoose from "mongoose";
import {validateCPF} from "../../../config";

export interface Conjuge extends mongoose.Document {
    nome: string,
    genero?: string, // Masculino ou Feminino
    nacionalidade?: string,
    profissao?: string,
    u_cnh?: boolean, // se está utilizando a CNH
    cnh_form?: string,
    cnh_reg?: string,
    cnh_uf?: string,
    rg?: string,
    rg_org?: string,
    rg_uf?: string,
    cpf?: string,
}

export const conjugeSchema = new mongoose.Schema({
    nome: {
        type: String,
        required: true,
        uppercase: true
    },
    genero: {
        type: String,
        required: false,
        enum: ["Masculino", "Feminino"]
    },
    nacionalidade: {
        type: String,
        required: false
    },
    profissao: {
        type: String,
        required: false
    },
    u_cnh: {
        type: Boolean,
        required: false
    },
    cnh_form: {
        type: String,
        required: false
    },
    cnh_reg: {
        type: String,
        required: false
    },
    cnh_uf: {
        type: String,
        required: false
    },
    rg: {
        type: String,
        required: false
    },
    rg_uf: {
        type: String,
        required: false
    },
    cpf: {
        type: String,
        required: false,
        validate: {
            validator: validateCPF,
            message: '{PATH}: Invalid CPF ({VALUE})'
        }
    }
})