const connection = require("./connection");

class DB {
  // Keep a reference to the connection on the class
  constructor(connection) {
    this.connection = connection;
  }

  // Finds all employees 
  findAllEmployees() {
    return this.connection.query(
    //  selecting id, firse name , last name from the employee table. select name from department table. select salary from role table. access the manager first and last name 
      "SELECT employee.id, employee.first_name, employee.last_name, department.name, role.salary, CONCAT(manager.first_name,' ', manager.last_name) AS manager_name FROM employee \
      LEFT JOIN role ON employee.role_id = role.id \
      LEFT JOIN department ON role.department_id = department.id \
      LEFT JOIN employee manager ON manager.id = employee.manager_id"

    );
  }

  // Finds all employees except the given employee id
  findAllPossibleManagers(employeeId) {
    return this.connection.query(
      "SELECT id, first_name, last_name FROM employee WHERE id != ?",
      employeeId
    );
  }

  // Creates a new employee
  createEmployee(employee) {
    return this.connection.query("INSERT INTO employee SET ?", employee);
  }


  // Update the given employee's role
  updateEmployeeRole(employeeId, roleId) {
    return this.connection.query(
      
        "UPDATE employee SET role_id = ? WHERE id = ?",
        [roleId, employeeId]
    );
  }

  // Updates the employee's manager
  updateEmployeeManager(employeeId, managerId) {
    return this.connection.query(
      "UPDATE employee SET manager_id = ? WHERE id = ?",
      [managerId, employeeId]
    );
  }

  // Finds all roles, join with departments to display the department name
  findAllRoles() {
    return this.connection.query(
      // select ID, title and salary from role table and select name from department table. 
      "SELECT role.id, role.title, role.salary, department.name AS department FROM role LEFT JOIN department ON role.department_id = department.id"

    );
  }

  // Creates a new role
  createRole(role) {
    return this.connection.query(
     
        "INSERT INTO role SET ?",
        [role]
      );
  }


  // Finds all departments, join with employees and roles and sum up utilized department budget
  findAllDepartments() {
    return this.connection.query(
      "SELECT department.id, department.name, SUM(role.salary) AS utilized_budget \
      FROM department LEFT JOIN role ON role.department_id = department.id \
      LEFT JOIN employee ON employee.role_id = role.id \
      GROUP BY department.id, department.name"
    );
  }

  // Creates a new department
  createDepartment(department) {
    return this.connection.query(
      "INSERT INTO department SET ?",
      [department]
    );
  }

  // Finds all employees in a given department, join with roles to display role titles
  findAllEmployeesByDepartment(departmentId) {
    return this.connection.query(
      "SELECT employee.id, employee.first_name, employee.last_name, role.title \
      FROM employee \
      LEFT JOIN role on employee.role_id = role.id \
      LEFT JOIN department on role.department_id = department.id \
      WHERE department.id = ?;",
      departmentId
    );
  }

  // Finds all employees by manager, join with departments and roles to display titles and department names
  findAllEmployeesByManager(managerId) {
    return this.connection.query(
      // select id, first name, last name from employee table. select title from role table. select name from department table.
        "SELECT employee.id, employee.first_name, employee.last_name, role.title, department.name \
        FROM employee \
        LEFT JOIN role on employee.role_id = role.id \
        LEFT JOIN department on role.department_id = department.id \
        WHERE manager_id = ?;",
        managerId
    );
  }
}

module.exports = new DB(connection);
