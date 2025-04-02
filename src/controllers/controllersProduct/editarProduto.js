const knex = require('../../database/conexao');
const { excluirImagem, uploadImagem } = require('../../services/upload');
const { schemaEditarProduto } = require('../../validations/validacoesEditarProduto');

const editarProduto = async (req, res) => {
  const IdProduto = req.params.id;
  try {
    const produtoExistente = await knex('produtos').where({ id: IdProduto }).first();
    if (!produtoExistente) {
      return res.status(404).json({ mensagem: 'Produto não encontrado.' });
    }

    let updateData = {};

    if (req.file) {
      if (produtoExistente.produto_imagem) {
        await excluirImagem(produtoExistente.produto_imagem);
      }

      const { originalname, mimetype, buffer } = req.file;
      const upload = await uploadImagem(`produtos/${IdProduto}/${originalname}`, buffer, mimetype);
      const imageUrl = `https://${process.env.BUCKET_NAME}.${process.env.ENDPOINT_BACKBLAZE}/${upload.path}`;
      updateData.produto_imagem = imageUrl;
    }

    if (Object.keys(req.body).length > 0) {
      const { error, value } = schemaEditarProduto.validate(req.body);
      if (error) {
        return res.status(400).json({ mensagem: error.message });
      }
      
      const { descricao, quantidade_estoque, valor, categoria_id } = value;

      const categoriaExistente = await knex("categorias").where("id", categoria_id).first();
      if (!categoriaExistente) {
        return res.status(404).json({ mensagem: 'A categoria informada não existe.' });
      }

      updateData = { ...updateData, descricao, quantidade_estoque, valor, categoria_id };
    }

    if (Object.keys(updateData).length === 0) {
      return res.status(400).json({ mensagem: 'Nenhum dado para atualizar.' });
    }

    await knex('produtos').where({ id: IdProduto }).update(updateData);

    const produtoAtualizado = await knex('produtos').where({ id: IdProduto }).first();

    return res.status(200).json({ mensagem: 'Produto atualizado com sucesso.', produto: produtoAtualizado });
  } catch (error) {
    return res.status(500).json({ mensagem: 'Erro interno do servidor' });
  }
};

module.exports = editarProduto;
