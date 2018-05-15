import * as mongoose from "mongoose";
import { Imoveis, imovelSchema } from "./Imoveis";
import { Veiculos, veiculoSchema } from "./Veiculos";
import { Bancos, bancoSchema } from "./Bancos";

export interface Modelo extends mongoose.Document {
    nome?: string,
    arquivo?: string,
    imoveis?: [Imoveis],
    veículos?: [Veiculos],
    bancos?: [Bancos]
}

export const modeloSchema = new mongoose.Schema({
    nome: {
        type: String,
        required: true,
        select: true
    },
    arquivo: {
        type: String,
        required: true,
        select: true
    },
    imoveis: [imovelSchema],
    veiculos:[veiculoSchema],
    bancos: [bancoSchema]
})