import {useNavigate, useParams} from "react-router-dom";
import {useFeedback} from "../context/alertContext/feedbackContextImport.ts";
import {useFetchTopic} from "../hooks/useFetchTopic.tsx";
import CircularProgress from "@mui/material/CircularProgress";
import {Box, Grid, Stack} from "@mui/material";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";

const TopicDetails = () => {
  const {id} = useParams();
  const navigate = useNavigate();
  const {feedback} = useFeedback();
  const {topic, loading} = useFetchTopic(id, navigate, feedback);

  if (loading || !topic) {
    return (
        <Box height="40vh" sx={{display: 'flex', alignItems: "center", justifyContent: "center"}}>
          <CircularProgress/>
        </Box>
    );
  }

  return (
      <Box height="100%" width="100%" sx={{bgcolor: "#d1e6e8", justifyContent: 'center', alignItems: 'center'}}>
        <Grid my={4} container
              sx={{bgcolor: "#d1e6e8", display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
          <Grid item xs={10} sm={8} md={7} lg={6}  minWidth="275px"
                sx={{bgcolor: "#A3CDD1", borderRadius: 2}}>
            <Grid container>
              <Grid item xs={8}>
                <Box m={3}>
                  <Typography variant="h4">
                    {topic.name}
                  </Typography>
                </Box>
              </Grid>
              <Grid item xs={4} sx={{display: "flex", alignItems: "center", justifyContent: "flex-end"}}>
                <Stack spacing={2} m={3}>
                  <Button sx={{color: "black", bgcolor: "#469ca3", borderColor: "#469ca3"}}
                          variant="outlined"
                          color="inherit"
                          onClick={()=> navigate(`/edit/${topic!.id}`)}>Edit topic</Button>
                  <Button sx={{color: "black", bgcolor: "#469ca3", borderColor: "#469ca3"}}
                          variant="outlined"
                          color="inherit">Play all</Button>
                  <Button sx={{color: "black", bgcolor: "#469ca3", borderColor: "#469ca3"}}
                          variant="outlined"
                          color="inherit">Play filter</Button>
                </Stack>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </Box>
  );
};

export default TopicDetails;