/* eslint-disable @typescript-eslint/no-explicit-any */
import axios from "axios";

const API_URL = process.env.NEXT_PUBLIC_BASE_URL;

interface UserData {
  first_name: string;
  last_name: string;
  email: string;
  password: string;
  role: string;
}

export const registerUser = async (data: UserData): Promise<any> => {
  const response = await axios.post(`${API_URL}/api/auth/register`, data);
  return response.data;
};

interface LoginData {
  email: string;
  password: string;
}

export const loginUser = async (data: LoginData): Promise<any> => {
  const response = await axios.post(`${API_URL}/api/auth/login`, data);
  return response.data;
};
