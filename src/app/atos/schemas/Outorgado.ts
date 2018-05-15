import * as mongoose from "mongoose";
import { PF, pfSchema} from "./PF";
import { PJ, pjSchema } from "./PJ";

export interface Outorgado extends mongoose.Document {
    tipo: string, // PF ou PJ
    pf?: [PF]
    pj?: [PJ]
}

export const outorgadoSchema = new mongoose.Schema({
    tipo: {
        type: String,
        required: true,
        enum: ["pf", "pj"]
    },
    pf: {
        type: [pfSchema],
        required: false
    },
    pj: {
        type: [pjSchema],
        required: false
    }
})
