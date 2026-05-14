import Fastify from 'fastify'
import cors from '@fastify/cors'
import { Pool } from 'pg'

const servidor = Fastify()

servidor.register(cors, {
    origin: true
})


const sql1 = new Pool({
    user: "postgres",
    password: "senai",
    host: "localhost",
    database: "join_att1",
    port: 5432
})

servidor.get('/join_att1', async (request, reply) => {
    const resultado = await sql1.query(
`select
  c.nome as pessoa,
  p.item,
  p.valor as preco
from 
  cliente c
inner join 
  pedido p on c.id = p.id_cliente;`
)
    return resultado.rows
})

const sql2 = new Pool({
    user: "postgres",
    password: "senai",
    host: "localhost",
    database: "join_att2",
    port: 5432
})

servidor.get('/join_att2', async (request, reply) => {
    const resultado = await sql2.query(
`select
  p.nome as produto,
  c.nome as categoria,
  p.preco_custo,
  p.preco_venda
from 
  produto p
inner join 
  categoria c on c.id = p.id_categoria;`
)
    return resultado.rows
})

const sql3 = new Pool({
    user: "postgres",
    password: "senai",
    host: "localhost",
    database: "join_att3",
    port: 5432
})

servidor.get('/join_att3', async (request, reply) => {
    const resultado = await sql3.query(
`select 
  c.nome as nome_cliente,
  c.data_nascimento,
  a.servico,
  a.preco,
  a.data as data_agendamento,
  a.horario
from 
  agendamento a
inner join 
  cliente c on c.id = a.id_cliente;`
)
    return resultado.rows
})

servidor.listen({ port: 3000 }, () => {
    console.log('server ta ON 😎')
})