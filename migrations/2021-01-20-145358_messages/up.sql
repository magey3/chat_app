-- Your SQL goes here
CREATE EXTENSION pgcrypto;
SET DATESTYLE TO ISO;
CREATE TABLE messages (
	id SERIAL PRIMARY KEY,
	content TEXT NOT NULL,
	userid INTEGER NOT NULL,
	time TIMESTAMP NOT NULL
)
