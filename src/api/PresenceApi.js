import axios from 'axios';
import Presence from '../model/Presence';
import { path } from './config';

const get = async (query) => {
    try {
        const {
            data
        } = await axios.get(`${path}/presences?${query}`);
        return {
            ...data,
            result: data.result.map(item => new Presence(item))
        }
    } catch (e) {
        throw Error('Erro ao buscar presenças: ');
    }
}

const post = async (presence) => {
    try {
        await axios.post(`${path}/presences`);
    } catch (e) {
        console.log('Erro ao postar presença: ', e);
    }
}

export {
    get,
    post
}