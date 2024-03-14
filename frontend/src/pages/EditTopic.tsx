import {useNavigate, useParams} from "react-router-dom";
import {useEffect, useState} from "react";
import {deleteTopic, getTopicById} from "../providers/topicProvider.ts";
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
          if (response.status === 200) {
            setTopic(response.body as Topic)
          } else if( response.status === 404){
            feedback("The topic doesn't exist.", "error");
            navigate("/");
          } else if(response.status === 401){
            feedback("You don't have access to this resource.", "error");
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
    getTopic();
  }, [id]);


  if (loading) {
    return (
        <Box height="40vh" sx={{display: 'flex', alignItems: "center", justifyContent: "center"}}>
          <CircularProgress/>
        </Box>
    )
  }

  if (topic) return (
      <TopicForm topic={topic} disabled={loading} onDelete={deleteTopic}/>
  );
};

export default EditTopic;