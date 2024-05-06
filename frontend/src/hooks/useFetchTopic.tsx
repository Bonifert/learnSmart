import {useEffect, useState} from "react";
import {getFilteredTopicById, getTopicById} from "../providers/topicProvider.ts";
import {Variant} from "../context/alertContext/FeedbackContext.tsx";
import {Topic} from "../type/Topic.ts";

export enum TopicType {
  ALL,
  FILTERED
}

const useFetchTopic = (id: string | undefined, navigate: (path: string)=> void, feedback: (message: string, type: Variant)=> void, topicType: TopicType) => {
  const [topic, setTopic] = useState<Topic | null>(null);
  const [loading, setLoading] = useState(false);

  if (!id){
    navigate("/");
  }
  async function fetchTopic() {
    setLoading(true);
    try {
      if (id) {
        let response;
        if (topicType === TopicType.ALL){
          response = await getTopicById(id);
        } else {
          response = await getFilteredTopicById(id);
        }
        if (response.status === 200) {
          setTopic(response.body as Topic);
        } else if (response.status === 404) {
          feedback("The topic doesn't exist.", "error");
          navigate("/");
        } else if (response.status === 403) {
          feedback("You don't have access to this resource.", "error");
          navigate("/")
        }
      } else {
        navigate("/");
      }
    } catch (e) {
      console.log(e);
      feedback("Unexpected error occurred.", "error");
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    fetchTopic();
  }, [id]);

  function reloadTopic(){
    fetchTopic();
  }

  return { topic, loading, reloadTopic };
};

export {useFetchTopic};