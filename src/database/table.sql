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
CREATE TABLE loan (
  id INT AUTO_INCREMENT PRIMARY KEY,
  user_id INT NOT NULL,
  book_id INT NOT NULL,
  status VARCHAR(255) NOT NULL,
  FOREIGN KEY (user_id) REFERENCES user(id),
  FOREIGN KEY (book_id) REFERENCES book(id),
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);
INSERT INTO `book` (`id`, `title`, `description`, `author`, `year`, `available`, `cover`, `created_at`, `updated_at`) VALUES (1, 'Mi Portada de libro', 'A novel by F. Scott Fitzgerald', 'F. Scott Fitzgerald', 1925, 0, 'https://edit.org/images/cat/portadas-libros-big-2019101610.jpg', '2023-09-24 16:49:06', '2023-09-24 23:28:11');
INSERT INTO `book` (`id`, `title`, `description`, `author`, `year`, `available`, `cover`, `created_at`, `updated_at`) VALUES (2, 'Dejemos Huella', 'A novel by Harper Lee', 'Pedro Muñoz', 1960, 0, 'https://upload.wikimedia.org/wikipedia/commons/0/05/Portada-libro.jpg', '2023-09-24 16:49:06', '2023-09-24 23:28:59');
INSERT INTO `book` (`id`, `title`, `description`, `author`, `year`, `available`, `cover`, `created_at`, `updated_at`) VALUES (3, 'Hasta que el verano se acabe', 'A novel by George Orwell', 'Connor Hamilton', 1949, 1, 'https://marketplace.canva.com/EAFI171fL0M/1/0/1003w/canva-portada-de-libro-de-novela-ilustrado-color-azul-aqua-PQeWaiiK0aA.jpg', '2023-09-24 16:49:06', '2023-09-24 23:29:40');
INSERT INTO `book` (`id`, `title`, `description`, `author`, `year`, `available`, `cover`, `created_at`, `updated_at`) VALUES (4, 'El camino de la Guerrera', 'A novel by Jane Austen', 'Encarni Herrera', 1813, 1, 'https://www.letraminuscula.com/wp-content/uploads/Portada-55x85-EL-CAMINO-DE-LA-GUERRERA-663x1024.jpg', '2023-09-24 16:49:06', '2023-09-24 23:30:27');

-- password 1234567
INSERT INTO user (password, name, last_name, rol, email)
VALUES (
    '$2a$12$qCk7qBWoi5wC9yPMxmzTxOLTOLIIOAgbTHjr8xCbTqGsGyIPAn.lO',
    'John',
    'Doe',
    'administrador',
    'john.doe@example.com'
  ),
  (
    '$2a$12$qCk7qBWoi5wC9yPMxmzTxOLTOLIIOAgbTHjr8xCbTqGsGyIPAn.lO',
    'Alice',
    'Smith',
    'usuario',
    'alice.smith@example.com'
  ),
  (
    '$2a$12$qCk7qBWoi5wC9yPMxmzTxOLTOLIIOAgbTHjr8xCbTqGsGyIPAn.lO',
    'Bob',
    'Johnson',
    'usuario',
    'bob.johnson@example.com'
  ),
  (
    '$2a$12$qCk7qBWoi5wC9yPMxmzTxOLTOLIIOAgbTHjr8xCbTqGsGyIPAn.lO',
    'Eva',
    'Brown',
    'usuario',
    'eva.brown@example.com'
  ),
  (
    '$2a$12$qCk7qBWoi5wC9yPMxmzTxOLTOLIIOAgbTHjr8xCbTqGsGyIPAn.lO',
    'Michael',
    'Davis',
    'administrador',
    'michael.davis@example.com'
  );
INSERT INTO loan (user_id, book_id, status)
VALUES (1, 1, 'prestado'),
  (1, 2, 'prestado'),
  (3, 3, 'disponible'),
  (4, 4, 'disponible');