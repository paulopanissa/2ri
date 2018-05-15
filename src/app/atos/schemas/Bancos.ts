import * as mongoose from "mongoose";

export interface Bancos extends mongoose.Document {
    b_numero?: string,
    b_nome?: string,
    b_tipo?: string,
    b_agencia?: string,
    b_conta?: string
}

export const bancoSchema = new mongoose.Schema({
    b_numero: {
        type: String,
        required: false
    },
    b_nome: {
        type: String,
        required: true
    },
    b_tipo: {
        type: String,
        required: false,
        enum: ["Poupança", "Corrente", "Poupança e Corrente", "Aplicação", "Investimento"]
    },
    b_agencia: {
        type: String,
        required: false
    },
    b_conta: {
        type: String,
        required: false
    }
})