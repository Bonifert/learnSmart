import {useNavigate, useParams} from "react-router-dom";
import {useEffect, useState} from "react";
import {createTopic, deleteTopic, getTopicById} from "../providers/topicProvider.ts";
import TopicForm, {Topic} from "../components/TopicForm.tsx";
import CircularProgress from '@mui/material/CircularProgress';
import {Box} from "@mui/material";
import {useFeedback} from "../context/alertContext/feedbackContextImport.ts";

const EditTopic = () => {
  const {id} = useParams();
  const navigate = useNavigate();
  const {feedback} = useFeedback();
  const [topic, setTopic] = useState<Topic | null>(null);
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    async function getTopic() {
      setLoading(true);
      try {
        if (id) {
          const response = await getTopicById(parseInt(id));
          setTopic(response.body as Topic)
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
    getTopic();
  }, [id]);



  async function handleSave(){
    setLoading(true);
    try {
      const httpRes = await createTopic();
      if (httpRes.status === 200){
        feedback("Topic saved!", "success");
      } else {
        feedback("Failed to save.", "error");
      }
    } catch (e) {
      console.log(e);
      feedback("Unexpected error occurred.", "error");
    } finally {
      setLoading(false);
    }
  }

  if (loading) {
    return (
        <Box sx={{display: 'flex'}}>
          <CircularProgress/>
        </Box>
    )
  }

  if (topic) return (
      <TopicForm topic={topic} onSave={handleSave} disabled={loading} onDelete={deleteTopic}/>
  );
};

export default EditTopic;