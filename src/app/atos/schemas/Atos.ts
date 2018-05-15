import * as mongoose from "mongoose";
import {Modelo, modeloSchema} from "./Modelo";

export interface Atos extends mongoose.Document {
    tipo: string // Procuração | Declaração | Escritura
    modelo: [Modelo],
    prazo?: string,
    substabelecimento?: boolean
}

export const atSchema = new mongoose.Schema({
    tipo: {
        type: String,
        required: true,
        enum: ["Procuração", "Declaração"]
    },
    modelo: [modeloSchema],
    prazo: {
        type: String,
        require: false
    },
    substabelecimento: {
        type: Boolean,
        required: false
    }

})