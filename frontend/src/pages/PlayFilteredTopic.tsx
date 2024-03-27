import {useNavigate, useParams} from "react-router-dom";
import {useFeedback} from "../context/alertContext/feedbackContextImport.ts";
import {TopicType, useFetchTopic} from "../hooks/useFetchTopic.tsx";
import {Box} from "@mui/material";
import CircularProgress from "@mui/material/CircularProgress";
import TopicGame from "../components/TopicGame.tsx";

const PlayFilteredTopic = () => {
  const {id} = useParams();
  const {feedback} = useFeedback();
  const navigate = useNavigate();
  const {topic, loading, reloadTopic} = useFetchTopic(id, navigate, feedback, TopicType.FILTERED);

  if (loading || !topic) {
    return (
        <Box height="40vh" sx={{display: "flex", alignItems: "center", justifyContent: "center"}}>
          <CircularProgress/>
        </Box>
    );
  }

  return <TopicGame topic={topic} onReloadTopic={reloadTopic}/>;
};

export default PlayFilteredTopic;