const {
    readFile,
    writeFile
} = require('fs');
const {
    promisify
} = require('util');
const uuid = require('../utils/uuid');

const readFileAsync = promisify(readFile);
const writeFileAsync = promisify(writeFile);

const FILE_NAME = './src/fakeApi/presences.json';

const getFile = async function () {
    try {
        const dataJSON = await readFileAsync(`${FILE_NAME}`);
        const data = JSON.parse(dataJSON);
        return data.presences;
    } catch (e) {
        return [];
    }
}

const setFile = async function (data) {
    await writeFileAsync(FILE_NAME, JSON.stringify({ presences: data }));
}

const getDateBase = function (data) {
    if (data && data.length) {
        const lastDate = new Date(data[data.length - 1].exitTime);
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

        presences.push({
            _id: uuid(),
            presence,
            entryTime,
            exitTime,
        });
    }

    await setFile([
        ...dataFile,
        ...presences,
    ]);

    console.log(`Generated new ${amount} records to presences.json`)
}

const main = async function () {
    await generate(5, false);
    await generate(5, true);
    await generate(5, false);
    await generate(5, true);
    await generate(5, false);
    await generate(5, true);
    await generate(5, false);
    await generate(5, true);
    await generate(5, false);
    await generate(5, true);
    await generate(5, false);
    await generate(5, true);
}

main();