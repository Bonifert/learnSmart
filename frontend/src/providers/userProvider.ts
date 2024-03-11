import {UserNamePassword} from "../context/userContext/UserProvider.tsx";

export interface ApiResObj {
  readonly status: number,
  readonly body?: object
}

async function login(userInfo: UserNamePassword): Promise<ApiResObj> {
  const httpRes: Response = await fetch("/api/user/login", {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(userInfo)
  });
  return {status: httpRes.status};
}

async function register(userInfo: UserNamePassword): Promise<ApiResObj> {
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