import inquirer from "inquirer"
import * as myQueries from './sql-connection.js'
// eslint-disable-next-line no-unused-vars
import cTable from 'console.table'

let connection
const init = async () => {
    connection = await myQueries.startConnection()
}
init()

export const showMainMenu = async () => {
    const viewDeps = 'View All Departments'
    const viewRoles = 'View All Roles'
    const viewEmp = 'View All Employees'
    const addDep = 'Add a Department'
    const addRole = 'Add a Role'
    const addEmp = 'Add an Employee'
    const updateEmpRole = `Update an Employee's Role`
    const depBudget = `Show Department Budgets`
    const quit = 'Quit'

    const mainMenuQuestions = [
        {
            type: 'list',
            name: 'menuChoice',
            message: 'Main Menu - What do you want to do?',
            choices:[
                viewDeps,
                addDep,
                viewRoles,
                addRole,
                viewEmp,
                addEmp,
                updateEmpRole,
                depBudget,
                quit
            ]
        }
    ]

    let {menuChoice} = await inquirer.prompt(mainMenuQuestions)

    switch (menuChoice) {
        case viewDeps:
            console.table(await myQueries.pullDepartmentTable(connection))
            showMainMenu()
            break;
        case viewRoles:
            console.table(await myQueries.pullRoleTable(connection))
            showMainMenu()
            break;
        case viewEmp:
            console.table(await myQueries.pullEmpTable(connection))
            showMainMenu()
            break;
        case addDep:
            showAddDepPrompt()
            break;
        case addRole:
            showAddRolePrompt()
            break;
        case addEmp:
            showAddEmployeePrompt()
            break;
        case updateEmpRole:
            showUpdateEmpRole()
            break;
        case depBudget:
            console.table(await myQueries.pullDepBudgets(connection))
            showMainMenu()
            break;
        case quit:
            console.log(`Bye! 👋`)
            myQueries.endConnection(connection)
            break;
    
        default:
            break;
    }
}

const showAddDepPrompt = async () => {

    console.log(`Okay, here's the departments we have so far:`)
    console.table(await myQueries.pullDepartmentTable(connection))

    const addDepQuestions = [
        {
            type: 'input',
            name: 'departmentName',
            message: 'What is the name of the new department'
        }
    ]

    let {departmentName} = await inquirer.prompt(addDepQuestions)

    let id = await myQueries.addDepartment(connection, departmentName)
    console.log(`Great, we've added ${departmentName}. It's ID is ${id}`)
    showMainMenu()
    return
}

const showAddRolePrompt = async () => {
    console.log(`New Role? Let's begin.`)
    let departmentArr = await myQueries.pullDepartmentTable(connection, true)
    const addDepQuestions = [
        {
            type: 'input',
            name: 'title',
            message: `What's the title?`
        },
        {
            type: 'list',
            name: 'dep_id',
            message: 'Which department does it belong to:',
            choices: departmentArr
        },
        {
            type: 'input',
            name: 'salary',
            message: 'Salary?'
        }
    ]

    let roleDetails = await inquirer.prompt(addDepQuestions)

    let id = await myQueries.addRole(connection, roleDetails)
    console.log(`We've added ${roleDetails.title}. Its ID is ${id}.`)
    showMainMenu()
    return
}

const showAddEmployeePrompt = async () => {

    console.log(`Tell us about your new hire.`)
    let managerArr = await myQueries.pullEmpTable(connection, true)
    let rolesArr = await myQueries.pullRoleTable(connection, true)
    const addDepQuestions = [
        {
            type: 'input',
            name: 'fName',
            message: 'What is the First Name of the new employee?'
        },
        {
            type: 'input',
            name: 'lName',
            message: 'What is the Last Name of the new employee?'
        },
        {
            type: 'list',
            name: 'role_id',
            message: 'Pick their role:',
            choices: rolesArr
        },
        {
            type: 'list',
            name: 'manager_id',
            message: 'Pick their Manager:',
            choices: managerArr
        }
    ]

    let empDetails = await inquirer.prompt(addDepQuestions)

    let id = await myQueries.addEmployee(connection, empDetails)
    console.log(`We've added ${empDetails.fName} ${empDetails.lName}. Their ID is ${id}.`)
    showMainMenu()
    return
}

const showUpdateEmpRole = async () => {
    let empArr = await myQueries.pullEmpTable(connection, true)
    let rolesArr = await myQueries.pullRoleTable(connection, true)
    const addDepQuestions = [
        {
            type: 'list',
            name: 'emp_id',
            message: 'Which employee needs the update:',
            choices: empArr
        },
        {
            type: 'list',
            name: 'role_id',
            message: 'What is the new role?',
            choices: rolesArr
        }
    ]

    let {emp_id, role_id} = await inquirer.prompt(addDepQuestions)

    let updated = await myQueries.updateEmpRole(connection, emp_id, role_id)
    console.log(`Got it. Here's that employee updated:`)
    console.table(updated)
    showMainMenu()
    return
}
