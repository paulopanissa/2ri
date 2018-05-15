import * as mongoose from "mongoose";

export interface Imoveis extends mongoose.Document {
    imovel?: string,
    matricula?: string,
    inscricao?: string,
    cri?: string,
    cidade?: string,
    uf?: string
}

export const imovelSchema = new mongoose.Schema({
    imovel: {
        type: String,
        required: false,
        uppercase: true
    },
    matricula: {
        type: String,
        required: false
    },
    inscricao: {
        type: String,
        required: false
    },
    cri: {
        type: String,
        required: false
    },
    cidade: {
        type: String,
        required: false
    },
    uf: {
        type: String,
        required: false,
        uppercase: true
    }

})