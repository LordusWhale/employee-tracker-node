const inquirer = require("inquirer");
const { getDepartments, deleteDepartment } = require("../db/department");
const {
  getEmployeeNameRoleDepartment,
  deleteEmployee,
} = require("../db/employee");
const { getRoles, deleteRole } = require("../db/role");

const deleteDepartmentQuestions = async () => {
  const departments = await getDepartments();
  const { departmentId } = await inquirer.prompt({
    name: "departmentId",
    type: "list",
    message: "Which department do you want to delete?",
    choices: departments.map((department) => ({
      name: department.name,
      value: department.id,
    })),
  });
  await deleteDepartment(departmentId);
};

const deleteRoleQuestions = async () => {
  const roles = await getRoles();
  const { roleId } = await inquirer.prompt({
    name: "roleId",
    type: "list",
    message: "Which role do you want to delete?",
    choices: roles.map((role) => ({
      name: role.title,
      value: role.id,
    })),
  });
  await deleteRole(roleId);
};

const deleteEmployeeQuestions = async () => {
  const employees = await getEmployeeNameRoleDepartment();
  const { employeeId } = await inquirer.prompt({
    name: "employeeId",
    type: "list",
    message: "Which employee do you want to delete?",
    choices: employees.map((employee) => ({
      name: `${employee.first_name} ${employee.last_name} (${employee.role})`,
      value: employee.id,
    })),
  });
  await deleteEmployee(employeeId);
};

module.exports = {
  deleteDepartmentQuestions,
  deleteRoleQuestions,
  deleteEmployeeQuestions,
};
