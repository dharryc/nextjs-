create table if not exists card(
    id integer primary key autoincrement,
    card_name varchar(100) not null,
    path_to_image varchar(255) not null,
    blurb text,
    card_rarity text not null check (card_rarity in ('common','uncommon','rare','legendary'))
);

create table if not exists user(
    id integer primary key autoincrement,
    username varchar(50) not null unique,
    hashed_password varchar(255) not null,
    salt varchar(50) not null
);

create table if not exists inventory_card(
    id integer primary key autoincrement,
    user_id integer not null,
    card_id integer not null,
    foreign key (user_id) references user(id),
    foreign key (card_id) references card(id)
)