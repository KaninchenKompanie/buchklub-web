import { axios } from "@/lib/axios";
import { TokenData, UserLogin } from "../types";
import { urlPaths } from "@/modules/common/configurations/constants";

export async function login(userLogin: UserLogin): Promise<TokenData> {
  return axios.post(urlPaths.users, userLogin);
}
