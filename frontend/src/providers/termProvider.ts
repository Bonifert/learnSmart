import {getToken} from "./topicProvider.ts";
import {Term} from "../type/Topic.ts";
import {NewTermDTO} from "../type/dtos/NewTermDTO.ts";
import {ApiResObj} from "../type/dtos/ApiResObj.ts";

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

async function createTermReview(id: number) : Promise<ApiResObj>{
  const token = getToken();
  const httpRes : Response = await fetch(`/api/term/review/${id}`, {
    method: 'PUT',
    headers: {
      "Authorization": token,
    }
  });
  return {status: httpRes.status};
}

export {createTerm, editTerm, deleteTerm, createTermReview};