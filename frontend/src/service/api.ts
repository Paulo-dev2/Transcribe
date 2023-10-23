import axios from "axios";

const baseURL = process.env.NEXT_PUBLIC_HOST;

export const api = axios.create({
    baseURL,
    //timeout: 1000,
})