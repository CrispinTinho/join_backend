import Fastify from 'fastify'
import { Pool } from 'pg'

const servidor = Fastify()

const sql = new Pool({
    user: "postgres",
    password: "senai",
    host: "localhost",
    database: "join_att1",
    port: 5432
})


servidor.get('/compras', async (request, reply) => {
    const resultado = await sql.query(
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

servidor.listen({ port: 3000 }, () => {
    console.log('server ta ON 😎')
})