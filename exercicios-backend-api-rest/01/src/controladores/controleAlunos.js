const alunos = require('../dados/dados');

const retornarAlunos =  (req,res) => {
    res.statusCode = 200;
    res.send(alunos)
};
const alunoId = (req, res) => {
    const id = Number(req.params.id);

    const alunoSelecionado = alunos.find( aluno => aluno.id === id);
    res.status(200).send(alunoSelecionado);
};
const cadastrarAluno = (req, res) => {
    const id = Number(alunos[(alunos.length - 1)].id) + 1;
    
    const novoAluno = { id: id };
    Object.assign(novoAluno, req.body);
    alunos.push(novoAluno);
    res.sendStatus(201);
};
const deletarAluno = (req, res) => {
    const id = Number(req.params.id);
    const aluno = alunos.find(aluno => aluno.id === id);

    if (!id  || id != parseInt(id)) {
        res.status(400).send(erroId);
    } else if (!aluno) {
        res.status(404).send({mensagem: 'Aluno inexistente'});
    } else {
        alunos.splice(alunos.indexOf(aluno),1);
        res.send(aluno);
        console.log(alunos)
    }

};
const alterarAluno = (req, res) => {
    // PUT
    const id = Number(req.params.id);
    const {...props } = req.body;
    const alunoSub = alunos.find(aluno => aluno.id === id);

    //console.log(props, id, substituirIndice, alunoSub);
    alunoSub.nome = props.nome;
    alunoSub.sobrenome = props.sobrenome;
    alunoSub.idade = props.idade;
    alunoSub.curso = props.curso;
    //console.log(alunoSub);
    res.status(200).send(alunoSub);
};
//TODO
const alterarCampo = (req, res) => {
    //PATCH
    
};
module.exports = {
    retornarAlunos,
    alunoId,
    cadastrarAluno,
    deletarAluno,
    alterarAluno,
    alterarCampo
}