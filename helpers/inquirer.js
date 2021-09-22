const inquirer = require('inquirer')
require('colors')

// These are the choices that are going to be used by questions  
const choices = [ 
    {
        name: `${'1.'.blue} Find a City`,
        value: 1
    },
    {
        name: `${'2.'.blue} History`,
        value: 2
    },
    {
        name: `${'0.'.blue} Back`,
        value: 0
    },
]

//This goes inside the prompt 
const questions = [{
    type: 'list',
    name: 'option',
    message: 'WHAT WOULD YOU LIKE TO DO?',
    choices
}]

const inquirerMenu = async() =>{
    console.log('========================='.blue)
    console.log("    WEATHER APPLICATION   ")
    console.log('========================= \n'.blue)
    
    const {option} = await inquirer.prompt(questions)
     
    return option
}

const pause = async () => {
    console.log('\n')
    await inquirer.prompt([
        {
            type: 'input',
            name: 'pause',
            message: `press ${'ENTER'.blue} to continue`
        }
    ])
}

const readInput = async (message) =>{
    const question = [{
        type: 'input',
        name: 'desc',
        message,
        validate: (value) =>{
            if (value.length === 0 ) {
                return "This should not be empty";
            }
            return true 
        }     
    }]
    console.clear()
    const {desc} = await inquirer.prompt(question)
    return desc
}

const listPlaces = async (places = []) => {
    
    const choices = places.map((place, n) => {
        const idx = `${n + 1}`.blue; 

        return {
            value: place.id, 
            name: `${idx} ${place.name}`
        }
    })

    choices.unshift({
        value: '0',
        name: '0'.blue + ' Cancel'
    })

    const questions = [{
        type: 'list',
        name: 'id',
        message: 'Choose A City',
        choices
    }];

    const {id} = await inquirer.prompt(questions)

    return id 
    
} 

const confirm = async (message) => {
    const questions = [{
        type: 'confirm',
        name: 'ok',
        message
    }];

    const {ok} = await inquirer.prompt(questions)
    return ok

}

const showAllListTask = async (tasks = []) => {
    
    const choices = tasks.map((task, i) => {
        const idx = `${i + 1}`.blue; 

        return {
            value: task.id, 
            name: `${idx} ${task.desc}`,
            checked: (task.completedBy) ? true : false
        }
    })

    const questions = [{
        type: 'checkbox',
        name: 'ids',
        message: 'choices',
        choices
    }];

    const {ids} = await inquirer.prompt(questions)

    return ids 
    
} 


module.exports = {
    inquirerMenu,
    pause,
    readInput, 
    listPlaces,
    confirm,
    showAllListTask
}