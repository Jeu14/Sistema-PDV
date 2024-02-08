const knex = require('../../database/conexao');
const { schemaCadastroCliente } = require('../../validations/validacoesCadastroCliente');

const editarDadosCliente = async (req, res) => {
    try {
        const { id } = req.params;

        const { error, value } = schemaCadastroCliente.validate(req.body);

        if (error) {
            return res.status(400).json({ mensagem: error.message });
        }

        const { nome, email, cpf, cep, rua, numero, bairro, cidade, estado } = value;

        const cliente = await knex('clientes').where('id', id).first();

        if (!cliente) {
            return res.status(404).json({ mensagem: 'Cliente não encontrado' });
        }

        if (email && email !== cliente.email) {
            const emailExiste = await knex("clientes").where('email', email).whereNot('id', id).first();

            if (emailExiste) {
                return res.status(400).json({ mensagem: "O email já existe" });
            } else {
                await knex("clientes")
                    .where('id', id)
                    .update({
                        email,
                    });
            }
        }

        if (cpf && cpf !== cliente.cpf) {
            const cpfExistente = await knex("clientes").where('cpf', cpf).whereNot('id', id).first();

            if (cpfExistente) {
                return res.status(400).json({ mensagem: "O CPF já existe" });
            } else {
                await knex("clientes")
                    .where('id', id)
                    .update({
                        cpf,
                    });
            }
        }

        if (nome) {
            await knex("clientes")
                .where('id', id)
                .update({
                    nome,
                });
        }

        if (cep || rua || numero || bairro || cidade || estado) {
            await knex("clientes")
                .where('id', id)
                .update({
                    cep,
                    rua,
                    numero,
                    bairro,
                    cidade,
                    estado
                });
        }

        const clienteAtualizado = await knex('clientes').where('id', id).first();

        res.status(200).json({ mensagem: "Cliente Atualizado com sucesso", cliente: clienteAtualizado });
    } catch (error) {
        console.error(error);
        res.status(500).json({ mensagem: 'Erro interno do servidor. Consulte os logs para mais informações.' });
    }
};

module.exports = {
    editarDadosCliente
};
