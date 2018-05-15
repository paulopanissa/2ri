import * as mongoose from "mongoose";

export interface Veiculos extends mongoose.Document {
    especie?: string,
    tipo?: string,
    marca?: string
    modelo?: string,
    anofab?: string,
    anomod?: string,
    placa?: string,
    combustivel?: string,
    cor?: string,
    chassi?: string,
    renavam?: string,
    obs?: string
}

export const veiculoSchema = new mongoose.Schema({
    especie: {
        type: String,
        required: false,
        uppercase: true
    },
    tipo: {
        type: String,
        required: false,
        uppercase: true
    },
    marca: {
        type: String,
        required: false,
        uppercase: true
    },
    modelo: {
        type: String,
        required: false,
        uppercase: true
    },
    anofab: {
        type: String,
        required: false
    },
    anomod: {
        type: String,
        required: false
    },
    placa: {
        type: String,
        required: false,
        uppercase: true
    },
    combustive: {
        type: String,
        required: false,
        uppercase: true
    },
    cor: {
        type: String,
        required: false,
        uppercase: true
    },
    chassi: {
        type: String,
        required: false,
        uppercase: true
    },
    renavam: {
        type: String,
        required: false
    },
    obs: {
        type: String,
        required: false,
        uppercase: true
    }
})