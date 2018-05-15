import * as mongoose from "mongoose";
import { PJRepresentante, pjrepSchema} from "./PJRepresentante";
import {validateCNPJ} from "../../../config";

export interface PJ extends mongoose.Document {
    razao_social: string,
    cnpj: string,
    nire: string,
    junta_uf: string,
    endereco: string,
    numero: string,
    complemento?: string,
    bairro: string,
    cidade: string,
    uf: string,
    cep: string,
    clausula_adm?: string,
    ultima_alt?: string,
    data_emissao?: Date,
    data_registro?: Date,
    num_registro?: string,
    representantes?: [PJRepresentante]
}

export const pjSchema = new mongoose.Schema({
    razao_social: {
        type: String,
        required: true,
        uppercase: true
    },
    cnpj: {
        type: String,
        required: true,
        validate: {
            validator: validateCNPJ,
            message: '{PATH}: Invalid CNPJ ({VALUE})'
        }
    },
    nire: {
        type: String,
        required: false
    },
    junta_uf: {
        type: String,
        required: false,
        uppercase: true
    },
    endereco: {
        type: String,
        required: false
    },
    numero: {
        type: String,
        required: false
    },
    complemento: {
        type: String,
        required: false
    },
    bairro: {
        type: String,
        required: false
    },
    cidade: {
        type: String,
        required: false
    },
    uf: {
        type: String,
        required: false
    },
    cep: {
        type: String,
        required: false
    },
    clausula_adm: {
        type: String,
        required: false
    },
    ultima_alt: {
        type: String,
        required: false
    },
    data_emissao: {
        type: Date,
        required: false
    },
    data_registro: {
        type: Date,
        required: false
    },
    num_registro: {
        type: String,
        required: false
    },
    representantes: {
        type: [pjrepSchema],
        required: false
    }
})
