import inquirer from "inquirer"
import * as mysqlHelpers from './mysql-helpers.js'

let connection
const init = async () => {
    connection = await mysqlHelpers.startConnection()
}
init()

export const showMainMenu = async () => {
    const viewDeps = 'View All Departments'
    const viewRoles = 'View All Roles'
    const viewEmp = 'View All Employees'
    const addDep = 'Add a Department'
    const addRole = 'Add a Role'
    const addEmp = 'Add an Employee'
    const quit = 'Quit'

    const mainMenuQuestions = [
        {
            type: 'list',
            name: 'menuChoice',
            message: 'Main Menu - What do you want to do?',
            choices:[
                viewDeps,
                viewRoles,
                viewEmp,
                addDep,
                addRole,
                addEmp,
                quit
            ]
        }
    ]

    let {menuChoice} = await inquirer.prompt(mainMenuQuestions)

    switch (menuChoice) {
        case viewDeps:
            console.table(await mysqlHelpers.pullDepartmentTable(connection))
            showMainMenu()
            break;
        case viewRoles:
            console.table(await mysqlHelpers.pullRoleTable(connection))
            showMainMenu()
            break;
        case viewEmp:
            console.table(await mysqlHelpers.pullEmpTable(connection))
            showMainMenu()
            break;
        case addDep:
            showAddDepPrompt()
            break;
        case addEmp:
            showAddEmployeePrompt()
            break;
        case quit:
            console.log(`You've Quit`)
            mysqlHelpers.endConnection(connection)
            break;
    
        default:
            break;
    }
}

const showAddDepPrompt = async () => {

    console.log(`Okay, here's the departments we have so far:`)
    console.table(await mysqlHelpers.pullDepartmentTable(connection))

    const addDepQuestions = [
        {
            type: 'input',
            name: 'departmentName',
            message: 'What is the name of the new department'
        }
    ]

    let {departmentName} = await inquirer.prompt(addDepQuestions)

    let id = await mysqlHelpers.addDepartment(connection, departmentName)
    console.log(`Great, we've added ${departmentName}. It's ID is ${id}`)
    showMainMenu()
    return
}

const showAddEmployeePrompt = async () => {

    console.log(`Tell us about your new hire.`)
    let managerArr = await mysqlHelpers.pullEmpTable(connection, true)
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
            choices: [
                'test',
                'test 3'
            ]
        },
        {
            type: 'list',
            name: 'manager_id',
            message: 'Pick their Manager:',
            choices: managerArr
        }
    ]

    let empDetails = await inquirer.prompt(addDepQuestions)

    // let id = await mysqlHelpers.addEmployee(connection, empDetails)
    let id = 9999999999
    console.log(`We've added ${empDetails.fName} ${empDetails.lName}. their ID is ${id}`)
    showMainMenu()
    return
}
