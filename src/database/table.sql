CREATE TABLE user (
  id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  last_name VARCHAR(255) NOT NULL,
  rol VARCHAR(255) NOT NULL,
  email VARCHAR(255) NOT NULL,
  password VARCHAR(255) NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);
CREATE TABLE book (
  id INT AUTO_INCREMENT PRIMARY KEY,
  title VARCHAR(255) NOT NULL,
  description VARCHAR(255),
  author VARCHAR(255),
  year INT,
  available BOOLEAN NOT NULL DEFAULT true,
  cover VARCHAR(255),
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);
CREATE TABLE book_loan (
  id INT AUTO_INCREMENT PRIMARY KEY,
  user_id INT NOT NULL,
  book_id INT NOT NULL,
  status VARCHAR(255) NOT NULL,
  FOREIGN KEY (user_id) REFERENCES user(id),
  FOREIGN KEY (book_id) REFERENCES book(id),
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);
INSERT INTO book(
    title,
    description,
    author,
    year,
    available,
    cover
  )
VALUES (
    'The Great Gatsby',
    'A novel by F. Scott Fitzgerald',
    'F. Scott Fitzgerald',
    1925,
    true,
    'https://example.com/gatsby.jpg'
  ),
  (
    'To Kill a Mockingbird',
    'A novel by Harper Lee',
    'Harper Lee',
    1960,
    true,
    'https://example.com/mockingbird.jpg'
  ),
  (
    '1984',
    'A novel by George Orwell',
    'George Orwell',
    1949,
    true,
    'https://example.com/1984.jpg'
  ),
  (
    'Pride and Prejudice',
    'A novel by Jane Austen',
    'Jane Austen',
    1813,
    true,
    'https://example.com/pride.jpg'
  );
INSERT INTO user (password, name, last_name, rol, email)
VALUES (
    'password123',
    'John',
    'Doe',
    'administrador',
    'john.doe@example.com'
  ),
  (
    'securepass',
    'Alice',
    'Smith',
    'usuario',
    'alice.smith@example.com'
  ),
  (
    'mysecret',
    'Bob',
    'Johnson',
    'usuario',
    'bob.johnson@example.com'
  ),
  (
    'password456',
    'Eva',
    'Brown',
    'usuario',
    'eva.brown@example.com'
  ),
  (
    'pass1234',
    'Michael',
    'Davis',
    'administrador',
    'michael.davis@example.com'
  );
INSERT INTO book_loan (user_id, book_id, status)
VALUES (1, 1, 'prestado'),
  (2, 2, 'prestado'),
  (3, 3, 'disponible'),
  (4, 4, 'disponible'),
  (5, 5, 'prestado');