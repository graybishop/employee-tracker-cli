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
        case quit:
            console.log(`You've Quit`)
            mysqlHelpers.endConnection(connection)
            break;
    
        default:
            break;
    }
}

