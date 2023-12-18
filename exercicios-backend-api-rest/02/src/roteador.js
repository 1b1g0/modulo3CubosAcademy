const express = require('express');
const roteador = express();
const {
    listarConvidados,
    adicionarConvidado,
    removerConvidado

} = require('./controladores/controleConvidados')


roteador.get('/convidados', listarConvidados);
roteador.post('/convidados', adicionarConvidado);
roteador.delete('/convidados/:nome', removerConvidado);

module.exports = roteador;

