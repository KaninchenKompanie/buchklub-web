import { axios } from "@/lib/axios";
import { User } from "@/modules/auth/types";
import { urlPaths } from "@/modules/common/configurations/constants";


export async function fetchUsers(): Promise<User[]> {
    return (await axios.get(`${urlPaths.users}`)).data;
}