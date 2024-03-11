import {ApiResObj} from "./userProvider.ts";
import {Topic} from "../components/TopicForm.tsx";

async function getMyTopics(): Promise<ApiResObj> {
  const token = localStorage.getItem("token") ?? "";
  const httpRes: Response = await fetch("/api/topic", {
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

async function createTopic(topic : Topic) : Promise<ApiResObj>{
  const token = localStorage.getItem("token") ?? "";
  const httpRes : Response = await fetch("/api/topic",{
    method: "POST",
    headers: {
      "Authorization": token,
    },
    body: JSON.stringify(topic)
  });
  return {status: httpRes.status};
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
