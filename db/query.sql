-- Viewing all roles -- 

SELECT role.id, role.title, role.department_id, department.name, role.salary
FROM role
INNER JOIN department
ON role.department_id = department.id;

--  Viewing all employees; currently missing manager_id -- 

SELECT e.id, e.first_name, e.last_name, role.title, department.name AS department, role.salary, m.first_name AS manager
FROM (((employee e
LEFT JOIN employee m ON e.manager_id = m.id)
INNER JOIN role ON role.id = e.role_id) 
INNER JOIN department ON role.department_id = department.id);