import {useNavigate, useParams} from "react-router-dom";
import TopicForm from "../components/TopicForm.tsx";
import CircularProgress from '@mui/material/CircularProgress';
import {Box} from "@mui/material";
import {useFeedback} from "../context/alertContext/feedbackContextImport.ts";
import {useFetchTopic} from "../hooks/useFetchTopic.tsx";

const EditTopic = () => {
  const {id} = useParams();
  const navigate = useNavigate();
  const {feedback} = useFeedback();
  const {topic, loading} = useFetchTopic(id, navigate, feedback);

  if (loading || !topic) {
    return (
        <Box height="40vh" sx={{display: 'flex', alignItems: "center", justifyContent: "center"}}>
          <CircularProgress/>
        </Box>
    )
  }

  return (
      <TopicForm topic={topic} disabled={loading} />
  );
};

export default EditTopic;