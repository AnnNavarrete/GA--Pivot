--CREATE DATABASE apportion;

DROP TABLE IF EXISTS users CASCADE;
DROP TABLE IF EXISTS account_codes CASCADE;
DROP TABLE IF EXISTS chart_of_accounts CASCADE;
DROP TABLE IF EXISTS ledgers CASCADE;

ALTER SEQUENCE IF EXISTS users_id_seq RESTART WITH 1;
ALTER SEQUENCE IF EXISTS chart_of_accounts_id_seq RESTART WITH 1;
ALTER SEQUENCE IF EXISTS account_codes_id_seq RESTART WITH 1;
ALTER SEQUENCE IF EXISTS ledgers_id_seq RESTART WITH 1;

CREATE TABLE users(
  id SERIAL PRIMARY KEY,
  name VARCHAR(200),
  email VARCHAR(200),
  password_digest VARCHAR(200)
);

CREATE TABLE account_codes(
  id SERIAL PRIMARY KEY,
  name VARCHAR(200)
);

CREATE TABLE chart_of_accounts(
  id SERIAL PRIMARY KEY,
  name VARCHAR(200),
  account_code_id INTEGER
);

CREATE TABLE ledgers(
  id SERIAL PRIMARY KEY,
  date DATE,
  description TEXT,
  amount FLOAT(2),
  user_id INTEGER,
  chart_of_account_id INTEGER 
);

-- constraint for ledgers
ALTER TABLE ledgers
ADD CONSTRAINT ledgers_user_id_fkey 
FOREIGN KEY (user_id) REFERENCES users(id);

ALTER TABLE ledgers
ADD CONSTRAINT ledgers_chart_of_account_id_fkey
FOREIGN KEY (chart_of_account_id) REFERENCES chart_of_accounts(id);

-- constraint for chart of accounts
ALTER TABLE chart_of_accounts
ADD CONSTRAINT chart_of_accounts_account_code_id_fkey 
FOREIGN KEY (account_code_id) REFERENCES account_codes(id);

INSERT INTO account_codes(name) VALUES ('Income');
INSERT INTO account_codes(name) VALUES ('Expenses');

INSERT INTO chart_of_accounts(name, account_code_id) VALUES ('Salary', 1);
INSERT INTO chart_of_accounts(name, account_code_id) VALUES ('Housing', 2);
INSERT INTO chart_of_accounts(name, account_code_id) VALUES ('Utilities', 2);
INSERT INTO chart_of_accounts(name, account_code_id) VALUES ('Transport', 2);
INSERT INTO chart_of_accounts(name, account_code_id) VALUES ('Groceries', 2);
INSERT INTO chart_of_accounts(name, account_code_id) VALUES ('Entertainment', 2);
INSERT INTO chart_of_accounts(name, account_code_id) VALUES ('Scuba Diving', 2);
INSERT INTO chart_of_accounts(name, account_code_id) VALUES ('School Fees', 2);
INSERT INTO chart_of_accounts(name, account_code_id) VALUES ('Holiday', 2);
