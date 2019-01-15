import axios from 'axios';
import Presence from '../model/Presence';

const path = 'http://localhost:3001/presences';

const get = async () => {
    try {
        const {
            data
        } = await axios.get(path);
        return data.map(item => new Presence(item));
    } catch (e) {
        throw Error('Erro ao buscar presenças: ');
    }
}

const post = async (presence) => {
    try {
        await axios.post(path, JSON.stringify(presence));
    } catch (e) {
        console.log('Erro ao postar presença: ', e);
    }
}

export {
    get,
    post
}