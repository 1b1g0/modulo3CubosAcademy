const convidados = require('../dados/listaConvidados');

const listarConvidados = (req, res) => {
    const mensagemPositiva =  { "mensagem": "Convidado presente." };
    const mensagemNegativa = { "mensagem": "O convidado buscado não está presente na lista."};
    const nome = req.query.nome;

    if (nome) {
        if (convidados.includes(nome)){
            res.json(mensagemPositiva);
        } else {
            res.json(mensagemNegativa);
        }
    } else {
        res.json(convidados);
    }
};
const adicionarConvidado = (req, res) => {
    const mensagemNomeExistente = { "mensagem": "O nome do convidado a ser adicionado já existe na lista. Caso queria adicionar outro convidado de mesmo nome, favor fornecer o sobrenome também."}
    const mensagemSucesso = { "mensagem": "Convidado adicionado." };
    const nome = req.body.nome;

    if (convidados.includes(nome)){
        res.status(406).json(mensagemNomeExistente);
    } else {
        convidados.push(nome);
        res.status(201).json(mensagemSucesso);
    }
};
const removerConvidado = (req, res) => {
    const mensagemNegativa = { "mensagem": "O nome do convidado a ser removido não existe na lista. Nenhum convidado foi removido." }
    const mensagemPositiva = { "mensagem": "Convidado removido." };
    const nome = req.params.nome;
    const indiceNome = convidados.indexOf(nome);
    
    if (!convidados.includes(nome)) {
        res.status(404).json(mensagemNegativa);
    } else {
        convidados.splice(indiceNome,1);
        res.status(200).json(mensagemPositiva);
    }  
};

module.exports = {
    listarConvidados,
    adicionarConvidado,
    removerConvidado
}
