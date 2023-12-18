const express = require('express');
const roteador = express.Router();
const { adicionarAutor, retornarAutores, buscarAutor, cadastrarLivro, buscarLivros } = require('./controladores.js')

roteador.post('/autor/:id/livro', cadastrarLivro);
roteador.post('/autor', adicionarAutor);
roteador.get('/autores', retornarAutores);
roteador.get('/autor/:id', buscarAutor);
roteador.get('/livro', buscarLivros)

module.exports = roteador;