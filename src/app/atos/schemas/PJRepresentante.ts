import * as mongoose from "mongoose";

export interface PJRepresentante extends mongoose.Document {
    tipo: string, // Administrador / Diretor Administratito, Socio Cotista(Quotista), Administrador Não Sócio
    nome: string,
    genero: string, // Masculino ou Feminino
    nacionalidade: string,
    estado_civil: string,
    profissao: string,
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

export const pjrepSchema = new mongoose.Schema({
    tipo: {
        type: String,
        required: true,
    },
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
        required: false
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
    email: {
        type: [String],
        required: false,
        match: /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
    },
    telefone: {
        type: [String],
        required: false
    }
})
