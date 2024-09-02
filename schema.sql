CREATE TABLE pessoas (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    apelido TEXT UNIQUE NOT NULL,
    nome TEXT NOT NULL,
    nascimento TEXT NOT NULL,
    stack TEXT
);