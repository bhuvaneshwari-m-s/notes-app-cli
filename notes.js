const fs = require('fs')
const chalk = require('chalk')

const addNotes = (title, body) =>
{
    const notes = loadNotes()
    // const duplicateNotes = notes.filter(function(note){
    //     return note.title === title
    // }) 
    //const duplicateNotes = notes.filter((note) => note.title === title)  // this is inefficient 
    const duplicateNotes = notes.find((note) => note.title === title)
    // debug if things didn't work properly
    // console.log(duplicateNotes)
    // console.log(title)

    //or else you can use the in built debugger 
    // to make use of debugger cd should be node --inspect-brk app.js --title="courses" --body="node.js"
    //debugger
    if(!duplicateNotes){
        notes.push({
            title : title,
            body  : body
        })
        console.log(chalk.green.inverse('New notes added!'))
    }
    else{
        console.log(chalk.red.inverse('No title taken!'))
    }
    saveNotes(notes)
}

const removeNotes = (title) =>
{
    const notes = loadNotes()
    const notesToKeep = notes.filter((note) => note.title !== title)
    if(notes.length > notesToKeep.length)
    {
        console.log(chalk.green.inverse('notes removed'))
        saveNotes(notesToKeep)
    }
    else{
        console.log(chalk.red.inverse('no not found!'))
    }
}

const listNotes = () => {
    const notes = loadNotes()
    console.log(chalk.inverse('your notes...'))
    notes.forEach((note) => {
        console.log(note)
    })
}

const readNotes = (title) =>{
    const notes = loadNotes()
    const note = notes.find((note) => note.title === title)
    if(note){
        console.log(chalk.green.inverse(note.title))
        console.log(note.body)
    }else{
        console.log(chalk.red.inverse('note not found'))
    } 
}

const saveNotes = (notes) =>
    {
        const dataJson = JSON.stringify(notes)
        fs.writeFileSync('notes.json', dataJson)
    }
    
    const loadNotes = () =>
    {
        try
        {
            const dataBuffer = fs.readFileSync('notes.json')
            const dataJson = dataBuffer.toString()
            return JSON.parse(dataJson)
        }catch(e){
            return []
        }
    
    }

module.exports = ({
    addNotes : addNotes,
    removeNotes : removeNotes,
    listNotes : listNotes,
    readNotes : readNotes
})