import {ApiResObj} from "../components/types/dto/ApiResObj.ts";
import {UserNamePasswordDTO} from "../components/types/dto/UserNamePasswordDTO.ts";

async function login(userInfo: UserNamePasswordDTO): Promise<ApiResObj> {
  const httpRes: Response = await fetch("/api/user/login", {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(userInfo)
  });
  return {status: httpRes.status};
}

async function register(userInfo: UserNamePasswordDTO): Promise<ApiResObj> {
  const httpRes: Response = await fetch("/api/user", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(userInfo),
  });
  return {status: httpRes.status};
}

export {login, register};