const acervoLivros = require('../dados/acervoLivros.js');

const adicionarLivro = (req, res) => {

  const { titulo, autor, ano, numPaginas } = req.body;
  const indiceUltimoLivro = acervoLivros.length - 1;
  const novoId = (acervoLivros[indiceUltimoLivro].id) + 1;
  const novoLivro = {
    "id": novoId,
    "titulo": titulo,
    "autor": autor,
    "ano": ano,
    "numPaginas": numPaginas
  };

  acervoLivros.push(novoLivro);
  res.status(201).json(novoLivro)
};
const substituirLivro = (req, res) => {
  const mensagemSucesso = {
        "mensagem": "Livro substituído."
  };
  const mensagemIdInexistente = {
        "mensagem": "Não existe livro a ser substituído para o ID informado."
  }; 
  const id = Number(req.params.id);
  const livroSub = acervoLivros.find(livro => livro.id === id);
  const { titulo, autor, ano, numPaginas } = req.body;
  
  if (livroSub) {
    livroSub.titulo = titulo;
    livroSub.autor = autor;
    livroSub.ano = ano;
    livroSub.numPaginas = numPaginas;
    return res.status(201).json(mensagemSucesso);  
  } else {
    return res.status(400).json(mensagemIdInexistente);
  }
};
const alterarLivro = (req, res) => {
  const mensagemIdInexistente = {
    "mensagem": "Não existe livro a ser substituído para o ID informado."
  };
  const mensagemAlterado = {
    "mensagem": "Livro alterado."
  };
  const mensagemNaoAutorizado = { 
    "mensagem": "Não é permitido alterar o ID."
  }
  const id = Number(req.params.id);
  const livroAlt = acervoLivros.find(livro => livro.id === id);
  const campoAlt = req.body; 

  if (campoAlt.id) {
    return res.status(400).json(mensagemNaoAutorizado);
  }
  if (!livroAlt){
    return res.status(404).json(mensagemIdInexistente);
  }

  for (const chave in campoAlt){
    const novoValor = campoAlt[chave];
    livroAlt[chave] = novoValor;
  }
  res.json(mensagemAlterado);
};
const removerLivro = (req, res) => {
  const mensagemErro = {
    "mensagem": "Não existe livro a ser removido para o ID informado."
  };
  const mensagemSucesso = {
    "mensagem": "Livro removido."
  };
  const id = Number(req.params.id);
  const indiceRemover = acervoLivros.findIndex(livro => livro.id === id);

  if (indiceRemover < 0) {
    return res.status(400).json(mensagemErro)
  }
  acervoLivros.splice(indiceRemover,1);
  res.json(mensagemSucesso);

};

module.exports = { 
    adicionarLivro,
    substituirLivro,
    alterarLivro,
    removerLivro
};
