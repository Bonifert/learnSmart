import {BasicTopic} from "../type/BasicTopic.ts";
import {TopicWithDefinitionDTO} from "../type/dtos/TopicWithDefinitionDTO.ts";
import {EditTopicNameDTO} from "../type/dtos/EditTopicNameDTO.ts";
import {TopicWithWordsDTO} from "../type/dtos/TopicWithWordsDTO.ts";
import {ApiResObj} from "../type/dtos/ApiResObj.ts";

function getToken(): string {
  return localStorage.getItem("token") ?? "";
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

async function getTopicById(id: string): Promise<ApiResObj> {
  const token = getToken();
  const httpRes: Response = await fetch(`/api/topic/${id}`, {
    method: "GET",
    headers: {
      "Authorization": token,
    }
  });
  const body = await httpRes.json();
  return {status: httpRes.status, body};
}

async function getFilteredTopicById(id: string): Promise<ApiResObj> {
  const token = getToken();
  const httpRes: Response = await fetch(`/api/topic/filtered/${id}`, {
    method: "GET",
    headers: {
      "Authorization": token,
    }
  });
  const body = await httpRes.json();
  return {status: httpRes.status, body};
}

async function createTopic(): Promise<ApiResObj> {
  const token = getToken();
  const httpRes: Response = await fetch("/api/topic", {
    method: "POST",
    headers: {
      "Authorization": token,
    }
  });
  const body = await httpRes.json();
  return {status: httpRes.status, body};
}

async function deleteTopic(id: number): Promise<ApiResObj> {
  const token = getToken();
  const httpRes: Response = await fetch(`/api/topic/${id}`, {
    method: "DELETE",
    headers: {
      "Authorization": token,
    },
  });
  return {status: httpRes.status};
}

async function editTopicName(editTopicNameDTO: EditTopicNameDTO): Promise<ApiResObj> {
  const token = getToken();
  const httpRes: Response = await fetch("/api/topic", {
    method: "PATCH",
    headers: {
      "Authorization": token,
      "Content-Type": "application/json"
    },
    body: JSON.stringify(editTopicNameDTO)
  });
  return {status: httpRes.status};
}

async function generateTopicWithDefinitions(data: TopicWithDefinitionDTO): Promise<ApiResObj> {
  const token = getToken();
  const httpRes: Response = await fetch("/api/topic/generate/definitions", {
    method: "POST",
    headers: {
      "Authorization": token,
      "Content-Type": "application/json"
    },
    body: JSON.stringify(data)
  });
  const body = await httpRes.json();
  return {status: httpRes.status, body};
}

async function generateTopicWithWords(data: TopicWithWordsDTO): Promise<ApiResObj> {
  const token = getToken();
  const httpRes: Response = await fetch("/api/topic/generate/words", {
    method: "POST",
    headers: {
      "Authorization": token,
      "Content-Type": "application/json"
    },
    body: JSON.stringify(data)
  });
  const body = await httpRes.json();
  return {status: httpRes.status, body};
}

async function createTopicFromBasic(basicTopic: BasicTopic): Promise<ApiResObj> {
  const token = getToken();
  const httpRes: Response = await fetch("/api/topic/create-from-basic", {
    method: "POST",
    headers: {
      "Authorization": token,
      "Content-Type": "application/json"
    },
    body: JSON.stringify(basicTopic)
  })
  const body = await httpRes.json();
  return {status: httpRes.status, body};
}

export {
  getToken,
  getMyTopics,
  getTopicById,
  createTopic,
  deleteTopic,
  editTopicName,
  getFilteredTopicById,
  generateTopicWithDefinitions,
  createTopicFromBasic,
  generateTopicWithWords
};
