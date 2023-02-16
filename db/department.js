const { connection } = require("./db.connect");

const createDepartment = (name) => {
  return new Promise((resolve, reject) => {
    connection.query(
      "INSERT INTO employee_db.department (name) VALUES (?)",
      [name],
      (err, result) => {
        if (err) reject(err);
        resolve(result);
      }
    );
  });
};

const getDepartments = () => {
  return new Promise((resolve, reject) => {
    connection.query("SELECT * FROM employee_db.department", (err, result) => {
      if (err) reject(err);
      resolve(result);
    });
  });
};

const deleteDepartment = (departmentId) => {
  return new Promise((resolve, reject) => {
    connection.query(
      "DELETE FROM employee_db.department WHERE id = ?",
      [departmentId],
      (err, result) => {
        if (err) reject(err);
        resolve(result);
      }
    );
  });
};

const getCostOfOneDepartment = (departmentId) => {
  const q = `
    select department.name, sum(role.salary) as total_cost from employee
    inner join role on employee.role_id = role.id
    inner join department on role.department_id = department.id
    where department.id = ?
    group by department.name
    `;
  return new Promise((resolve, reject) => {
    connection.query(q, [departmentId], (err, result) => {
      if (err) reject(err);
      resolve(result);
    });
  });
};

const getCostOfAllDepartments = () => {
  const q = `
    select department.name, sum(role.salary) as total_cost from employee
    inner join role on employee.role_id = role.id
    inner join department on role.department_id = department.id
    group by department.name
    `;
  return new Promise((resolve, reject) => {
    connection.query(q, (err, result) => {
      if (err) reject(err);
      resolve(result);
    });
  });
};

module.exports = {
  createDepartment,
  getDepartments,
  getCostOfAllDepartments,
  getCostOfOneDepartment,
  deleteDepartment,
};
