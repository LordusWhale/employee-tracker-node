const inquirer = require("inquirer");
const { getDepartments, createDepartment } = require("../db/department");
const { createEmployee, getEmployees, getEmployeeNameRoleDepartment } = require("../db/employee");
const { createRole, getRoles } = require("../db/role");

const createDepartmentQuestions = async () => {
  const { name } = await inquirer.prompt({
    name: "name",
    type: "input",
    message: "What is the name of the department?",
  });
  await createDepartment(name);
};

const createRoleQuestions = async () => {
  const departments = await getDepartments();
  const { title, salary, departmentId } = await inquirer.prompt([
    {
      name: "title",
      type: "input",
      message: "What is the title of the role?",
    },
    {
      name: "salary",
      type: "input",
      message: "What is the salary of the role?",
    },
    {
      name: "departmentId",
      type: "list",
      message: "What is the department of the role?",
      choices: departments.map((department) => ({
        name: department.name,
        value: department.id,
      })),
    },
  ]);
  await createRole(title, salary, departmentId);
};

const createEmployeeQuestions = async () => {
  const roles = await getRoles();
  const employees = await getEmployeeNameRoleDepartment();

  const { firstName, lastName, roleId, managerId } = await inquirer.prompt([
    {
      name: "firstName",
      type: "input",
      message: "What is the first name of the employee?",
    },
    {
      name: "lastName",
      type: "input",
      message: "What is the last name of the employee?",
    },
    {
      name: "roleId",
      type: "list",
      message: "What is the role of the employee?",
      choices: roles.map((role) => ({
        name: role.title,
        value: role.id,
      })),
    },
    {
      name: "managerId",
      type: "list",
      message: "Who is the manager of the employee?",
      choices: employees.map((employee) => ({
        name: `${employee.first_name} ${employee.last_name} (${employee.role})`,
        value: employee.id,
      })),
    },
  ]);
  await createEmployee(firstName, lastName, roleId, managerId);
};

module.exports = {
  createDepartmentQuestions,
  createRoleQuestions,
  createEmployeeQuestions,
};
