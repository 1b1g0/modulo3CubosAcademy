const senhaCorreta = 'cubos123'; // temp, mover p env
const cursos = require('./dados/cursos');
const alunos = require('./dados/dados');
const totalAlunos = alunos.length;

const erroId = {mesagem: 'Id inválido'};

const autenticarUsuario = (req,res,next) => {
    const senha = req.query.senha;
    //console.log(senha);
    if (!senha || senha !== senhaCorreta) {
        const erro = {
            "mensagem": "Esta é uma mensagem para explicar o erro e/ou código de status retornado."
        }
        res.sendStatus(401, erro)
    } else if (senha === senhaCorreta) {
        next();
    }    
};
const testarInput = (req, res, next) => {
    
    const { nome, sobrenome, idade, curso } = req.body;
    const regex = /[a-zA-Z]/g;
     // usando regex pra checar se não contém letras


    if ((nome && sobrenome && idade && curso) &&
    (regex.test(nome) && regex.test(sobrenome) && regex.test(curso)) &&
    (idade >= 18) &&
    (cursos.includes(curso))) {
        next();
    } else {
        res.status(400).send({mesagem:'Dados incorretos, o aluno não foi cadastrado'});
    }
};
const testarId = (req, res, next) => {
    const id = Number(req.params.id);
    
    if (id < totalAlunos && id === parseInt(id) && alunos.includes(alunos.find(aluno => aluno.id === id))) {
        res.statusCode = 200;
        next();
    } 
    else if (id !== parseInt(id) || !id) {
        res.status(400).send(erroId)
    }
    else {
        res.status(404).send({mensagem: 'Aluno não encontrado.'});
    }
};

module.exports = {
    autenticarUsuario,
    testarInput,
    testarId
}
