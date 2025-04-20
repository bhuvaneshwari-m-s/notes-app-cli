// const getNotes = require('./notes.js') // calls a file which we have created to store the return value of that
// const msg = getNotes()
// console.log(msg)

// //validator
// const validator = require('validator') // similaly calling validator package 
// console.log(validator.isURL('https/mead.io')) 
// console.log(validator.isEmail('ganesha@example.com')) 

// //chalk
// const chalk = require('chalk') // calling a chalk package
// console.log(chalk.green.bold.inverse.underline('hello world'))

// //executing nodemon helps us to automatically run the program after saving.

// console.log(process.argv)
// const command = process.argv[2] // process.argv is an array argv stands for argument vector
// if(command === 'add')
// {
//     console.log('Adding Notes!')
// }
// else if(command == 'remove')
// {
//     console.log('Remove notes!')
// }

//yargs
// const yargs = require('yargs')
const chalk = require('chalk')
const yargs = require('yargs')
const notes = require('./notes.js')



yargs.version('1.1.0')
//add, remove,list, read
//creating add command // call : node app.js add --title="t" --body="b"
//similarly remove, list and read
yargs.command({
    command : 'add',
    describe : 'add a note',
    builder : {
        title : {
            describe : 'note title',
            demandOption : true , 
            type : 'string'
        },
        body : {
            describe : 'Note body',
            demandOption : true,
            type : 'string'
        }
    },
    handler(argv){
        notes.addNotes(argv.title , argv.body)
    }
 })
 yargs.command({
    command : 'remove',
    describe : 'remove a note',
    builder :{
        title : {
            describe : 'Note title',
            demandOption : true,
            type : 'string'
        }
    },
    handler(argv) {
        notes.removeNotes(argv.title)
    }
 })
 yargs.command({
    command : 'list',
    describe : 'listing the notes',
    handler() {
        notes.listNotes()
    }
 })
 yargs.command({
    command : 'read',
    describe : 'read a note',
    builder : {
        title : {
            describe : 'Note title',
            demandOption : true,
            type : 'string'
        }
    },
    handler(argv) {
        notes.readNotes(argv.title)
    }
 })
// //console.log(yargs.argv) // alternative yargs.parse()
yargs.parse()

