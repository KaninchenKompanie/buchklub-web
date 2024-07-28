import { axios } from "@/lib/axios";
import { TokenData, UserLogin } from "../types";
import { urlPaths } from "@/modules/common/configurations/constants";
import { mapTokenDataDtoToTokenData } from "../mappers";

export async function login(userLogin: UserLogin): Promise<TokenData> {
  const result = (await axios.put(urlPaths.users, userLogin)).data;
  return mapTokenDataDtoToTokenData(result);
}

export async function refresh(refreshToken: string): Promise<TokenData> {
  return mapTokenDataDtoToTokenData(
    (
      await axios.put(urlPaths.users + "/refresh", {
        access_token: refreshToken,
      })
    ).data
  );
}
