import {TopicWithWordsRequest} from "../pages/CreateTopicWithWords.tsx";
import {useState} from "react";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import {Select} from "@mui/material";
import MenuItem from "@mui/material/MenuItem";

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

type proficiencyLevel = "BEGINNER" | "INTERMEDIATE" | "ADVANCED" | "FLUENT";

const TopicWithWordsForm = ({onGenerate}: Props) => {
  const [topic, setTopic] = useState<string>("");
  const [level, setLevel] = useState<proficiencyLevel>("BEGINNER");
  const [nameLang, setNameLang] = useState<string>("");
  const [defLang, setDefLang] = useState<string>("");
  const [numberOfCards, setNumberOfCards] = useState<string>("");

  async function onSubmit() {
    const numberOfCardsValue = parseInt(numberOfCards);
    const generateConfig: TopicWithWordsRequest = {
      topic,
      level,
      nameLang,
      defLang,
      numberOfCards: numberOfCardsValue
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
                  <TextField value={topic} onChange={(e) => setTopic(e.target.value)} required
                             sx={{width: "80%", mt: 2}} placeholder='eg.: "English interview questions"*'/>
                </Grid>
                <Grid my={1} item xs={12} lg={6} p={1}>
                  <Typography>How many cards do you need?*</Typography>
                  <TextField required placeholder='eg.: "12", max: 30*' onChange={(e) => setNumberOfCards(e.target.value)}
                             value={numberOfCards} sx={{width: "80%", mt: 2}} inputProps={{type: "number"}}/>
                </Grid>
                <Grid my={1} item xs={12} lg={6} p={1}>
                  <Typography>Card front language:*</Typography>
                  <TextField required placeholder='eg.: "English"'
                             onChange={(e) => setNameLang(e.target.value)}
                             value={nameLang} sx={{width: "80%", mt: 2}}/>
                </Grid>
                <Grid my={1} item xs={12} lg={6} p={1}>
                  <Typography>Card back language:*</Typography>
                  <TextField required placeholder='eg.: "German"'
                             onChange={(e) => setDefLang(e.target.value)}
                             value={defLang} sx={{width: "80%", mt: 2}}/>
                </Grid>
                <Grid my={1} item xs={12} lg={6} p={1}>
                  <Typography>Give some example!*</Typography>
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
                <Button variant="outlined" sx={buttonStyle} onClick={onSubmit}>Generate</Button>
              </Box>
            </Box>
          </Grid>
        </Grid>
      </Box>
  );
};

export default TopicWithWordsForm;