const { connection } = require("./db.connect");
const createEmployeeDb = () => {
  return new Promise((resolve, reject) => {
    connection.query(
      "CREATE DATABASE IF NOT EXISTS employee_db",
      (err, result) => {
        if (err) reject(err);
        resolve(result);
      }
    );
  });
};

const useEmployeeDb = () => {
  return new Promise((resolve, reject) => {
    connection.query("USE employee_db", (err, result) => {
      if (err) reject(err);
      resolve(result);
    });
  });
};

const createDepartmentTable = () => {
  return new Promise((resolve, reject) => {
    connection.query(
      "CREATE TABLE IF NOT EXISTS employee_db.department (id INT NOT NULL AUTO_INCREMENT, name VARCHAR(30) NOT NULL, PRIMARY KEY (id))",
      (err, result) => {
        if (err) reject(err);
        resolve(result);
      }
    );
  });
};
const createRoleTable = () => {
  return new Promise((resolve, reject) => {
    connection.query(
      "CREATE TABLE IF NOT EXISTS employee_db.role (id INT NOT NULL AUTO_INCREMENT, title VARCHAR(30) NOT NULL, salary DECIMAL(10,2) NOT NULL, department_id INT , PRIMARY KEY (id) ,constraint fk_department foreign key (department_id) references department(id) ON DELETE SET NULL)",
      (err, result) => {
        if (err) reject(err);
        resolve(result);
      }
    );
  });
};
const createEmployeeTable = () => {
  return new Promise((resolve, reject) => {
    connection.query(
      "CREATE TABLE IF NOT EXISTS employee_db.employee (id INT NOT NULL AUTO_INCREMENT, first_name VARCHAR(30) NOT NULL, last_name VARCHAR(30) NOT NULL, role_id INT , manager_id INT, PRIMARY KEY (id), CONSTRAINT fk_role foreign key (role_id) references role(id) ON DELETE SET NULL, constraint fk_manager foreign key (manager_id) references employee(id) ON DELETE SET NULL)",
      (err, result) => {
        if (err) reject(err);
        resolve(result);
      }
    );
  });
};

const setUpDb = async () => {
    await createEmployeeDb();
    await useEmployeeDb();
    await createDepartmentTable();
    await createRoleTable();
    await createEmployeeTable();
}

module.exports = { setUpDb };
