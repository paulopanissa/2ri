import * as mongoose from 'mongoose'
import { Atos, Outorgante, Outorgado,
        atSchema, outorganteSchema, outorgadoSchema } from './schemas'


export interface Ato extends mongoose.Document {
    ato: [Atos],
    outorgante: [Outorgante]
    outorgado?: [Outorgado]
}
const atoSchema = new mongoose.Schema({
    ato: {
        type: [atSchema],
        required: true,
        select: true
    },
    outorgante: {
        type: [outorganteSchema],
        required: true,
        select: true
    },
    outorgado: {
        type: [outorgadoSchema],
        required: false,
        select: true
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: false
    }
})

export const Ato = mongoose.model<Ato>('Ato', atoSchema)
