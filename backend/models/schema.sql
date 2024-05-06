CREATE TABLE roles (
  id INT PRIMARY KEY,
  role VARCHAR(255) NOT NULL
);
CREATE TABLE permissions (
  id INT PRIMARY KEY,
  permission VARCHAR(255) NOT NULL
);
CREATE TABLE role_permission (
  id INT PRIMARY KEY,
  role_id INT,
  permission_id INT,
  FOREIGN KEY (role_id) REFERENCES roles(id),
  FOREIGN KEY (permission_id) REFERENCES permissions(id)
);
CREATE TABLE type (
  id INT PRIMARY KEY,
  name VARCHAR(255),
  password VARCHAR(255)
);
CREATE TABLE company(
  id INT PRIMARY KEY,
  email VARCHAR(255) ,
  username VARCHAR(255),
  password VARCHAR(255),
  role_id INT,
  company_users INT,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (company_users) REFERENCES users(id),
  FOREIGN KEY (role_id) REFERENCES roles(id)
);
CREATE TABLE users (
  id INT PRIMARY KEY,
  email VARCHAR(255),
  username VARCHAR(255),
  password VARCHAR(255),
  role_id INT,
  is_deleted SMALLINT DEFAULT 0,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (role_id) REFERENCES roles(id)
);
CREATE TABLE ticket (
  id INT PRIMARY KEY,
  title VARCHAR(255),
  body TEXT,
  user_id INT,
  priority VARCHAR(255),
  photo VARCHAR(255),
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  end_at TIMESTAMP,
  is_deleted SMALLINT DEFAULT 0,
  FOREIGN KEY (user_id) REFERENCES users(id)
);
CREATE TABLE workspace (
  id INT PRIMARY KEY,
  title VARCHAR(255),
  ticket_id INT,
  members INT,
  photo VARCHAR(255),
  is_deleted SMALLINT DEFAULT 0,
  FOREIGN KEY (ticket_id) REFERENCES ticket(id)
);
CREATE TABLE favorite (
  id INT PRIMARY KEY,
  ticket_id INT,
  is_deleted SMALLINT DEFAULT 0,
  FOREIGN KEY (ticket_id) REFERENCES ticket(id)
);