const inquirer = require("inquirer");
const {
  getDepartments,
  getCostOfOneDepartment,
  getCostOfAllDepartments,
} = require("../db/department");
const {
  getEmployees,
  getEmployeeWhoIsManager,
  getEmployeeByManager,
  getEmployeeByDepartment,
} = require("../db/employee");
const { getRoles } = require("../db/role");

const viewAllEmployees = async () => {
  const employees = await getEmployees();
  console.table(employees);
};

const viewAllDepartments = async () => {
  const departments = await getDepartments();
  console.table(departments);
};

const viewAllRoles = async () => {
  const roles = await getRoles();
  console.table(roles);
};

const viewEmployeeByManager = async () => {
  const managers = await getEmployeeWhoIsManager();
  const { managerId } = await inquirer.prompt([
    {
      name: "managerId",
      type: "list",
      message: "Which manager's employees would you like to see?",
      choices: managers.map((manager) => ({
        name: `${manager.first_name} ${manager.last_name} (${manager.role})`,
        value: manager.id,
      })),
    },
  ]);
  console.log(managerId);
  const employees = await getEmployeeByManager(managerId);

  console.table(employees);
};

const viewEmployeeByDepartment = async () => {
  const departments = await getDepartments();
  const { departmentId } = await inquirer.prompt([
    {
      name: "departmentId",
      type: "list",
      message: "Which department's employees would you like to see?",
      choices: departments.map((department) => ({
        name: `${department.name}`,
        value: department.id,
      })),
    },
  ]);
  const employees = await getEmployeeByDepartment(departmentId);
  console.table(employees);
};

const viewTotalCostOfDepartment = async () => {
  const departments = await getDepartments();
  const { departmentId } = await inquirer.prompt([
    {
      name: "departmentId",
      type: "list",
      message: "Which department's total cost would you like to see?",
      choices: [
        { name: "View all", value: null },
        ...departments.map((department) => ({
          name: `${department.name}`,
          value: department.id,
        })),
      ],
    },
  ]);
  let departmentCost;
  if (departmentId) {
    departmentCost = await getCostOfOneDepartment(departmentId);
  } else {
    departmentCost = await getCostOfAllDepartments();
  }
  console.table(departmentCost);
};



module.exports = {
  viewAllEmployees,
  viewAllDepartments,
  viewAllRoles,
  viewEmployeeByManager,
  viewTotalCostOfDepartment,
  viewEmployeeByDepartment
};
