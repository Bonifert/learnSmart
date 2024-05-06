import {ApiResObj} from "../type/dtos/ApiResObj.ts";
import {UsernamePasswordDTO} from "../type/dtos/UsernamePasswordDTO.ts";

async function login(userInfo: UsernamePasswordDTO): Promise<ApiResObj> {
  const httpRes: Response = await fetch("/api/auth/login", {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(userInfo)
  });
  return {status: httpRes.status};
}

async function registerUser(userInfo: UsernamePasswordDTO): Promise<ApiResObj> {
  const httpRes: Response = await fetch("/api/user/create", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(userInfo),
  });
  return {status: httpRes.status};
}

export {login, registerUser};