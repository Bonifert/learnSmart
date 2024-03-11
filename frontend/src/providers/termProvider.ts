import {ApiResObj} from "./userProvider.ts";
import {Term} from "../components/TopicForm.tsx";

export interface NewTermDTO {
  topicId: number;
  name: string;
  definition: string;
}

async function createTerm(newTermDTO: NewTermDTO) : Promise<ApiResObj>{
  const token = localStorage.getItem("token") ?? "";
  const httpRes : Response = await fetch("/api/term", {
    method: "POST",
    headers: {
      "Authorization": token,
      "Content-Type": "application/json"
    },
    body: JSON.stringify(newTermDTO),
  });
  return {status: httpRes.status};
}

async function editTerm(editTermDTO: Term) : Promise<ApiResObj>{
  const token = localStorage.getItem("token") ?? "";
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

export {createTerm, editTerm};