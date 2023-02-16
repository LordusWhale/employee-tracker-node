const { connection } = require("./db.connect");

const createEmployee = (firstName, lastName, roleId, managerId) => {
  return new Promise((resolve, reject) => {
    connection.query(
      "INSERT INTO employee_db.employee (first_name, last_name, role_id, manager_id) VALUES (?, ?, ?, ?)",
      [firstName, lastName, roleId, managerId],
      (err, result) => {
        if (err) reject(err);
        resolve(result);
      }
    );
  });
};

const getEmployees = () => {
  const q = `select employee.first_name, employee.last_name, lower_role.title, lower_role.salary, manager.first_name as manager_first_name, manager.last_name as manage_last_name, upper_role.title as manager_title from employee 
  left JOIN role as lower_role on employee.role_id = lower_role.id 
  left join employee as manager on employee.manager_id = manager.id
  left JOIN role as upper_role on manager.role_id = upper_role.id
  ORDER BY employee.last_name
      `;
  return new Promise((resolve, reject) => {
    connection.query(q, (err, result) => {
      if (err) reject(err);
      resolve(result);
    });
  });
};
const deleteEmployee = (employeeId) => {
  return new Promise((resolve, reject) => {
    connection.query(
      "DELETE FROM employee_db.employee WHERE id = ?",
      [employeeId],
      (err, result) => {
        if (err) reject(err);
        resolve(result);
      }
    );
  });
};

const getEmployeeNameRoleDepartment = async () => {
  const q = `
    select employee.id, employee.first_name, employee.last_name, role.title as role, department.name as department from employee
    left join role on employee.role_id = role.id
    left join department on role.department_id = department.id
    `;
  return new Promise((resolve, reject) => {
    connection.query(q, (err, result) => {
      if (err) reject(err);
      resolve(result);
    });
  });
};

const getEmployeeWhoIsManager = () => {
  const q = `
    select DISTINCT employee.id, employee.first_name, employee.last_name, role.title as role from employee
    inner join employee as sub on employee.id = sub.manager_id
    inner join role on employee.role_id = role.id
    `;
  return new Promise((resolve, reject) => {
    connection.query(q, (err, result) => {
      if (err) reject(err);
      resolve(result);
    });
  });
};

const getEmployeeByManager = async (managerId) => {
  const q =
    "select employee.first_name, employee.last_name from employee where employee.manager_id = (?)";
  return new Promise((resolve, reject) => {
    connection.query(q, [managerId], (err, result) => {
      if (err) reject(err);
      resolve(result);
    });
  });
};

const getEmployeeByDepartment = (departmentId) => {
  const q = `
  select employee.first_name, role.title from employee 
  inner join role on employee.role_id = role.id
  inner join department on role.department_id = department.id
  where role.department_id = (?)
  `;
  return new Promise((resolve, reject) => {
    connection.query(q, [departmentId], (err, result) => {
      if (err) reject(err);
      resolve(result);
    });
  });
};

const updateEmployeeManger = async (employeeId, managerId) => {
  return new Promise((resolve, reject) => {
    connection.query(
      "UPDATE employee_db.employee SET manager_id = ? WHERE id = ?",
      [managerId, employeeId],
      (err, result) => {
        if (err) reject(err);
        resolve(result);
      }
    );
  });
};

const updateEmployeeRole = async (employeeId, roleId) => {
  return new Promise((resolve, reject) => {
    connection.query(
      "UPDATE employee_db.employee SET role_id = ? WHERE id = ?",
      [roleId, employeeId],
      (err, result) => {
        if (err) reject(err);
        resolve(result);
      }
    );
  });
};

module.exports = {
  createEmployee,
  getEmployees,
  getEmployeeNameRoleDepartment,
  updateEmployeeManger,
  updateEmployeeRole,
  getEmployeeWhoIsManager,
  getEmployeeByManager,
  getEmployeeByDepartment,
  deleteEmployee,
};
