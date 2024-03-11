import {useEffect, useState} from "react";
import {ApiResObj} from "../providers/userProvider.ts";
import {getMyTopics} from "../providers/topicProvider.ts";
import TopicList, {TopicInfo} from "../components/TopicList.tsx";
import {useFeedback} from "../context/alertContext/feedbackContextImport.ts";
import {useNavigate} from "react-router-dom";

const MyTopics = () => {
  const {feedback} = useFeedback();
  const navigate = useNavigate();
  const [topics, setTopics] = useState<TopicInfo[]>([]);

  useEffect(() => {
    async function fetchUserTopics() {
      try {
        const response: ApiResObj = await getMyTopics();
        if (response.status === 404){
          feedback("User not found", "error");
        } else if (response.status === 401) {
          feedback("Try to log in again!", "error");
          navigate("/home");
        }
        if (response.body) {
          const topics: TopicInfo[] = Array.isArray(response.body) ? response.body : [];
          setTopics(topics)
        }
      } catch (e) {
        feedback("Unexpected error occurred.", "error");
      }

    }

    fetchUserTopics();
  }, []);


  return <TopicList topics={topics}/>;
};

export default MyTopics;