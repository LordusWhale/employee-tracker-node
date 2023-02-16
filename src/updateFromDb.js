const inquirer = require("inquirer");
const { getDepartments } = require("../db/department");
const {
  getEmployeeNameRoleDepartment,
  updateEmployeeManger,
  updateEmployeeRole,
} = require("../db/employee");
const { getRoles, updateRoleDepartment } = require("../db/role");

const updateEmployeeManagerQuestions = async () => {
  const employees = await getEmployeeNameRoleDepartment();
  const { employeeId, managerId } = await inquirer.prompt([
    {
      name: "employeeId",
      type: "list",
      message: "Which employee do you want to update?",
      choices: employees.map((employee) => ({
        name: `${employee.first_name} ${employee.last_name} (${employee.role})`,
        value: employee.id,
      })),
    },
    {
      name: "managerId",
      type: "list",
      message: "Who is the new manager?",
      choices: [
        { name: "No manager", value: null },
        ...employees.map((employee) => ({
          name: `${employee.first_name} ${employee.last_name} (${employee.role})`,
          value: employee.id,
        })),
      ],
    },
  ]);
  await updateEmployeeManger(employeeId, managerId);
};

const updateEmployeeRoleQuestions = async () => {
  const employees = await getEmployeeNameRoleDepartment();
  const roles = await getRoles();
  const { employeeId, roleId } = await inquirer.prompt([
    {
      name: "employeeId",
      type: "list",
      message: "Which employee do you want to update?",
      choices: employees.map((employee) => ({
        name: `${employee.first_name} ${employee.last_name} (${employee.role})`,
        value: employee.id,
      })),
    },
    {
      name: "roleId",
      type: "list",
      message: "What is the new role?",
      choices: roles.map((role) => ({
        name: `${role.title} (${role.salary})`,
        value: role.id,
      })),
    },
  ]);
  await updateEmployeeRole(employeeId, roleId);
};

const updateRoleDepartentQuestions = async () => {
  const roles = await getRoles();
  const departments = await getDepartments();
  const { roleId, departmentId } = await inquirer.prompt([
    {
      name: "roleId",
      type: "list",
      message: "Which role do you want to update?",
      choices: roles.map((role) => ({
        name: `${role.title} (${role.salary}) - ${role.department}`,
        value: role.id,
      })),
    },
    {
      name: "departmentId",
      type: "list",
      message: "What is the new department?",
      choices: departments.map((department) => ({
        name: department.name,
        value: department.id,
      })),
    },
  ]);
  await updateRoleDepartment(roleId, departmentId);
};


module.exports = {
  updateEmployeeManagerQuestions,
  updateEmployeeRoleQuestions,
  updateRoleDepartentQuestions,
};
