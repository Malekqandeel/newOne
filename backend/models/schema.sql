CREATE Table users {
  id integer,
  username varchar,
  password integer,
  type integer,
  role integer,
  FOREIGN KEY (role) REFERENCES role_permission(id),
  FOREIGN KEY (type) REFERENCES type(id),
  created_at timestamp,
  PRIMARY KEY (id)
}

CREATE Table ticket {
  id integer,
  title varchar,
  body text,
  user_id integer,
  priority varchar,
  photo varchar,
  created_at timestamp,
  end_at timestamp,
  FOREIGN KEY (user_id) REFERENCES users(id),
  PRIMARY KEY (id)
}

CREATE Table workspace {
  id integer,
  title varchar,
  ticket integer,
  members integer,
  photo varchar,
  FOREIGN KEY (ticket) REFERENCES ticket(id)
  PRIMARY KEY (id)
}

CREATE Table type {
  id integer,
  name varchar,
  password integer,
  PRIMARY KEY (id)
}

CREATE Table favorite {
  id integer,
  ticket integer,
  FOREIGN KEY (ticket) REFERENCES ticket(id)
  PRIMARY KEY (id)
}
CREATE TABLE roles (
  id SERIAL NOT NULL,
  role VARCHAR(255) NOT NULL,
  PRIMARY KEY (id)
);
CREATE TABLE permissions (
  id SERIAL NOT NULL,
  permission VARCHAR(255) NOT NULL,
  PRIMARY KEY (id)
);
CREATE TABLE role_permission (
  id SERIAL NOT NULL,
  role_id INT,
  permission_id INT,
  FOREIGN KEY (role_id) REFERENCES roles(id),
  FOREIGN KEY (permission_id) REFERENCES permissions(id),
  PRIMARY KEY (id)
);
