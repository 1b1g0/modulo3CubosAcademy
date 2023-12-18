const pool = require('./BDconnect.js');

const adicionarAutor = async (req, res) => {
    const { nome, idade } = req.body;
    const erroBody = {
        "mensagem": "o campo nome é obrigatório."
    };

    if (!nome || !idade) {
        return res.status(400).json(erroBody);
    }

    try {
        const q = 'INSERT INTO autores (nome, idade) VALUES ($1, $2);';
        const insertParams = [nome, parseInt(idade)];
        
        await pool.query(q, insertParams);

        const buscaParams = [nome];
        const ResQuery = 'SELECT * FROM autores WHERE nome = $1';
        const ResResultado = await pool.query(ResQuery, buscaParams);
        return res.json(ResResultado.rows[0]);
    } 
    catch(e) {
        console.log(e)
        res.status(400).json(e.message);
    }
};

const retornarAutores = async (req, res) => {
    try {
        
        const autores = await pool.query('SELECT * FROM autores');
        return res.json(autores.rows);
        
    } catch (e) {
        console.log(e)
        return res.status(400).json(e.message);
    }
};

const buscarAutor = async (req, res) => {
    const msgErro = {
        "mensagem": "Autor não encontrado"
    };
    const { id } = req.params;
    console.log(id)
    const queryParams = [Number(id)];
    const queryPG = 'SELECT autores.id, autores.nome, autores.idade, livros.id as livro_id, livros.nome as nome_livro, livros.genero, livros.editora, livros.data_publicacao FROM autores JOIN livros ON livros.id_autor = autores.id WHERE autores.id = $1;';
    const queryLivros = 'SELECT * FROM livros WHERE id_autor = $1;';
    try {
        const resultadoQuery = await pool.query(queryPG, queryParams);
        let resultadoLivros = await pool.query(queryLivros, queryParams);
        if (!resultadoLivros.rows[0]) {
            resultadoLivros = { mensagem: 'Livro não encontrado.'}
        } else {
            resultadoLivros = resultadoLivros.rows;
        };
        
        if (!resultadoQuery.rows[0]) {
            return res.status(400).json(msgErro)
        };
        const { id, nome, idade } = resultadoQuery.rows[0];
        const respostaJSON = {
            id: id,
            nome: nome,
            idade: idade,
            livros: resultadoLivros,
        }
        
        return res.json(respostaJSON);

    } catch(e){
        return res.status(400).json(e.message);
    }
};

const cadastrarLivro = async (req, res) => {
    const { id } = req.params;
    const { nome, genero, editora, data_publicacao } = req.body; 
    const queryInsercao = 'INSERT INTO livros (nome, genero, editora, data_publicacao, id_autor) VALUES ($1, $2, $3, $4, $5)';
    const erroMsg = { 'mensagem': 'O campo nome é obrigatório.'}
    try {
        if (!nome){
            return res.status(400).json(erroMsg);
        };
        await pool.query(queryInsercao,[nome, genero, editora, data_publicacao, id]);
        const resposta = await pool.query('SELECT * FROM livros WHERE nome = $1', [nome]);
        return res.json(resposta.rows);

    } catch (e) {
        return res.status(400).json(e.message);
    }


};

const buscarLivros = async (req, res) => {
    const queryLivro = 'SELECT l.id, l.nome, l.genero, l.editora, l.data_publicacao, a.id as id_autor, a.nome as nome_autor, a.idade FROM livros l JOIN autores a ON l.id_autor = a.id;'
    try{
        const resultado = await pool.query(queryLivro);
        return res.json(resultado.rows)
    } catch(e) {
        res.status(400).json(e)
    }
   
};

module.exports = {
    adicionarAutor,
    retornarAutores,
    buscarAutor,
    cadastrarLivro,
    buscarLivros
}