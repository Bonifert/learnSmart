import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import {useState} from "react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import TermEditDialog from "./TermEditDialog.tsx";

export interface Topic {
  name: string;
  id?: number;
  terms: Term[];
}

export interface Term {
  id: number;
  name: string;
  definition: string;
}

interface Props {
  topic: Topic | null;
  onSave: (topic: Topic) => void;
  onDelete: (id: number) => void;
  disabled: boolean
}

const TopicForm = ({topic, onSave, onDelete, disabled}: Props) => {
  topic = {
    name: "boni topic",
    id: 1,
    terms: [
      {
        id: 1,
        name: "Boni",
        definition: "me"
      },
      {
        id: 2,
        name: "apple",
        definition: "almaalmaalmaaadsfasd"
      },
      {
        id: 3,
        name: "valaki",
        definition: "jozsi"
      },
      {
        id: 4,
        name: "React context",
        definition: "It is an useful tool, to create a.........."
      },
      {
        id: 5,
        name: "valaki",
        definition: "jozsi"
      },
    ]
  }
  const [topicName, setTopicName] = useState(topic?.name ?? "Boni topic");
  const [terms, setTerms] = useState(topic?.terms ?? []);
  const [editTerm, setEditTerm] = useState<Term>({name: "", definition: "", id: -1});
  const [editDialogOpen, setEditDialogOpen] = useState(false);
  const [newTermOpen, setNewTermOpen] = useState(false);

  function shortString(definition: string) {
    if (definition.length > 13) return definition.substring(0, 11) + "...";
    return definition;
  }

  function handleSubmit() {
    const topicToSave: Topic = {...topic, name: topicName, terms};
    onSave(topicToSave);
  }

  function handleEditTerm(term: Term) {
    setTerms((prevState) => {
      const newTerms = [...prevState];
      return newTerms.map(currentTerm => currentTerm.id === term.id ? {
        name: term.name,
        definition: term.definition,
        id: term.id
      } : currentTerm);
    });
    setEditDialogOpen(false);
  }

  function handleDialogEditClose() {
    setEditTerm({name: "", definition: "", id: -1});
    setEditDialogOpen(false);
  }

  function handleNewTerm(term: Term){
    setTerms((prevState) => {
      return [...prevState, term];
    });
    setNewTermOpen(false);
  }

  return (
      <Box height="100%" width="100%" sx={{bgcolor: "#d1e6e8", justifyContent: 'center', alignItems: 'center'}}>
        <Grid my={4} container
              sx={{bgcolor: "#d1e6e8", display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
          <Grid item xs={11} md={8} lg={7} sm={10} minWidth="275px"
                sx={{bgcolor: "#A3CDD1", borderRadius: 2}}>
            <Grid container>
              <Grid item xs={12} sm={6} md={6} lg={6} xl={6}>
                <Box m={2} sx={{display: 'flex'}}>
                  <TextField value={topicName} sx={{width: "75%"}} onChange={(e) => setTopicName(e.target.value)}
                             label="Topic name"
                             color={topicName === "" ? "error" : "primary"}/>
                </Box>
              </Grid>
              <Grid item xs={12} sm={6} md={6} lg={6} xl={6}>
                <Box m={1.5} sx={{display: 'flex', justifyContent: 'flex-end'}}>
                  {topic?.id && (
                      <Button
                          onClick={() => onDelete(Number(topic?.id))}
                          sx={{marginRight: 1, "&:hover": {bgcolor: "#b6040a", color: "white"}}}
                          variant="outlined"
                          color="error"
                          disabled={disabled}
                      >
                        Delete
                      </Button>
                  )}
                  <Button disabled={disabled} onClick={() => handleSubmit()} sx={{marginLeft: 1}} variant="contained"
                          color="success">Save</Button>
                </Box>
              </Grid>
              <Grid my={2} container sx={{display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
                <Grid item xs={11} sm={11} md={9} lg={9} xl={9} sx={{bgcolor: "#d1e6e8", borderRadius: 3}}>
                  <Grid sx={{bgcolor: "#74B5BA", borderRadius: 2}}>
                    <Grid container sx={{placeItems: "center"}} height="100%">
                      <Grid pl={3} item xs={6} textAlign="left">
                        <Typography>Terms</Typography>
                      </Grid>
                      <Grid xs={6} textAlign="right" p={0.4}>
                        <Button size="small"
                                onClick={()=> setNewTermOpen(true)}
                                sx={{
                          color: "white",
                          borderRadius: "7px",
                          backgroundColor: "#18838c",
                          "&:hover": {bgcolor: "#154f57"}
                        }}>Create term</Button>
                      </Grid>
                    </Grid>
                  </Grid>
                  <Grid container p={0.5}>
                    {terms.map(term => <Grid item xs={12} sm={6} key={term.id}
                    >
                      <Box m={0.5} sx={{
                        bgcolor: "#a3cdd1",
                        "&:hover": {bgcolor: "#469ca3"},
                        alignItem: "center",
                        borderRadius: 2
                      }}>
                        <Button fullWidth onClick={() => {
                          setEditDialogOpen(true);
                          setEditTerm({...term});
                        }}>
                          <Grid container sx={{placeItems: "center", color: "black", textTransform: "none"}}>
                            <Grid item xs={6}>{shortString(term.name)}</Grid>
                            <Grid item xs={6}>{shortString(term.definition)}</Grid>
                          </Grid>
                        </Button>
                      </Box>
                    </Grid>)}
                  </Grid>
                </Grid>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
        {
          editDialogOpen && <TermEditDialog open={true} term={editTerm} onClose={handleDialogEditClose}
                                            onSave={handleEditTerm}/>
        }
        {
          newTermOpen && <TermEditDialog open={true} term={editTerm} onClose={()=> setNewTermOpen(false)}
                                         onSave={handleNewTerm}/>
        }
      </Box>
  )
      ;
};

export default TopicForm;