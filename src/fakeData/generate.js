const {
    readFile,
    writeFile
} = require('fs');
const {
    promisify
} = require('util');
const Presence = require('./Presence');

const readFileAsync = promisify(readFile);
const writeFileAsync = promisify(writeFile);

const FILE_NAME = './src/fakeData/presences.json';

const getFile = async function () {
    try {
        const dataJSON = await readFileAsync(`${FILE_NAME}`);
        const data = JSON.parse(dataJSON);
        return data.map(value => new Presence(value));
    } catch (e) {
        return [];
    }
}

const setFile = async function (data) {
    await writeFileAsync(FILE_NAME, JSON.stringify(data));
}

const getDateBase = function (data) {
    if (data && data.length) {
        const lastDate = data[data.length - 1].dateSaida;
        if (!isNaN(lastDate))
            return lastDate;
    }
    return new Date();
}

const generate = async function (amount = 1, presence = false) {
    const dataFile = await getFile();
    const date = getDateBase(dataFile);

    presences = [];
    for (let index = 0; index < amount; index++) {
        const entryTime = new Date(date);
        const exitTime = new Date(date.setSeconds(date.getSeconds() + 1));
        date.setMinutes(date.getMinutes() + 1);

        presences.push(new Presence({
            _id: Date.now(),
            presence,
            entryTime,
            exitTime,
        }));
    }

    await setFile([
        ...dataFile,
        ...presences,
    ]);

    console.log(`Generated new ${amount} records to presences.json`)
}

const main = async function () {
    await generate(50, false);
    await generate(50, true);
    await generate(50, false);
    await generate(50, true);
    await generate(50, false);
    await generate(50, true);
    await generate(50, false);
    await generate(50, true);
    await generate(50, false);
    await generate(50, true);
    await generate(50, false);
    await generate(50, true);
}

main();