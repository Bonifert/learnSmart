import Grid from "@mui/material/Grid";
import {
  Button,
  Checkbox,
  FormControl,
  InputLabel,
  ListItemText,
  OutlinedInput,
  Select, SelectChangeEvent
} from "@mui/material";
import {useEffect, useState} from "react";
import TextField from "@mui/material/TextField";
import Box from "@mui/material/Box";
import MenuItem from "@mui/material/MenuItem";
import Typography from "@mui/material/Typography";
import {createTopic} from "../providers/topicProvider.ts";
import {useNavigate} from "react-router-dom";
import {useFeedback} from "../context/alertContext/feedbackContextImport.ts";
import CircularProgress from '@mui/material/CircularProgress';

interface Props {
  topics: TopicInfo[];
}

export interface TopicInfo {
  readonly name: string;
  readonly termLength: number;
  readonly priority: string;
  readonly id: number;
}

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
} as const;

const priorityNames = ["Optional", "Consider", "Prioritize"] as const;

const TopicList = ({topics}: Props) => {

  useEffect(() => {
    setFilteredTopics(topics)
  }, [topics]);

  const navigate = useNavigate();
  const {feedback} = useFeedback();
  const [filteredTopics, setFilteredTopics] = useState<TopicInfo[]>(topics);
  const [personName, setPersonName] = useState<string[]>(["Optional", "Consider", "Prioritize"]);
  const [currentPriorities, setCurrentPriorities] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const newFilteredTopics: TopicInfo[] = [];
    for (const topic of topics) {
      if (topic.name.toLowerCase().startsWith(currentPriorities.toLowerCase()) && personName.includes(topic.priority)) {
        newFilteredTopics.push(topic);
      }
    }
    setFilteredTopics(newFilteredTopics);
  }, [currentPriorities, personName]);

  const handleSelectChange = (event: SelectChangeEvent<typeof personName>) => {
    const {
      target: {value},
    } = event;
    setPersonName(
        typeof value === 'string' ? value.split(',') : value,
    );
  };

  async function handleCreateTopic() {
    setLoading(true);
    try {
      const response = await createTopic();
      if (response.status === 201 && response.body) {
        feedback("Topic created!", "success");
        navigate(`/edit/${response.body}`)
      } else {
        feedback("Unexpected error occurred.", "error");
      }
    } catch (e) {
      feedback("Unexpected error occurred.", "error");
    } finally {
      setLoading(false);
    }
  }

  if (loading) return <CircularProgress/>

  return (
      <Box height="100%" width="100%" sx={{justifyContent: 'center', alignItems: 'center'}}>
        <Grid container sx={{display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
          <Grid item height="70vh" xs={11} sm={10} md={8} lg={7} minWidth="275px">
            <Grid my={2} sx={{display: "flex", justifyContent: "center", alignItems: "center"}}>
              <Box flexDirection={{xs: "column", md: "row"}} sx={{display: "flex", justifyContent: "space-between", width: "100%"}} gap={2}>
                <Box flexDirection={{xs: "column", md:"row"}} display="flex" gap={2}>
                  <TextField label="Search by name"
                             onChange={(e) => setCurrentPriorities(e.target.value)}
                             variant="outlined"
                  size="small" />
                  <FormControl size="small" sx={{minWidth: "250px"}}>
                    <InputLabel id="demo-multiple-checkbox-label">Priority</InputLabel>
                    <Select
                        labelId="demo-multiple-checkbox-label"
                        id="demo-multiple-checkbox"
                        multiple
                        value={personName}
                        input={<OutlinedInput label="Priority"/>}
                        renderValue={(selected: string[]) => selected.join(', ')}
                        MenuProps={MenuProps}
                        onChange={handleSelectChange}
                    >
                      {priorityNames.map((name) => (
                          <MenuItem key={name} value={name}>
                            <Checkbox checked={personName.indexOf(name) > -1}/>
                            <ListItemText primary={name}/>
                          </MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                </Box>
                <Button onClick={handleCreateTopic}
                        sx={{color: "#18838c", border: "1px solid #18838c", minWidth: "125px"}}>Create topic</Button>
              </Box>
            </Grid>
            <Box pb={3}>
              <Grid sx={{bgcolor: "white", borderRadius: 2, boxShadow: 2}}>
                <Grid p={1} sx={{bgcolor: "#bcd8dc", borderRadius: 2, borderBottomLeftRadius: 0, borderBottomRightRadius: 0}}>
                  <Grid container sx={{placeItems: "center"}} height="100%">
                    <Grid xs={4} item textAlign="center">
                      <Typography pl={3}>Name</Typography>
                    </Grid>
                    <Grid xs={4} item textAlign="center">
                      <Typography>Priority</Typography>
                    </Grid>
                    <Grid xs={4} pr={3} item textAlign="center">
                      <Typography>Cards</Typography>
                    </Grid>
                  </Grid>
                </Grid>
                <Box pb={0.4}>
                  {
                    filteredTopics.map(topic =>
                        <Grid item m={1.2} key={topic.id}
                              sx={{
                                bgcolor: "#d8e6e8",
                                "&:hover": {bgcolor: "#c7dfe1", transform: "scaleY(1.1) scaleX(1.006)", transition: ".1s"},
                                alignItem: "center",
                                borderRadius: 2
                              }}>
                          <Button fullWidth onClick={()=> navigate(`/info/${topic.id}`)}>
                            <Grid container sx={{placeItems: "center", color: "black", textTransform: "none"}}>
                              <Grid item xs={4}>{topic.name}</Grid>
                              <Grid item xs={4}>{topic.priority}</Grid>
                              <Grid item xs={4}>{topic.termLength}</Grid>
                            </Grid>
                          </Button>
                        </Grid>
                    )
                  }
                </Box>
              </Grid>
            </Box>
          </Grid>
        </Grid>
      </Box>
  );
};

export default TopicList;