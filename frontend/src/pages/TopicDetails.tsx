import {useNavigate, useParams} from "react-router-dom";
import {useFeedback} from "../context/alertContext/feedbackContextImport.ts";
import {TopicType, useFetchTopic} from "../hooks/useFetchTopic.tsx";
import CircularProgress from "@mui/material/CircularProgress";
import {Box, Grid, Stack} from "@mui/material";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import {grey} from "@mui/material/colors";
import CardList from "../components/CardList.tsx";

const buttonStyle = {color: "white", bgcolor: "#469ca3", borderColor: "#469ca3", "&:hover": {bgcolor: "#18838c"}, boxShadow: 2};
const centerStyle = {display: "flex", alignItems: "center", justifyContent: "center"};

const TopicDetails = () => {
  const {id} = useParams();
  const navigate = useNavigate();
  const {feedback} = useFeedback();
  const {topic, loading} = useFetchTopic(id, navigate, feedback, TopicType.ALL);

  if (loading || !topic) {
    return (
        <Box height="40vh" sx={centerStyle}>
          <CircularProgress/>
        </Box>
    );
  }

  function formatDate(givenDate: Date) {
    const today = new Date();

    if (givenDate.getDate() === today.getDate() &&
        givenDate.getMonth() === today.getMonth() &&
        givenDate.getFullYear() === today.getFullYear()) {
      return givenDate.toLocaleTimeString('en-US', {hour: 'numeric', minute: '2-digit', hour12: true});
    } else {
      return givenDate.toLocaleDateString('en-US', {month: 'short', day: 'numeric', year: 'numeric'});
    }
  }

  return (
      <Box height="100%" width="100%" sx={{...centerStyle}}>
        <Grid my={4} container
              sx={{...centerStyle}}>
          <Grid item xs={10} sm={8} md={7} lg={6} minWidth="275px"
                sx={{bgcolor: "white", borderRadius: 2, boxShadow: 3}}>
            <Grid container>
              <Grid item xs={8}>
                <Box m={3}>
                  <Typography variant="h4">
                    {topic.name}
                  </Typography>
                  <Typography color={grey[500]}>Topic</Typography>

                  <Box my={4} color={grey[500]}>
                    <Typography>
                      Created at: {formatDate(new Date(topic.createdAt))}
                    </Typography>
                    <Typography>
                      Modified at: {formatDate(new Date(topic.modifiedAt))}
                    </Typography>
                  </Box>
                  <Typography>Priority: {topic.priority}</Typography>
                </Box>
              </Grid>
              <Grid item xs={4} sx={{display: "flex", alignItems: "center", justifyContent: "flex-end"}}>
                <Stack spacing={1} m={3}>
                  <Button sx={buttonStyle}
                          variant="outlined"
                          color="inherit"
                          onClick={() => navigate(`/edit/${topic!.id}`)}>Edit topic</Button>
                  <Button sx={buttonStyle}
                          variant="outlined"
                          color="inherit"
                          onClick={() => navigate(`/play/${topic?.id}/all`)}>Play all</Button>
                  <Button sx={buttonStyle}
                          variant="outlined"
                          color="inherit"
                          onClick={() => navigate(`/play/${topic?.id}/filtered`)}>Play pending</Button>
                </Stack>
              </Grid>
            </Grid>
            <CardList cards={topic.terms}/>
          </Grid>
        </Grid>
      </Box>
  );
};

export default TopicDetails;