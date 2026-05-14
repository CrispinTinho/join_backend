-- /// Médio ///
create table categoria (
  id serial primary key,
  nome varchar(255) not null
);

create table produto (
  id serial primary key,
  nome varchar(255) not null,
  preco_custo decimal(10,2) not null,
  preco_venda decimal(10,2) not null,
  id_categoria integer references categoria(id) on delete cascade
);

insert into categoria (nome) values ('Periféricos'), ('Hardware'), ('Monitores');

insert into produto (nome, preco_custo, preco_venda, id_categoria) values ('Mouse', 25.00, 79.90, 1);
insert into produto (nome, preco_custo, preco_venda, id_categoria) values ('Teclado', 40.00, 129.90, 1);
insert into produto (nome, preco_custo, preco_venda, id_categoria) values ('Placa de Vídeo', 800.00, 1499.90, 2);
insert into produto (nome, preco_custo, preco_venda, id_categoria) values ('Processador', 600.00, 1099.90, 2);
insert into produto (nome, preco_custo, preco_venda, id_categoria) values ('Monitor 24"', 500.00, 999.90, 3);

select
  p.nome as produto,
  c.nome as categoria,
  p.preco_custo,
  p.preco_venda
from 
  produto p
inner join 
  categoria c on c.id = p.id_categoria;