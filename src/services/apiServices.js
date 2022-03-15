import axios from "axios";

export const getService = async(url) => {
    let response = await axios.get(url);
    let dataResponse = await response.data;
    return await dataResponse;
}