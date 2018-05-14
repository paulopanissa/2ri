import * as mongoose from 'mongoose'
import { validateCPF, validateCNPJ } from '../../config'

export interface Ato extends mongoose.Document {
    ato: [Atos],
    outorgante: [Outorgante]
    outorgado?: [Outorgado]
}

export interface Atos extends mongoose.Document {
    tipo: string // Procuração | Declaração | Escritura
    poderes: '',
    imoveis?: string
    veiculos?: string

}

export interface Outorgante extends mongoose.Document {
    tipo: string, // PF ou PJ
    pf?: [PF]
    pj?: [PJ]
}

export interface Outorgado extends mongoose.Document {
    tipo: string, // PF ou PJ
    pf?: [PF]
    pj?: [PJ]
}

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

export interface Conjuge extends mongoose.Document {
    nome: string,
    genero?: string, // Masculino ou Feminino
    nacionalidade?: string,
    profissao?: string,
    u_cnh?: boolean, // se está utilizando a CNH
    cnh_form?: string,
    cnh_reg?: string,
    cnh_uf?: string,
    rg?: string,
    rg_uf?: string,
    cpf?: string,
}

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

const atosSchema = new mongoose.Schema({

})

const outorganteSchema = new mongoose.Schema({

})

const outorgadoSchema = new mongoose.Schema({

})

const atoSchema = new mongoose.Schema({
    ato: {
        type: [atosSchema],
        required: true,
        select: true
    },
    outorgante: {
        type: [outorganteSchema],
        required: true,
        select: false
    },
    outorgado: {
        type: [outorgadoSchema],
        required: false,
        select: true
    }
})

export const Ato = mongoose.model<Ato>('Ato', atoSchema)
