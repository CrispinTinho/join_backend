-- /// Difícil ///
create table cliente (
  id serial primary key,
  nome varchar(255) not null,
  email varchar(255) not null,
  data_nascimento date not null
);

create table agendamento (
  id serial primary key,
  id_cliente integer references cliente(id) on delete cascade,
  servico varchar(255) not null,
  preco decimal(10,2) not null,
  data date not null,
  horario time not null
);

insert into cliente (nome, email, data_nascimento) values 
('Marcos Coelho', 'marcos@email.com', '11/03/2000'),
('Raul Laurentino', 'raul@email.com', '01/06/2009'),
('João Lopes', 'joao@email.com', '15/01/2009');

insert into agendamento (id_cliente, servico, preco, data, horario) values 
(1, 'Corte degradê', 50.00, '11/03/2026', '10:30'),
(1, 'Barba', 30.00, '01/06/2026', '14:00'),
(2, 'Corte Social', 45.00, '15/01/2026', '09:00');

select 
  c.nome as nome_cliente,
  c.data_nascimento,
  a.servico,
  a.preco,
  a.data as data_agendamento,
  a.horario
from 
  agendamento a
inner join 
  cliente c on c.id = a.id_cliente;