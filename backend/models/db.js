const { Pool } = require("pg");
const connectionString = process.env.DB_URL;
const pool = new Pool({
  connectionString,
});
pool
  .connect()
  .then((res) => {
    console.log(`DB connected to ${res.database}`);
  })
  .catch((err) => {
    console.log(err);
  });
const createTable = (req, res) => {
  pool
    .query(
      `CREATE TABLE users (
        id SERIAL PRIMARY KEY,
        photo VARCHAR,
        first_name VARCHAR NOT NULL,
        last_name VARCHAR NOT NULL,
        username VARCHAR UNIQUE NOT NULL,
        password VARCHAR(12) NOT NULL,
        role_id VARCHAR,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        FOREIGN KEY (type_id) REFERENCES type(id),
        FOREIGN KEY (role_id) REFERENCES roles(id)
        is_deleted SMALLINT DEFAULT 0
    );
    CREATE TABLE ticket (
        id SERIAL PRIMARY KEY,
        photo VARCHAR,
        cover VARCHAR,
        user_id INTEGER,
        user_id INT,
        priority VARCHAR(255),
        created_at TIMESTAMP DEFAULT NOW(),
        end_at TIMESTAMP,
        FOREIGN Key user_id REFERENCES users(id),
        is_deleted SMALLINT DEFAULT 0,
    );
    CREATE TABLE workspace (
        id SERIAL PRIMARY KEY,
        title VARCHAR(255),
        ticket_id INT,
        member INT,
        photo VARCHAR(255),
        FOREIGN Key member REFERENCES users(id),
        FOREIGN KEY (ticket_id) REFERENCES ticket(id)
    );
    CREATE TABLE favorite (
      id INT AUTO_INCREMENT PRIMARY KEY,
      ticket_id INT,
      FOREIGN KEY (ticket_id) REFERENCES ticket(id)
    );
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
    );`
    )
    .then((result) => {
      res.json({
        message: "created",
      });
    })
    .catch((err) => {
      res.json({
        err: err.message,
      });
    });
};
// createTable()

module.exports = {pool};
  