const instanciaAxios = require('./axios.js');
const fs = require('fs/promises');
//const queryString = require('node:querystring');

const buscarEmpresa = async (req, res) => {
    const { dominioEmpresa } = req.query;
    
    try {
        // forma NÃO SEGURA de adicionar, utilizar queryString pra evitar injeção de script
        const {data: empresa} = await instanciaAxios.get(`/?domain=${dominioEmpresa}`);

        if (empresa && empresa.name){
            const dadosEmpresas = JSON.parse(await fs.readFile('./src/dados/empresas.json'));
            
            for (let empresaSalva of dadosEmpresas){
                if (empresaSalva.name == empresa.name){
                    return res.status(409).json({mensagem: 'Empresa já cadastrada.'});
                }
            }
            
            dadosEmpresas.push(empresa)
            await fs.writeFile('./src/dados/empresas.json', JSON.stringify(dadosEmpresas));
        }
        return res.json(empresa)

    } catch (e) {
        return res.status(500).json({mensagem: e})
    }

}

module.exports = {
    buscarEmpresa
}