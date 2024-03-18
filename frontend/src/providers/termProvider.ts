import {ApiResObj} from "./userProvider.ts";
import {Term} from "../components/TopicForm.tsx";
import {getToken} from "./topicProvider.ts";

export interface NewTermDTO {
  topicId: number;
  name: string;
  definition: string;
}

async function createTerm(newTermDTO: NewTermDTO) : Promise<ApiResObj>{
  const token = getToken();
  const httpRes : Response = await fetch("/api/term", {
    method: "POST",
    headers: {
      "Authorization": token,
      "Content-Type": "application/json"
    },
    body: JSON.stringify(newTermDTO),
  });
  const body = await httpRes.json();
  return {status: httpRes.status, body};
}

async function editTerm(editTermDTO: Term) : Promise<ApiResObj>{
  const token = getToken();
  const httpRes : Response = await fetch("/api/term", {
    method: "PATCH",
    headers: {
      "Authorization": token,
      "Content-Type": "application/json"
    },
    body: JSON.stringify(editTermDTO)
  });
  return {status: httpRes.status};
}

async function deleteTerm(id: number) : Promise<ApiResObj>{
  const token = getToken();
  const httpRes : Response = await fetch(`/api/term/${id}`,{
    method: 'DELETE',
    headers: {
      "Authorization": token,
    }
  });
  return {status: httpRes.status};
}

export {createTerm, editTerm, deleteTerm};