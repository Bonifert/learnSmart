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

interface Props {
  topics: TopicInfo[];
}

export interface TopicInfo {
  readonly name: string;
  readonly termLength: number;
  readonly priority: string;
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
  topics = [{name: "English words", termLength: 16, priority: "Consider"}, {
    name: "German",
    termLength: 5,
    priority: "Prioritize"
  }, {name: "TypeScript workbook", termLength: 13, priority: "Consider"}, {
    name: "topics 1",
    termLength: 4,
    priority: "Optional"
  }, {name: "Type definitions", termLength: 4, priority: "Optional"}, {
    name: "topics 7",
    termLength: 120,
    priority: "Consider"
  }, {name: "English home topic", termLength: 4, priority: "Prioritize"}, {
    name: "topics 6",
    termLength: 9,
    priority: "Prioritize"
  }, {name: "Halo", termLength: 4, priority: "Optional"}, {
    name: "topics 2",
    termLength: 4,
    priority: "Optional"
  }, {name: "topics 3", termLength: 4, priority: "Consider"}, {
    name: "topics 89",
    termLength: 7,
    priority: "Optional"
  }, {name: "topics 4", termLength: 4, priority: "Optional"}, {
    name: "topics 23423",
    termLength: 32,
    priority: "Prioritize"
  }, {name: "topics 5", termLength: 4, priority: "Optional"}];

  const [filteredTopics, setFilteredTopics] = useState<TopicInfo[]>(topics);
  const [personName, setPersonName] = useState<string[]>(["Optional", "Consider", "Prioritize"]);
  const [currentPriorities, setCurrentPriorities] = useState("");

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

  return (
      <Box height="100%" width="100%" sx={{bgcolor: "#d1e6e8", justifyContent: 'center', alignItems: 'center'}}>
        <Grid container sx={{display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
          <Grid item height="70vh" xs={11} md={8} lg={7} sm={10} minWidth="275px">
            <Grid m={2} sx={{display: "flex", justifyContent: "center", alignItems: "center"}}>
              <Box flexDirection={{xs: "column", md: "row"}} sx={{display: "flex"}}>
                <TextField sx={{m: 1}} label="Search by name"
                           onChange={(e) => setCurrentPriorities(e.target.value)}
                           variant="outlined"/>
                <FormControl sx={{width: 300, m: 1}}>
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
                <Button sx={{m: 1, color: "#18838c", border: "1px solid #18838c"}}>Create topic</Button>
              </Box>
            </Grid>
            <Box pb={3}>
              <Grid sx={{bgcolor: "#A3CDD1", borderRadius: 2}}>
                <Grid height="5vh" sx={{bgcolor: "#74B5BA", borderRadius: 2}}>
                  <Grid container sx={{placeItems: "center"}} height="100%">
                    <Grid xs={4} item textAlign="center">
                      <Typography>Name</Typography>
                    </Grid>
                    <Grid xs={4} item textAlign="center">
                      <Typography>Number of term</Typography>
                    </Grid>
                    <Grid xs={4} item textAlign="center">
                      <Typography>Priority</Typography>
                    </Grid>
                  </Grid>
                </Grid>
                <Box pb={0.4}>
                {
                  filteredTopics.map(topic =>
                      <Grid item m={1} height="5vh" key={topic.name}
                            sx={{
                              bgcolor: "#d1e6e8",
                              "&:hover": {bgcolor: "#469ca3"},
                              alignItem: "center",
                              borderRadius: 2
                            }}>
                        <Button fullWidth>
                          <Grid container sx={{placeItems: "center", color: "black", textTransform: "none"}}>
                            <Grid item xs={4}>{topic.name}</Grid>
                            <Grid item xs={4}>{topic.termLength}</Grid>
                            <Grid item xs={4}>{topic.priority}</Grid>
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