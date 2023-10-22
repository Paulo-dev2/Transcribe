import axios from "axios";

const baseURL = process.env.HOST;

export const api = axios.create({
    baseURL,
    //timeout: 1000,
})