import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import {TopicWithDefinitionRequest} from "../pages/CreateTopicWithDefinition.tsx";
import {useState} from "react";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import {FormValue} from "./TopicWithWordsForm.tsx";
import {useFeedback} from "../context/alertContext/feedbackContextImport.ts";

const centerStyle = {display: "flex", alignItems: "center", justifyContent: "center"};
const buttonStyle = {
  color: "white",
  bgcolor: "#469ca3",
  borderColor: "#469ca3",
  "&:hover": {bgcolor: "#18838c"},
  boxShadow: 2
};

export const numberCheckRegex = new RegExp("^[0-9]+$");

interface Props {
  onGenerate: (data: TopicWithDefinitionRequest) => void;
}

const TopicWithDefinitionForm = ({onGenerate}: Props) => {
  const [topic, setTopic] = useState<FormValue<string>>({value: "", error: false, errorMessage: " "});
  const [numberOfCards, setNumberOfCards] = useState<FormValue<string>>({value: "", error: false, errorMessage: " "});
  const [examples, setExamples] = useState<string>("");
  const [definitionSentenceAmount, setDefinitionSentenceAmount] = useState<FormValue<string>>({
    value: "",
    error: false,
    errorMessage: " "
  });
  const {feedback} = useFeedback();

  async function onSubmit() {
    if (topic.value === "" || numberOfCards.value === "" || definitionSentenceAmount.error) {
      feedback("Invalid input!", "error");
      highlightRequired();
    } else {
      const exampleValue = examples.split(",");
      const numberOfCardsValue = parseInt(numberOfCards.value);
      const definitionSentenceAmountValue = parseInt(definitionSentenceAmount.value);
      const generateConfig: TopicWithDefinitionRequest = {
        topic: topic.value,
        examples: exampleValue,
        numberOfCards: numberOfCardsValue,
        definitionSentenceAmount: isNaN(definitionSentenceAmountValue) ? null : definitionSentenceAmountValue
      };
      onGenerate(generateConfig);
    }
  }

  function handleTopicChange(topicValue: string) {
    if (topicValue.length === 0) {
      setTopic({value: topicValue, error: true, errorMessage: "Please provide a topic"});
    } else if (topicValue.length > 200) {
      setTopic({value: topicValue, error: true, errorMessage: "Max 200 character"});
    } else {
      setTopic({value: topicValue, error: false, errorMessage: " "});
    }
  }

  function handleNumberOfCardsChange(numberOfCardsValue: string) {
    if (!numberCheckRegex.test(numberOfCardsValue) && numberOfCardsValue !== "") return;
    const valueNum = parseInt(numberOfCardsValue);
    if (valueNum <= 0) {
      setNumberOfCards({value: numberOfCardsValue, error: true, errorMessage: "Must be greater than 0"})
    } else if (valueNum > 30) {
      setNumberOfCards({value: numberOfCardsValue, error: true, errorMessage: "30 or smaller"});
    } else if (numberOfCardsValue === "") {
      setNumberOfCards({value: numberOfCardsValue, error: true, errorMessage: "Enter a number"})
    } else {
      setNumberOfCards({value: numberOfCardsValue, error: false, errorMessage: " "});
    }
  }

  function handleDefinitionSentenceAmountChange(sentenceAmount: string) {
    if (!numberCheckRegex.test(sentenceAmount) && sentenceAmount !== "") return;
    const valueNum = parseInt(sentenceAmount);
    if (valueNum < 1) {
      setDefinitionSentenceAmount({value: sentenceAmount, error: true, errorMessage: "Must be greater than 0"});
    } else if (valueNum > 6) {
      setDefinitionSentenceAmount({value: sentenceAmount, error: true, errorMessage: "Maximum 6 sentence!"})
    } else {
      setDefinitionSentenceAmount({value: sentenceAmount, error: false, errorMessage: " "});
    }
  }

  function highlightRequired() {
    if (topic.value === "") handleTopicChange(topic.value);
    if (numberOfCards.value === "") handleNumberOfCardsChange(numberOfCards.value);
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
                  <Box>
                    <Typography>What should the topic be about?*</Typography>
                    <TextField value={topic.value} placeholder="eg.: Human brain*" required multiline
                               onChange={(e) => handleTopicChange(e.target.value)}
                               onBlur={(e) => handleTopicChange(e.target.value)}
                               error={topic.error}
                               helperText={topic.errorMessage}
                               sx={{width: "80%", mt: 2}}/>
                  </Box>
                </Grid>
                <Grid my={1} item xs={12} lg={6} p={1}>
                  <Typography>How many cards do you need?*</Typography>
                  <TextField required placeholder="eg.: 12, max: 30*"
                             error={numberOfCards.error}
                             onChange={(e) => handleNumberOfCardsChange(e.target.value)}
                             onBlur={(e) => handleNumberOfCardsChange(e.target.value)}
                             value={numberOfCards.value} sx={{width: "80%", mt: 2}}
                             helperText={numberOfCards.errorMessage}/>
                </Grid>
                <Grid my={1} item xs={12} lg={6} p={1}>
                  <Typography>Give some example!</Typography>
                  <TextField value={examples} onChange={(e) => setExamples(e.target.value)}
                             placeholder="eg.: Diencephalon, grey matter" sx={{width: "80%", mt: 2}}/>
                </Grid>
                <Grid my={1} item xs={12} lg={6} p={1}>
                  <Typography>Length (in sentences):</Typography>
                  <TextField required placeholder="eg.: 4, max: 6"
                             onChange={(e) => handleDefinitionSentenceAmountChange(e.target.value)}
                             value={definitionSentenceAmount.value} sx={{width: "80%", mt: 2}}
                             helperText={definitionSentenceAmount.errorMessage} error={definitionSentenceAmount.error}/>
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