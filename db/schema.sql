DROP DATABASE IF EXISTS employees;
CREATE DATABASE employees;

USE employees;

-- creates department table
CREATE TABLE department (
  -- creates an ID and make primary key
  id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(30) NOT NULL
);

CREATE TABLE role (
  -- creates an ID and make primary key
  id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
  title VARCHAR (30) NOT NULL,
  salary DECIMAL, 
  department_id INT NOT NULL,
  -- foreign key created for department id
  FOREIGN KEY (department_id)
  REFERENCES department(id)
  ON DELETE CASCADE
);

CREATE TABLE employee (
  id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
  first_name VARCHAR (30) NOT NULL,
  last_name VARCHAR(30) NOT NULL,
  role_id INT NOT NULL,
  manager_id INT, 
  -- foreign key created for role id
  FOREIGN KEY (role_id)
  REFERENCES role(id)
  ON DELETE CASCADE,
  -- foreign key created for manager id
  FOREIGN KEY (manager_id)
  REFERENCES employee(id)
  ON DELETE SET NULL
);
