import axios from "axios";

export const getService = async(endpoint) => {
    let response = await axios.get(`https://rickandmortyapi.com${endpoint}`);
    let dataResponse = await response.data;
    return await dataResponse;
}