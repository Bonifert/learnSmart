import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import {TopicWithDefinitionRequest} from "../pages/CreateTopicWithDefinition.tsx";
import {useState} from "react";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";

const centerStyle = {display: "flex", alignItems: "center", justifyContent: "center"};
const buttonStyle = {
  color: "white",
  bgcolor: "#469ca3",
  borderColor: "#469ca3",
  "&:hover": {bgcolor: "#18838c"},
  boxShadow: 2
};

interface Props {
  onGenerate: (data: TopicWithDefinitionRequest) => void;
}

const TopicWithDefinitionForm = ({onGenerate}: Props) => {
  const [topic, setTopic] = useState<string>("");
  const [examples, setExamples] = useState<string>("");
  const [numberOfCards, setNumberOfCards] = useState<string>("");
  const [definitionSentenceAmount, setDefinitionSentenceAmount] = useState<string>("");

  async function onSubmit() {
    const exampleValue = examples.split(",");
    const numberOfCardsValue = parseInt(numberOfCards);
    const definitionSentenceAmountValue = parseInt(definitionSentenceAmount);
    const generateConfig: TopicWithDefinitionRequest = {
      topic,
      examples: exampleValue,
      numberOfCards: numberOfCardsValue,
      definitionSentenceAmount: isNaN(definitionSentenceAmountValue) ? 0 : definitionSentenceAmountValue
    };
    onGenerate(generateConfig);
  }

  return (
      <Box height="100%" width="100%" sx={{...centerStyle}}>
        <Grid my={4} container
              sx={{...centerStyle}}>
          <Grid item xs={10} sm={8} md={7} lg={6} minWidth="275px"
                sx={{bgcolor: "white", borderRadius: 2, boxShadow: 3}}>
            <Box m={3}>
              <Box>
                <Typography variant="h5">
                  Enter the configuration to generate topic!
                </Typography>
                <Typography mt={5}>* is required!</Typography>
              </Box>
              <Grid container my={1}>
                <Grid my={1} item xs={12} lg={6} p={1}>
                  <Typography>What should the topic be about?*</Typography>
                  <TextField value={topic} onChange={(e) => setTopic(e.target.value)} required multiline
                             sx={{width: "80%", mt: 2}} placeholder="eg.: Human brain*"/>
                </Grid>
                <Grid my={1} item xs={12} lg={6} p={1}>
                  <Typography>How many cards do you need?*</Typography>
                  <TextField required placeholder="eg.: 12, max: 30*" onChange={(e) => setNumberOfCards(e.target.value)}
                             value={numberOfCards} sx={{width: "80%", mt: 2}} inputProps={{type: "number"}}/>
                </Grid>
                <Grid my={1} item xs={12} lg={6} p={1}>
                  <Typography>Give some example!</Typography>
                  <TextField value={examples} onChange={(e) => setExamples(e.target.value)}
                             placeholder="eg.: Diencephalon, grey matter" sx={{width: "80%", mt: 2}}/>
                </Grid>
                <Grid my={1} item xs={12} lg={6} p={1}>
                  <Typography>Length (in sentences):</Typography>
                  <TextField required placeholder="eg.: 4, max: 6"
                             onChange={(e) => setDefinitionSentenceAmount(e.target.value)}
                             value={definitionSentenceAmount} sx={{width: "80%", mt: 2}} inputProps={{type: "number"}}/>
                </Grid>
              </Grid>
              <Box display="flex" justifyContent="flex-end">
                <Button variant="outlined" sx={buttonStyle} onClick={onSubmit}>Generate</Button>
              </Box>
            </Box>
          </Grid>
        </Grid>
      </Box>
  );
};

export default TopicWithDefinitionForm;