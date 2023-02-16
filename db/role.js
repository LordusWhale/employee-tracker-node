const { connection } = require("./db.connect");

const createRole = (title, salary, departmentId) => {
  return new Promise((resolve, reject) => {
    connection.query(
      "INSERT INTO employee_db.role (title, salary, department_id) VALUES (?, ?, ?)",
      [title, salary, departmentId],
      (err, result) => {
        if (err) reject(err);
        resolve(result);
      }
    );
  });
};

const getRoles = () => {
  const q = `
    select role.id, title, salary, department.name as department from role left join department on role.department_id = department.id ORDER BY role.id
    `;
  return new Promise((resolve, reject) => {
    connection.query(q, (err, result) => {
      if (err) reject(err);
      resolve(result);
    });
  });
};

const deleteRole =  (roleId) => {
  return new Promise((resolve, reject) => {
    connection.query(
      "DELETE FROM employee_db.role WHERE id = ?",
      [roleId],
      (err, result) => {
        if (err) reject(err);
        resolve(result);
      }
    );
  });
};
const updateRoleDepartment = (roleId, departmentId) => {
  return new Promise((resolve, reject) => {
    connection.query(
      "UPDATE employee_db.role SET department_id = ? WHERE id = ?",
      [departmentId, roleId],
      (err, result) => {
        if (err) reject(err);
        resolve(result);
      }
    );
  });
};

module.exports = { createRole, getRoles, deleteRole, updateRoleDepartment };
