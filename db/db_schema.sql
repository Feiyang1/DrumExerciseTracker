create table excercises (
    id int NOT NULL Identity(1,1) primary key,
    name nvarchar(100) ,
    bpm int,
	increment int,
    active bit,
    time_signature nvarchar(100),
    user_id nvarchar(50)
)

create table history (
    excercise_id int foreign key references excercises(id),
    dt datetime,
    bpm int
)

insert into excercises (name, bpm, user_id) values ('double stroke roll - full stroke', 62, 1)
insert into excercises (name, bpm, user_id) values ('paradiddle', 43, 1)
insert into excercises (name, bpm, user_id, active, time_signature, increment) values ('base drum1', 111, 1, 1, '4/4', 1)
insert into excercises (name, bpm, user_id, active, time_signature, increment) values ('base drum2', 52, 1, 1, '4/4', 1)

select * 
from excercises inner join users on users.id = excercises.user_id
where users.name = 'Feiyang Chen'

select excercises.name as name, excercises.bpm as bpm, history.dt as dt, history.bpm as hbpm
from excercises inner join users on users.id = excercises.user_id
left join history on excercises.id = history.excercise_id
where users.name = 'Feiyang Chen'


update excercises
Set bpm = bpm + 1 
where name = 'paradiddle'

insert into history 
select id, '02-29-2016', bpm
from excercises
where excercises.name = 'paradiddle'

select * from history

select excercises.name as name, excercises.bpm as bpm, history.dt as dt, history.bpm as hbpm
from excercises inner join users on users.id = excercises.user_id
left join history on excercises.id = history.excercise_id
where users.name = 'Feiyang Chen'
