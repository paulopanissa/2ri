import * as mongoose from "mongoose";
import {Conjuge, conjugeSchema} from "./Conjuge";
import {validateCPF} from "../../../config";

export interface PF extends mongoose.Document {
    nome: string,
    genero: string, // Masculino ou Feminino
    nacionalidade: string,
    estado_civil: string,
    profissao: string,
    rc?: string,
    rc_cub_ant?: boolean,
    pacto_cartorio?: string,
    pacto_data?: string,
    pacto_livro?: string,
    pacto_folhas?: string,
    pacto_reg_num?: string,
    pacto_reg_cri?: string,
    pacto_reg_cidade?: string,
    pacto_reg_uf?: string,
    cj_sign?: boolean,
    conjuge: [Conjuge]
    u_cnh?: boolean, // se está utilizando a CNH
    cnh_form?: string,
    cnh_reg?: string,
    cnh_uf?: string,
    rg: string,
    rg_uf: string,
    cpf: string,
    endereco: string,
    numero: string,
    complemento?: string,
    bairro: string,
    cidade: string,
    uf: string,
    cep?: string,
    email?: string,
    telefone?: string
}

export const pfSchema = new mongoose.Schema({
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
    estado_civil: {
        type: String,
        required: false
    },
    profissao: {
        type: String,
        required: false
    },
    rc: {
        type: String,
        required: false
    },
    rc_cub_ant: {
        type: Boolean,
        required: false
    },
    pacto_cartorio: {
        type: String,
        required: false
    },
    pacto_data: {
        type: String,
        required: false
    },
    pacto_livro: {
        type: String,
        required: false
    },
    pacto_folhas: {
        type: String,
        required: false
    },
    pacto_reg_num: {
        type: String,
        required: false
    },
    pacto_reg_cri: {
        type: String,
        required: false
    },
    pacto_reg_cidade: {
        type: String,
        required: false
    },
    pacto_reg_uf: {
        type: String,
        required: false
    },
    cj_sign: {
        type: Boolean,
        required: false
    },
    conjuge: {
        type: [conjugeSchema],
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
        required: true,
        validate: {
            validator: validateCPF,
            message: '{PATH}: Invalid CPF ({VALUE})'
        }
    },
    endereco: {
        type: String,
        required: true
    },
    numero: {
        type: String,
        required: true
    },
    complemento: {
        type: String,
        required: false
    },
    bairro: {
        type: String,
        required: true
    },
    cidade: {
        type: String,
        required: true
    },
    uf: {
        type: String,
        required: true
    },
    cep: {
        type: String,
        required: false
    },
    email: {
        type: [String],
        match: /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
        required: false
    },
    telefone: {
        type: [String],
        required: false
    }
})