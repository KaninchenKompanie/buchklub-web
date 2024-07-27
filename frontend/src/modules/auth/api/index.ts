import { axios } from "@/lib/axios";
import { TokenData, UserLogin } from "../types";

export async function login(userLogin: UserLogin): Promise<TokenData> {
  return axios.post("/login", userLogin);
}
