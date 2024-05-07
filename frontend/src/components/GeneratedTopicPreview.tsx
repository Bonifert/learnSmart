import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import {grey} from "@mui/material/colors";
import {Stack} from "@mui/material";
import Button from "@mui/material/Button";
import {useNavigate} from "react-router-dom";
import CardList from "./CardList.tsx";
import {createTopicFromBasic} from "../providers/topicProvider.ts";
import {useFeedback} from "../context/alertContext/feedbackContextImport.ts";
import {BasicTopic} from "../type/BasicTopic.ts";
import {ApiResObj} from "../type/dtos/ApiResObj.ts";
import InfoPopover from "./InfoPopover.tsx";

const buttonStyle = {
  color: "white",
  bgcolor: "#469ca3",
  borderColor: "#469ca3",
  "&:hover": {bgcolor: "#18838c"},
  boxShadow: 2
};
const centerStyle = {display: "flex", alignItems: "center", justifyContent: "center"};

interface Props {
  topic: BasicTopic;
  onCancel: ()=> void;
}

const GeneratedTopicPreview = ({topic, onCancel}: Props) => {
  const navigate = useNavigate();
  const {feedback} = useFeedback();

  async function handleSave(navigateLocation: string){
    try {
      const response : ApiResObj = await createTopicFromBasic(topic);
      if (response.status === 201){
        feedback("Topic created!", "success");
        navigate(`/${navigateLocation}/${response.body}`)
      } else {
        feedback("Unexpected error occurred. We can't save the topic", "error");
      }
    } catch (e){
      console.log(e);
      feedback("Unexpected error occurred. We can't save the topic", "error");
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
                  <Typography color={grey[500]}>Topic preview<InfoPopover message="Generated content may not always be accurate, so use with caution."/></Typography>
                </Box>
              </Grid>
              <Grid item xs={4} sx={{display: "flex", alignItems: "center", justifyContent: "flex-end"}}>
                <Stack spacing={1} m={3}>
                  <Button sx={buttonStyle}
                          variant="outlined"
                          color="inherit"
                          onClick={()=>handleSave("info")}>Save</Button>
                  <Button sx={buttonStyle}
                          variant="outlined"
                          color="inherit"
                          onClick={() => handleSave("edit")}>Save and edit</Button>
                  <Button sx={buttonStyle}
                          variant="outlined"
                          color="inherit"
                          onClick={onCancel}>Cancel</Button>
                </Stack>
              </Grid>
            </Grid>
            <CardList cards={topic.terms}/>
          </Grid>
        </Grid>
      </Box>);
};

export default GeneratedTopicPreview;