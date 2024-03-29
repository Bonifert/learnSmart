import {ApiResObj} from "./userProvider.ts";

function getToken() : string {
  return localStorage.getItem("token") ?? "";
}

export interface EditTopicNameDTO{
  topicId: number;
  newName: string;
}

async function getMyTopics(): Promise<ApiResObj> {
  const token = getToken();
  const httpRes: Response = await fetch("/api/topic/info", {
    method: "GET",
    headers: {
      "Authorization": token,
    }
  });
  const body = await httpRes.json();
  return {status: httpRes.status, body};
}

async function getTopicById(id: string) : Promise<ApiResObj>{
  const token = getToken();
  const httpRes : Response = await fetch(`/api/topic/${id}`, {
    method: "GET",
    headers: {
      "Authorization": token,
    }
  });
  const body = await httpRes.json();
  return {status: httpRes.status, body};
}

async function getFilteredTopicById(id: string) : Promise<ApiResObj>{
  const token = getToken();
  const httpRes : Response = await fetch(`/api/topic/filtered/${id}`, {
    method: "GET",
    headers: {
      "Authorization": token,
    }
  });
  const body = await httpRes.json();
  return {status: httpRes.status, body};
}

async function createTopic() : Promise<ApiResObj>{
  const token = getToken();
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
  const token = getToken();
  const httpRes : Response = await fetch(`/api/topic/${id}`, {
    method: "DELETE",
    headers: {
      "Authorization": token,
    },
  });
  return {status: httpRes.status};
}

async function editTopicName(editTopicNameDTO: EditTopicNameDTO) : Promise<ApiResObj>{
  const token = getToken();
  const httpRes : Response = await fetch("/api/topic", {
    method: "PATCH",
    headers: {
      "Authorization": token,
      "Content-Type": "application/json"
    },
    body: JSON.stringify(editTopicNameDTO)
  });
  return {status: httpRes.status};
}

export {getToken, getMyTopics, getTopicById, createTopic, deleteTopic, editTopicName, getFilteredTopicById};
