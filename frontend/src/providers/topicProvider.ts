import {ApiResObj} from "./userProvider.ts";

async function getMyTopics(): Promise<ApiResObj> {
  const token = localStorage.getItem("token") ?? "";
  const httpRes: Response = await fetch("/api/topic/info", {
    method: "GET",
    headers: {
      "Authorization": token,
    }
  });
  const body = await httpRes.json();
  return {status: httpRes.status, body};
}

async function getTopicById(id: number) : Promise<ApiResObj>{
  const token = localStorage.getItem("token") ?? "";
  const httpRes : Response = await fetch(`/api/topic/${id}`, {
    method: "GET",
    headers: {
      "Authorization": token,
    }
  });
  const body = await httpRes.json();
  return {status: httpRes.status, body};
}

async function createTopic() : Promise<ApiResObj>{
  const token = localStorage.getItem("token") ?? "";
  const httpRes : Response = await fetch("/api/topic",{
    method: "POST",
    headers: {
      "Authorization": token,
    }
  });
  const body = await httpRes.json();
  return {status: httpRes.status, body};
}

async function deleteTopic(id: number) : Promise<ApiResObj>{
  const token = localStorage.getItem("token") ?? "";
  const httpRes : Response = await fetch(`/api/topic/${id}`, {
    method: "DELETE",
    headers: {
      "Authorization": token,
    },
  });
  return {status: httpRes.status};
}

export {getMyTopics, getTopicById, createTopic, deleteTopic};
