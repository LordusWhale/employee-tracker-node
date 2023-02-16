const {connection} = require('./dbFuntions')

const departments = [
    "Sales",
    "Engineering",
    "Finance",
    "Legal"
]

const roles = [
    {
        title: "Sales Lead",
        salary: 100000,
        department: 1
    },
    {
        title: "Salesperson",
        salary: 80000,
        department: 1
    },
    {
        title: "Lead Engineer",
        salary: 110000,
        department: 2
    },
    {
        title: "Software Engineer",
        salary: 100000,
        department: 2
    },
    {
        title: "Lead Accountant",
        salary: 125000,
        department: 3
    },
    {
        title: "Accountant",
        salary: 135000,
        department: 3
    },
    {
        title: "Legal Team Lead",
        salary: 130000,
        department: 4
    },
    {
        title: "Lawyer",
        salary: 120000,
        department: 4
    }, 
]

const employees = [
    {
        firstName: "John",
        lastName: "Doe",
        role: 1,
        manager: null
    },
    {
        firstName: "Bill",
        lastName: "Nye",
        role: 2,
        manager: 1
    },
    {
        firstName: "Joe",
        lastName: 'Blow',
        role: 2, 
        manager: 1
    },
    {
        firstName: "Kyle",
        lastName: 'Smith',
        role: 2, 
        manager: 1
    },
    {
        firstName: "John",
        lastName: "Johnson",
        role: 3,
        manager: null
    },
    {
        firstName: "Jane",
        lastName: "Brown",
        role: 4,
        manager: 5
    },
    {
        firstName: "Jeremy",
        lastName: "Miller",
        role: 4,
        manager: 5
    },
    {
        firstName: "Sam",
        lastName: "Green",
        role: 5,
        manager: null
    },
    {
        firstName: "Robert",
        lastName: "Adams",
        role: 6,
        manager: 8
    },
    {
        firstName: "Sally",
        lastName: "Jones",
        role: 6,
        manager: 8
    },
    {
        firstName: "Charles",
        lastName: "Hall",
        role: 7,
        manager: null
    },
    {
        firstName: "Mark",
        lastName: "Phillips",
        role: 8,
        manager: 11
    },
    {
        firstName: "Sara",
        lastName: "Davis",
        role: 8,
        manager: 11
    }
]

const populateEmployees = (firstName, lastName, roleId, manageId = null) => {
    return new Promise((resolve, reject) => {
        connection.query('INSERT INTO employee_db.employee (first_name, last_name, role_id, manager_id) VALUES (?, ?, ?, ?)', [firstName, lastName, roleId, manageId], (err, result)=>{
            if (err) reject(err);
            resolve(result);
        }
        )
    })
}
const populateDepartments = (name) => {
    return new Promise((resolve, reject) => {
        connection.query('INSERT INTO employee_db.department (name) VALUES (?)', [name], (err, result)=>{
            if (err) reject(err);
            resolve(result);
        }
        )
    })
}
const populateRoles = (title, salary, departmentId) => {
    return new Promise((resolve, reject) => {
        connection.query('INSERT INTO employee_db.role (title, salary, department_id) VALUES (?, ?, ?)', [title, salary, departmentId], (err, result)=>{
            if (err) reject(err);
            resolve(result);
        }
        )
    })
}

const populate = async () => {
    for (let i = 0; i < departments.length; i++) {
        await populateDepartments(departments[i]);
    }
    for (let i = 0; i < roles.length; i++) {
        await populateRoles(roles[i].title, roles[i].salary, roles[i].department);
    }
    for (let i = 0; i < employees.length; i++) {
        await populateEmployees(employees[i].firstName, employees[i].lastName, employees[i].role, employees[i].manager);
    }
}

populate();