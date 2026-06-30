import Fastify from 'fastify'
import cors from '@fastify/cors'
import { Pool } from 'pg'
import bcrypt from 'bcryptjs'

const servidor = Fastify()

servidor.register(cors, {
    origin: true
})

const sql = new Pool({
    user: "postgres",
    password: "senai",
    host: "localhost",
    database: "projeto_kanban",
    port: 5432
})

// RF01 - regras de validação do cadastro
function validarCadastro(dados) {
    const erros = []

    const nomes = (dados.nome_completo || '').trim().split(/\s+/).filter(Boolean)
    if (nomes.length < 2) {
        erros.push('o nome completo precisa ter no mínimo nome e sobrenome')
    }

    const regexEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!regexEmail.test(dados.email || '')) {
        erros.push('e-mail inválido, use o formato nome@dominio.com')
    }

    if (!dados.senha || dados.senha.length < 8) {
        erros.push('a senha precisa ter no mínimo 8 caracteres')
    }

    return erros
}

servidor.post('/usuarios', async (request, reply) => {
    const { nome_completo, email, senha } = request.body || {}

    const erros = validarCadastro({ nome_completo, email, senha })
    if (erros.length > 0) {
        reply.status(400)
        return { sucesso: false, erros }
    }

    try {
        const senhaCriptografada = await bcrypt.hash(senha, 10)

        const resultado = await sql.query(
            `insert into usuario (nome_completo, email, senha)
             values ($1, $2, $3)
             returning id, nome_completo, email, criado_em;`,
            [nome_completo.trim(), email.trim().toLowerCase(), senhaCriptografada]
        )

        reply.status(201)
        return { sucesso: true, usuario: resultado.rows[0] }

    } catch (erro) {
        // codigo 23505 = violação de unique (email repetido)
        if (erro.code === '23505') {
            reply.status(409)
            return { sucesso: false, erros: ['esse e-mail já está cadastrado'] }
        }

        console.error(erro)
        reply.status(500)
        return { sucesso: false, erros: ['erro interno ao cadastrar usuário'] }
    }
})

servidor.listen({ port: 3000 }, () => {
    console.log('servidor rodando em http://localhost:3000')
})