'use strict'

const fs = require('fs'), path = require('path')

let MainDir = __dirname
if (process.argv[2]) {
    MainDir = process.argv[2]
    try { fs.readdirSync(MainDir, 'utf8') }
    catch (err) {
        console.log(`"${MainDir}" is not a valid path.`)
        return
    }
}
const EventMatching = ReadDirFile('EventMatching.json'),
    StrSheet_Quest = ReadDirFile('StrSheet_Quest', 'dir')

console.time('Done')
GetAllFiles()
    .then(file => {
        fs.writeFileSync(path.join(MainDir, '..', 'vgs.json'), file, 'utf8')
        console.timeEnd('Done')
    })
    .catch(error => console.log(error))

function GetAllFiles() {
    return new Promise((resolve, reject) => {
        let newObj = {}, tempObj = {}

        for (const file of StrSheet_Quest) {
            const Rfile = require(path.join(MainDir, 'StrSheet_Quest', file))
            if (!Rfile.String) continue

            tempObj[Rfile.String[0].id] = Rfile.String[0].string
        }

        if (EventMatching)
            for (const eventGroup of EventMatching.EventGroup)
                for (const event of eventGroup.Event) {
                    let id
                    Object.keys(tempObj).forEach(key => {
                        if (key.toString().startsWith(event.questId.toString())) id = key
                    })

                    let str = tempObj[id]
                    if (typeof str !== 'string') throw new Error('questId could not be found! ' + event.questId)
                    str += ` [${str.split(/\s/).reduce((response, word) => response += word.slice(0, 1), '')} ${event.type === 'BattleField' ? 'bg' : event.type}]`
                    newObj[event.id] = str.toLowerCase()
                }

        newObj = JSON.stringify(newObj)
        if (newObj && newObj !== '[object Object]') resolve(newObj)
        else reject('Failed to parse.')
    })
}

function ReadDirFile(name, type) {
    let returnvalue
    try {
        if (!type) returnvalue = require(path.join(MainDir, name))
        else returnvalue = fs.readdirSync(path.join(MainDir, name))
    }
    catch {
        returnvalue = undefined
    }
    return returnvalue
}