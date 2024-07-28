import { axios } from "@/lib/axios";
import { TokenData, UserLogin } from "../types";
import { urlPaths } from "@/modules/common/configurations/constants";
import { mapTokenDataDtoToTokenData } from "../mappers";

export async function login(userLogin: UserLogin): Promise<TokenData> {
  return mapTokenDataDtoToTokenData(
    await axios.post(urlPaths.users, userLogin)
  );
}
