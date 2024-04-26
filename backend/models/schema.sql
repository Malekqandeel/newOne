CREATE TABLE roles (
  id INT AUTO_INCREMENT PRIMARY KEY,
  role VARCHAR(255) NOT NULL
);

CREATE TABLE permissions (
  id INT AUTO_INCREMENT PRIMARY KEY,
  permission VARCHAR(255) NOT NULL
);

CREATE TABLE role_permission (
  id INT AUTO_INCREMENT PRIMARY KEY,
  role_id INT,
  permission_id INT,
  FOREIGN KEY (role_id) REFERENCES roles(id),
  FOREIGN KEY (permission_id) REFERENCES permissions(id)
);

CREATE TABLE type (
  id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(255),
  password VARCHAR(255)
);

CREATE TABLE users (
  id INT AUTO_INCREMENT PRIMARY KEY,
  username VARCHAR(255),
  password VARCHAR(255),
  type_id INT,
  role_id INT,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (type_id) REFERENCES type(id),
  FOREIGN KEY (role_id) REFERENCES roles(id)
);

CREATE TABLE ticket (
  id INT AUTO_INCREMENT PRIMARY KEY,
  title VARCHAR(255),
  body TEXT,
  user_id INT,
  priority VARCHAR(255),
  photo VARCHAR(255),
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  end_at TIMESTAMP,
  FOREIGN KEY (user_id) REFERENCES users(id)
);

CREATE TABLE workspace (
  id INT AUTO_INCREMENT PRIMARY KEY,
  title VARCHAR(255),
  ticket_id INT,
  members INT,
  photo VARCHAR(255),
  FOREIGN KEY (ticket_id) REFERENCES ticket(id)
);

CREATE TABLE favorite (
  id INT AUTO_INCREMENT PRIMARY KEY,
  ticket_id INT,
  FOREIGN KEY (ticket_id) REFERENCES ticket(id)
);
