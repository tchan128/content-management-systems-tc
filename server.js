// const express = require('express');
const inquirer = require(`inquirer`);
// Import and require mysql2
const mysql = require('mysql');

// Connect to database
const db = mysql.createConnection(
  {
    host: 'localhost',
    user: 'root',
    password: 'TCsak128@!', // Change this?
    database: 'employee_db'
  },
  console.log(`Success! Connected to the employee_db database.`)
);

// Prompts used in inquirer in the management system

const dbActions = [
  {
    type: "list",
    choices: ["View All Employees", "Add Employee", "Update Employee Role", "View All Roles", "Add Role", "View All Departments", "Add Department", "Quit"],
    message: "What would you like to do?",
    name: "action",
  }
]

// Prompts used when adding department

const addDep = [
  {
    type: "input",
    message: "What is the name of the department?",
    name: "department",
  }
]

const updateEmployee = [
  {
      type: "list",
      message: "Which employee's role do you want to update?",
      choices: [], // EMPLOYEE
      name: "employee",
  },
  {
    type: "list",
    message: "Which role do you want to assign the selected employee?",
    choices: [], // ROLE
    name: "role",
  }
]

function dbStart() {
  inquirer
      .prompt (dbActions)
      .then((responses) => {
        const systemAction = responses.action;

        // If user selects "Quit" it will end inquirer

        if (systemAction === "Quit") {
          process.exit();
        
        // If user selects "View All Employees" it view the employee table

        } else if (systemAction === "View All Employees") {

          const sql = `SELECT e.id, e.first_name, e.last_name, role.title, department.name AS department, role.salary, CONCAT(m.first_name, ' ', m.last_name) AS manager
          FROM (((employee e
          LEFT JOIN employee m ON e.manager_id = m.id)
          INNER JOIN role ON role.id = e.role_id) 
          INNER JOIN department ON role.department_id = department.id)`;

          db.query(sql, function (err, result) {
            if (err) throw err;
            console.table(result);

            // Start inquirer again  

            dbStart();
          });
        
        // If user selects "View All Departments" it view the department table
    
        } else if (systemAction === "View All Departments") {
          const sql = `SELECT * FROM department;`

          db.query(sql, function (err, result) {
            if (err) throw err;
            console.table(result);

            // Start inquirer again  

            dbStart();
          });

        // If user selects "View All Roles" it view the role table

        } else if (systemAction === "View All Roles") {
          const sql = `SELECT role.id, role.title, department.name, role.salary FROM role
          INNER JOIN department ON role.department_id = department.id;`

          db.query(sql, function (err, result) {
            if (err) throw err;
            console.table(result);

            // Start inquirer again

            dbStart();
          });

        // If user selects "Add Department" they can add a new department

        } else if (systemAction === "Add Department") {

          inquirer
            .prompt (addDep)
            .then((responses) => {
              const dep = JSON.stringify(responses.department)
              const sql = `INSERT INTO department (name)
              VALUES (${dep})`

              db.query(sql, function (err, result) {
                if (err) throw err;
              });
                console.log(`Success! Added ${dep} to the database`)

                // Start inquirer again 

                dbStart();
            })

        // If user selects "Add Role" they can add a new role      

        } else if (systemAction === "Add Role") {

          const curDept = `SELECT name FROM department;`;

          db.query(curDept, function (err, result) {
            if (err) throw err;

          inquirer
            .prompt ([
            {
                type: "input",
                message: "What is the name of the role?",
                name: "title",
            },
            {
              type: "input",
              message: "What is the salary of the role?",
              name: "salary",
            },          
            {
              type: "list",
              choices: result,
              message: "What department does the role belong to?",
              name: "department",
            }
            ])
            .then((responses) => {

              const dept = `SELECT id FROM department WHERE name='${responses.department}';`

              db.query(dept, function (err, result) {
                if (err) throw err;
                const title = JSON.stringify(responses.title);
                const salary = JSON.stringify(responses.salary);
                const sql = `INSERT INTO role (title, department_id, salary)
                VALUES (${title}, ${JSON.stringify(result[0].id)}, ${salary})`
  
                db.query(sql, function (err, result) {
                  if (err) throw err;
                  });
  
                  console.log(`Success! Added ${title} to the database`)
  
                  // Start inquirer again
  
                  dbStart();
                });
              });
          });

        // If user choses "Add Employee" they can add a new employee 
              
        } else if (systemAction === "Add Employee") {

          const allRoles = `SELECT title FROM role;`;

          db.query(allRoles, function (err, result) {
            if (err) throw err;

            inquirer
              .prompt ([
                {
                  type: "input",
                  message: "What is the employee's first name?",
                  name: "first_name",
              },
              {
                type: "input",
                message: "What is the employee's last name?",
                name: "last_name",
              },          
              {
                type: "list",
                choices: result,
                message: "What is the employee's role?",
                name: "role",
              }, 
              {
                type: "list",
                choices: [], // DEPARTMENT 
                message: "What is the employee's manager?",
                name: "manager",
              }, 
              ])
              .then((responses) => {

                const role = `SELECT id FROM role WHERE name='${responses.role}';`

                db.query(sql, function (err, result) {
                const first_name = JSON.stringify(responses.first_name);
                const last_name = JSON.stringify(responses.last_name);
                const manager = JSON.stringify(responses.manager);
                const sql = `INSERT INTO employee (first_name, last_name, role_id, manager_id)
                VALUES (${first_name}, ${last_name}, ${JSON.stringify(role[0].id)}, ${salary})`

                  if (err) throw err;
                  });
                  console.log(`Success! Added ${first_name} ${last_name} to the database`);

                  // Start inquirer again

                  dbStart();
                })
          });
        
        // If user chooses "Update Employee Role" they can update an employee

        } else if (systemAction === "Update Employee Role") {

          inquirer
            .prompt (updateEmployee)
            .then((responses) => {
              const employee = JSON.stringify(responses.employee);
              const role = JSON.stringify(responses.role);
              const sql = `INSERT INTO role (first_name, last_name, role_id, manager_id) 
              VALUES (${title}, ${dep}, ${salary})` // CHANGE THIS

              db.query(sql, function (err, result) {
                if (err) throw err;
                });
                console.log(`Success! Updated ${employee} role to ${role}`);

                // Start inquirer again

                dbStart();
              })
        }

      });
};


dbStart();