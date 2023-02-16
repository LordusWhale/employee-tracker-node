const inquirer = require("inquirer");
const {
  viewAllEmployees,
  viewAllDepartments,
  viewAllRoles,
  viewEmployeeByManager,
  viewTotalCostOfDepartment,
  viewEmployeeByDepartment,
} = require("./src/getFromDb");
const {
  createDepartmentQuestions,
  createEmployeeQuestions,
  createRoleQuestions,
} = require("./src/createFromDb");
const {
  updateEmployeeManagerQuestions,
  updateEmployeeRoleQuestions,
  updateRoleDepartentQuestions,
} = require("./src/updateFromDb");

const {
  deleteDepartmentQuestions,
  deleteRoleQuestions,
  deleteEmployeeQuestions,
} = require("./src/deleteFromDb");
const { connection } = require("./db/db.connect");
const { setUpDb } = require("./db/setUpDb");

async function start() {
  await setUpDb();
  const { choice } = await inquirer.prompt({
    name: "choice",
    type: "list",
    message: "What would you like to do?",
    choices: [
      "View all employees",
      "View all departments",
      "View all roles",
      "View employee by manager",
      "View employee by department",
      "View total cost of department",
      "Add department",
      "Add role",
      "Add employee",
      "Delete department",
      "Delete role",
      "Delete employee",
      "Update role department",
      "Update employee role",
      "Update employee manager",
      "Exit",
    ],
  });

  switch (choice) {
    case "View all employees":
      await viewAllEmployees();
      return start();
    case "View all departments":
      await viewAllDepartments();
      return start();
    case "View all roles":
      await viewAllRoles();
      return start();
    case "View employee by manager":
      await viewEmployeeByManager();
      return start();
    case "View employee by department":
      await viewEmployeeByDepartment();
      return start();
    case "View total cost of department":
      await viewTotalCostOfDepartment();
      return start();
    case "Add department":
      await createDepartmentQuestions();
      return start();
    case "Add role":
      await createRoleQuestions();
      return start();
    case "Add employee":
      await createEmployeeQuestions();
      return start();
    case "Delete department":
      await deleteDepartmentQuestions();
      return start();
    case "Delete role":
      await deleteRoleQuestions();
      return start();
    case "Delete employee":
      await deleteEmployeeQuestions();
      return start();
    case "Update role department":
      await updateRoleDepartentQuestions();
      return start();
    case "Update employee role":
      await updateEmployeeRoleQuestions();
      return start();
    case "Update employee manager":
      await updateEmployeeManagerQuestions();
      return start();
    case "Exit":
      connection.end();
      break;
  }
}
start();
