-- /// Fácil ///
create table cliente (
  id serial primary key,
  nome varchar(255)
);

create table pedido (
  id serial primary key,
  item varchar(255),
  valor decimal(10,2),
  id_cliente integer references cliente(id) on delete cascade
);

insert into cliente (nome) values ('Lucas'), ('João'), ('Raul');

insert into pedido (item, valor, id_cliente) values ('robux', 50.00, 1);
insert into pedido (item, valor, id_cliente) values ('caneca', 30.00, 2);
insert into pedido (item, valor, id_cliente) values ('ps5', 100.00, 3);

select
  c.nome as pessoa,
  p.item,
  p.valor as preco
from 
	cliente c
inner join 
	pedido p on c.id = p.id_cliente;


