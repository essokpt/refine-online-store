import { axiosInstance } from "./axiosInstance";
import type { AxiosInstance } from "axios";

const API_URL = "http://127.0.0.1:3001/auth";
const httpClient: AxiosInstance = axiosInstance

export const handleLogin = async(email: string, password: string) => {
    try {

        const { data } = await httpClient.post(`${API_URL}/login`, {
            email: email,
            password: password
        });

        console.log('handleLogin:', data);
        
        return {
            data,
        };
    } catch (error) {
        //const httpError = transformHttpError(error);
        throw error;
    }
}

export const handleLogout = async(email: string) => {
    try {

        const { data } = await httpClient.post(`${API_URL}/logout`, {
            email: email,
           
        });

        console.log('handleLogout:', data);
        
        return {
            data,
        };
    } catch (error) {
        //const httpError = transformHttpError(error);
        throw error;
    }
}