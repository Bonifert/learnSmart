import {TopicWithWordsRequest} from "../pages/CreateTopicWithWords.tsx";
import {useState} from "react";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import {Autocomplete, Select} from "@mui/material";
import MenuItem from "@mui/material/MenuItem";
import {useFeedback} from "../context/alertContext/feedbackContextImport.ts";
import languages from "../../languages.json";
import {numberCheckRegex} from "./TopicWithDefinitionForm.tsx";

const centerStyle = {display: "flex", alignItems: "center", justifyContent: "center"};
const buttonStyle = {
  color: "white",
  bgcolor: "#469ca3",
  borderColor: "#469ca3",
  "&:hover": {bgcolor: "#18838c"},
  boxShadow: 2
};

interface Props {
  onGenerate: (data: TopicWithWordsRequest) => void;
}

export interface FormValue<T> {
  value: T;
  error: boolean;
  errorMessage: string;
}

type proficiencyLevel = "BEGINNER" | "INTERMEDIATE" | "ADVANCED" | "FLUENT";

const TopicWithWordsForm = ({onGenerate}: Props) => {
  const [topic, setTopic] = useState<FormValue<string>>({value: "", error: false, errorMessage: " "});
  const [level, setLevel] = useState<proficiencyLevel>("BEGINNER");
  const [nameLang, setNameLang] = useState<FormValue<string>>({value: "", error: false, errorMessage: " "});
  const [defLang, setDefLang] = useState<FormValue<string>>({value: "", error: false, errorMessage: " "});
  const [numberOfCards, setNumberOfCards] = useState<FormValue<string>>({value: "", error: false, errorMessage: " "});
  const {feedback} = useFeedback();

  async function handleSubmit() {
    if (topic.value === "" || nameLang.value === "" || defLang.value === "" || numberOfCards.value === "") {
      feedback("Invalid input!", "error");
      highlightRequired();
    } else {
      const numberOfCardsValue = parseInt(numberOfCards.value);
      const generateConfig: TopicWithWordsRequest = {
        topic: topic.value,
        level,
        nameLang: nameLang.value,
        defLang: defLang.value,
        numberOfCards: numberOfCardsValue
      };
      onGenerate(generateConfig);
    }
  }

  function highlightRequired() {
    if (topic.value === "") handleTopicChange(topic.value);
    if (nameLang.value === "") handleNameLangChange(nameLang.value);
    if (defLang.value === "") handleDefLangChange(defLang.value);
    if (numberOfCards.value === "") handleNumberOfCardsChange(numberOfCards.value);
  }

  function handleTopicChange(topicValue: string) {
    if (topicValue.length > 40) {
      setTopic({value: topicValue, error: true, errorMessage: "Too long, max 40 character"});
    } else if (topicValue.length === 0) {
      setTopic({value: topicValue, error: true, errorMessage: "Enter a topic"});
    } else {
      setTopic({value: topicValue, error: false, errorMessage: " "});
    }
  }

  function handleNameLangChange(nameLangValue: string) {
    if (nameLangValue.length === 0) {
      setNameLang({value: nameLangValue, error: true, errorMessage: "Provide a language"})
    } else {
      setNameLang({value: nameLangValue, error: false, errorMessage: " "});
    }
  }

  function handleDefLangChange(defLangValue: string) {
    if (defLangValue.length === 0) {
      setDefLang({value: defLangValue, error: true, errorMessage: "Provide a language"});
    } else {
      setDefLang({value: defLangValue, error: false, errorMessage: " "});
    }
  }

  function handleNumberOfCardsChange(numberOfCardsValue: string) {
    if (!numberCheckRegex.test(numberOfCardsValue) && numberOfCardsValue !== "") return;
    const valueNum = parseInt(numberOfCardsValue);
    if (valueNum <= 0) {
      setNumberOfCards({value: numberOfCardsValue, error: true, errorMessage: "Must be greater than 0"})
    } else if (valueNum > 40) {
      setNumberOfCards({value: numberOfCardsValue, error: true, errorMessage: "40 or smaller"});
    } else if (numberOfCardsValue === "") {
      setNumberOfCards({value: numberOfCardsValue, error: true, errorMessage: "Enter a number"})
    } else {
      setNumberOfCards({value: numberOfCardsValue, error: false, errorMessage: " "});
    }
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
                  <TextField value={topic.value} placeholder='eg.: "English interview topic"' required multiline
                             onChange={(e) => handleTopicChange(e.target.value)}
                             onBlur={(e) => handleTopicChange(e.target.value)}
                             error={topic.error}
                             helperText={topic.errorMessage}
                             sx={{width: "80%", mt: 2}}/>
                </Grid>
                <Grid my={1} item xs={12} lg={6} p={1}>
                  <Typography>How many cards do you need?*</Typography>
                  <TextField required placeholder='eg.: "12", max: 40'
                             error={numberOfCards.error}
                             helperText={numberOfCards.errorMessage}
                             onBlur={(e) => handleNumberOfCardsChange(e.target.value)}
                             onChange={(e) => handleNumberOfCardsChange(e.target.value)}
                             value={numberOfCards.value} sx={{width: "80%", mt: 2}} inputProps={{type: "number"}}/>
                </Grid>
                <Grid my={1} item xs={12} lg={6} p={1}>
                  <Typography>Card front language:*</Typography>
                  <Autocomplete options={languages.filter(e => e !== defLang.value)}
                                renderInput={(params) => <TextField{...params}
                                                                   onChange={(e) => handleNameLangChange(e.target.value)}
                                                                   onBlur={(e) => handleNameLangChange(e.target.value)}
                                                                   value={nameLang.value}
                                                                   helperText={nameLang.errorMessage}
                                                                   sx={{width: "80%", mt: 2}}
                                                                   error={nameLang.error}
                                                                   placeholder="Card front language"/>}
                  />
                </Grid>
                <Grid my={1} item xs={12} lg={6} p={1}>
                  <Typography>Card back language:*</Typography>
                  <Autocomplete options={languages.filter(e => e !== nameLang.value)}
                                renderInput={(params) => <TextField{...params}
                                                                   onChange={(e) => handleDefLangChange(e.target.value)}
                                                                   onBlur={(e) => handleDefLangChange(e.target.value)}
                                                                   value={defLang.value}
                                                                   helperText={defLang.errorMessage}
                                                                   sx={{width: "80%", mt: 2}}
                                                                   error={defLang.error}
                                                                   placeholder="Card back language"/>}
                  />
                </Grid>
                <Grid my={1} item xs={12} lg={6} p={1}>
                  <Typography>Language level:</Typography>
                  <Select
                      sx={{width: "80%", mt: 2}}
                      id="demo-simple-select"
                      placeholder="Intermediate"
                      value={level}
                      onChange={(e) => setLevel(e.target.value as proficiencyLevel)}
                  >
                    <MenuItem value="BEGINNER">Beginner</MenuItem>
                    <MenuItem value="INTERMEDIATE">Intermediate</MenuItem>
                    <MenuItem value="ADVANCED">Advanced</MenuItem>
                    <MenuItem value="FLUENT">Fluent</MenuItem>
                  </Select>
                </Grid>
              </Grid>
              <Box display="flex" justifyContent="flex-end">
                <Button variant="outlined" sx={buttonStyle} onClick={handleSubmit}>Generate</Button>
              </Box>
            </Box>
          </Grid>
        </Grid>
      </Box>
  );
};

export default TopicWithWordsForm;