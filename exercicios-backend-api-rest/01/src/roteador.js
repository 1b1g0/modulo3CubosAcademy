const { retornarAlunos,
    alunoId,
    cadastrarAluno,
    deletarAluno,
    alterarAluno,
    alterarCampo } = require('./controladores/controleAlunos.js');

const { autenticarUsuario,
    testarInput,
    testarId } = require('./intermediarios.js');

const express = require('express');
const roteador = express();

// auth
roteador.use(autenticarUsuario);


roteador.post('/alunos', testarInput, cadastrarAluno);
roteador.get('/alunos', retornarAlunos);
roteador.get('/alunos/:id', testarId, alunoId);
roteador.delete('/alunos/:id', deletarAluno);
roteador.put('/alunos/:id', testarId, testarInput, alterarAluno);
//TODO
roteador.patch('/alunos/:id', testarId, testarInput, alterarCampo);

module.exports = roteador;