export const validateCPF = (cpf: string): boolean => {        
    let sum, rest;
    if (cpf == undefined || cpf.trim().length === 0 || cpf == "00000000000"){
        return false
    }
    cpf = cpf.replace('.', '').replace('.', '').replace('-', '')

    sum = 0
    for (let i=1; i<=9; i++) {
        sum = sum + parseInt(cpf.substring(i-1, i)) * (11 - i)
    }    
    rest = (sum * 10) % 11;

    if ((rest == 10) || (rest == 11)) {
        rest = 0
    }
    if (rest != parseInt(cpf.substring(9, 10)) ) {
        return false
    }
    sum = 0;
    for (let i = 1; i <= 10; i++) {
        sum = sum + parseInt(cpf.substring(i-1, i)) * (12 - i)
    }    
    rest = (sum * 10) % 11;

    if ((rest == 10) || (rest == 11)) {
        rest = 0;
    }

    if (rest != parseInt(cpf.substring(10, 11) ) ) {
        return false;
    }
    return true;
}

export const validateCNPJ = (cnpj: string): boolean => {

    let size, number, digits, sum, pos, result;

    cnpj = cnpj.replace(/[^\d]+/g,'');

    if(cnpj == '') return false;

    if (cnpj.length != 14)
        return false;

    // Elimina CNPJs invalidos conhecidos
    if (cnpj == "00000000000000" ||
        cnpj == "11111111111111" ||
        cnpj == "22222222222222" ||
        cnpj == "33333333333333" ||
        cnpj == "44444444444444" ||
        cnpj == "55555555555555" ||
        cnpj == "66666666666666" ||
        cnpj == "77777777777777" ||
        cnpj == "88888888888888" ||
        cnpj == "99999999999999")
        return false;

    // Valida DVs
    size = cnpj.length - 2
    number = cnpj.substring(0,size);
    digits = cnpj.substring(size);
    sum = 0;
    pos = size - 7;
    for (let i = size; i >= 1; i--) {
        sum += number.charAt(size - i) * pos--;
        if (pos < 2)
            pos = 9;
    }

    result = sum % 11 < 2 ? 0 : 11 - sum % 11;
    if (result != digits.charAt(0))
        return false;

    size = size + 1;
    number = cnpj.substring(0,size);
    sum = 0;
    pos = size - 7;
    for (let i = size; i >= 1; i--) {
        sum += number.charAt(size - i) * pos--;
        if (pos < 2)
            pos = 9;
    }
    result = sum % 11 < 2 ? 0 : 11 - sum % 11;
    if (result != digits.charAt(1))
        return false;

    return true;
}

export const validateEmail = (email: string): boolean => {
    let regex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    return regex.test(email.toLowerCase())
}
