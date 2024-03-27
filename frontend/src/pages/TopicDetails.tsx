import {useNavigate, useParams} from "react-router-dom";
import {useFeedback} from "../context/alertContext/feedbackContextImport.ts";
import {TopicType, useFetchTopic} from "../hooks/useFetchTopic.tsx";
import CircularProgress from "@mui/material/CircularProgress";
import {Accordion, AccordionDetails, AccordionSummary, Box, Grid, Stack} from "@mui/material";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward';
const buttonSx = {color: "white", bgcolor: "#469ca3", borderColor: "#469ca3", "&:hover": {bgcolor: "#18838c"}, boxShadow: 2};
const centerSx = {display: "flex", alignItems: "center", justifyContent: "center"};

const TopicDetails = () => {
  const {id} = useParams();
  const navigate = useNavigate();
  const {feedback} = useFeedback();
  const {topic, loading} = useFetchTopic(id, navigate, feedback, TopicType.ALL);

  if (loading || !topic) {
    return (
        <Box height="40vh" sx={centerSx}>
          <CircularProgress/>
        </Box>
    );
  }

  function urgencyCalculator(givenDate: Date): string {
    const now = new Date();
    if (givenDate < now) {
      return "Pending";
    } else {
      return "Fulfilled";
    }
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
      <Box height="100%" width="100%" sx={{bgcolor: "#E1F7FAFF", ...centerSx}}>
        <Grid my={4} container
              sx={{bgcolor: "#E1F7FAFF", ...centerSx}}>
          <Grid item xs={10} sm={8} md={7} lg={6} minWidth="275px"
                sx={{bgcolor: "#A3CDD1", borderRadius: 2, boxShadow: 3}}>
            <Grid container>
              <Grid item xs={8}>
                <Box m={3}>
                  <Typography variant="h4">
                    {topic.name}
                  </Typography>
                  <Box my={4} color={"#676767"}>
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
                  <Button sx={buttonSx}
                          variant="outlined"
                          color="inherit"
                          onClick={() => navigate(`/edit/${topic!.id}`)}>Edit topic</Button>
                  <Button sx={buttonSx}
                          variant="outlined"
                          color="inherit"
                          onClick={() => navigate(`/play/${topic?.id}/all`)}>Play all</Button>
                  <Button sx={buttonSx}
                          variant="outlined"
                          color="inherit"
                          onClick={() => navigate(`/play/${topic?.id}/filtered`)}>Play pending</Button>
                </Stack>
              </Grid>
            </Grid>
            <Box m={3}>
              <Typography variant="h5">Terms:</Typography>
              <Grid container>
                {topic.terms.map(term => (
                    <Grid item xs={12} sm={6}>
                      <Accordion sx={{m: 1}}>
                        <AccordionSummary
                            expandIcon={<ArrowDownwardIcon/>}
                            aria-controls="panel1-content"
                            id="panel1-header"
                        >
                          <Typography sx={{width: '65%', flexShrink: 0}}>{term.name}</Typography>
                          <Typography
                              sx={{color: 'text.secondary'}}>{urgencyCalculator(new Date(term.nextShowDateTime))}</Typography>
                        </AccordionSummary>
                        <AccordionDetails>
                          <Typography>
                            {term.definition}
                          </Typography>
                        </AccordionDetails>
                      </Accordion>
                    </Grid>
                ))}
              </Grid>
            </Box>
          </Grid>
        </Grid>
      </Box>
  );
};

export default TopicDetails;