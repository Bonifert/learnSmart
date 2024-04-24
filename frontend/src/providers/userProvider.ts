import {ApiResObj} from "../components/types/dto/ApiResObj.ts";
import {UsernamePasswordDTO} from "../components/types/dto/UsernamePasswordDTO.ts";

async function login(userInfo: UsernamePasswordDTO): Promise<ApiResObj> {
  const httpRes: Response = await fetch("/api/user/login", {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(userInfo)
  });
  return {status: httpRes.status};
}

async function registerUser(userInfo: UsernamePasswordDTO): Promise<ApiResObj> {
  const httpRes: Response = await fetch("/api/user", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(userInfo),
  });
  return {status: httpRes.status};
}

export {login, registerUser};