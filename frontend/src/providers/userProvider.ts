import {UserNamePassword} from "../context/userContext/UserProvider.tsx";

export interface ApiResObj {
  readonly status: number,
  readonly body: object | null,
  readonly headers: Headers
}

async function login(userInfo: UserNamePassword): Promise<ApiResObj> {
  try {
    const httpRes: Response = await fetch("/api/user/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(userInfo)
    });
    return {status: httpRes.status, body: null, headers: httpRes.headers};
  } catch (e) {
    console.error(e);
    throw new Error("Unexpected error occurred.");
  }
}

async function register(userInfo: UserNamePassword): Promise<ApiResObj> {
  const httpRes: Response = await fetch("/api/user", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(userInfo),
  });
  return {status: httpRes.status, body: null, headers: httpRes.headers};
}

export {login, register};