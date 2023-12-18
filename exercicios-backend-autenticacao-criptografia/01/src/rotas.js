const express = require('express');
const roteador = express();

const { cadastrarUsuario,
    listarUsuarios,
    loginUsuario,
    cadastrarPokemon,
    atualizarApelido,
    listarPokemonsUsuario,
    listarPokemonId,
    deletarPokemonId
    } = require('./controladorUsuarios.js');

const validarUsuario = require('./intermediarios.js');

roteador.post('/cadastro', cadastrarUsuario);
roteador.post('/login', loginUsuario);

roteador.use(validarUsuario);
roteador.get('/', listarUsuarios);
roteador.get('/pokemon', listarPokemonsUsuario);
roteador.get('/pokemon/:id', listarPokemonId)
roteador.post('/pokemon', cadastrarPokemon);
roteador.post('/pokemon/:id', atualizarApelido);
roteador.delete('pokemon/:id', deletarPokemonId);

module.exports = roteador;