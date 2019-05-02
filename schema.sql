CREATE DATABASE apportion;

CREATE TABLE users(
  id SERIAL PRIMARY KEY,
  name VARCHAR(200),
  email VARCHAR(200),
  password_digest VARCHAR(200)
);

CREATE TABLE ledgers(
  id SERIAL PRIMARY KEY,
  date DATE,
  description TEXT,
  amount FLOAT(2)
  account_code_id,
  user_id,
);

CREATE TABLE account_codes(
  id SERIAL PRIMARY KEY,
  income FLOAT(2),
  expenses FLOAT(2)
)
