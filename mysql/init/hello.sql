USE exgen_app;

CREATE TABLE IF NOT EXISTS hello_messages (
  id INT AUTO_INCREMENT PRIMARY KEY,
  message VARCHAR(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

INSERT INTO hello_messages (message) VALUES ('ハロー');
