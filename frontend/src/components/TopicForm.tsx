import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import {useEffect, useState} from "react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import TermEditDialog from "./TermEditDialog.tsx";
import {createTerm, deleteTerm, editTerm} from "../providers/termProvider.ts";
import {useFeedback} from "../context/alertContext/feedbackContextImport.ts";
import useDebouncedValue from "../hooks/useDebouncedValue.tsx";
import {ApiResObj} from "../providers/userProvider.ts";
import {editTopicName} from "../providers/topicProvider.ts";
import {useNavigate} from "react-router-dom";
import {deleteTopic} from "../providers/topicProvider.ts";

export interface Topic {
  name: string;
  id: number;
  terms: Term[];
}

export interface Term {
  id: number;
  name: string;
  definition: string;
}

interface Props {
  topic: Topic;
  disabled: boolean;
}

const TopicForm = ({topic, disabled}: Props) => {
  const {feedback} = useFeedback();
  const navigate = useNavigate();
  const [topicName, setTopicName] = useState(topic?.name ?? "");
  const debouncedTopicName = useDebouncedValue(topicName, 2000);
  const [terms, setTerms] = useState(topic?.terms ?? []);
  const [currentEditTerm, setCurrentEditTerm] = useState<Term>({name: "", definition: "", id: -1});
  const [editDialogOpen, setEditDialogOpen] = useState(false);
  const [newTermOpen, setNewTermOpen] = useState(false);

  function shortString(definition: string) {
    if (definition.length > 13) return definition.substring(0, 11) + "...";
    return definition;
  }

  useEffect(() => {
    async function handleTopicNameChange() {
      // to not fetch if the page is just loaded
      if (debouncedTopicName !== "" && debouncedTopicName !== topic.name) {
        const httpRes: ApiResObj = await editTopicName({topicId: topic.id, newName: debouncedTopicName});
        if (httpRes.status === 200) {
          feedback("Topic name saved!", "info");
        } else {
          feedback("We can't save the new name. Unexpected error occurred.", "error");
        }
      }
    }

    handleTopicNameChange();
  }, [debouncedTopicName]);

  function handleEditTopicName(newName: string) {
    setTopicName(newName);
  }

  async function handleEditTerm(term: Term) {
    try {
      const response = await editTerm(term);
      console.log(response)
      if (response.status === 200) {
        setTerms((prevState) => {
          const newTerms = [...prevState];
          return newTerms.map(currentTerm => currentTerm.id === term.id ? {
            name: term.name,
            definition: term.definition,
            id: term.id
          } : currentTerm);
        });
        feedback("Term edited!", "success");
      }
    } catch (e) {
      console.log(e);
      feedback("The edit was not successful", "error");
    } finally {
      handleDialogEditClose();
    }
  }

  function handleDialogEditClose() {
    setCurrentEditTerm({name: "", definition: "", id: -1});
    setEditDialogOpen(false);
  }

  async function handleNewTerm(term: Term) {
    try {
      const response = await createTerm({name: term.name, topicId: topic.id, definition: term.definition});
      if (response.status === 201 && response.body ) {
        setTerms((prevState) => {
          const newTerm : Term = {id: response.body as number, name: term.name, definition: term.definition};
          return [...prevState, newTerm];
        });
        feedback("Term created!", "success");
      } else {
        feedback("Unexpected error occurred.", "error");
      }
    } catch (e) {
      console.error(e);
      feedback("Unexpected error occurred.", "error");
    } finally {
      setNewTermOpen(false);
    }
  }

  async function handleTopicDelete(id: number) {
    try {
      const response : ApiResObj = await deleteTopic(id);
      if (response.status === 200) {
        feedback("Topic deleted", "success");
        navigate("/");
      } else {
        feedback("Unexpected error occurred.", "error");
      }
    } catch (e) {
      console.log(e);
      feedback("Unexpected error occurred.", "error");
    }
  }

  async function deleteTermById(id: number) {
    try {
      const response: ApiResObj = await deleteTerm(id);
      if (response.status === 200) {
        setTerms((prevState) => {
          return [...prevState].filter(state => state.id !== id)
        });
        feedback("Term deleted", "success");
      } else {
        feedback("Unexpected error occurred.", "error");
      }
    } catch (e) {
      console.log(e);
      feedback("Unexpected error occurred.", "error");
    } finally {
      handleDialogEditClose();
    }

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
                  <TextField value={topicName} sx={{width: "75%"}} onChange={(e) => handleEditTopicName(e.target.value)}
                             label="Topic name"
                             color={topicName === "" ? "error" : "primary"}/>
                </Box>
              </Grid>
              <Grid item xs={12} sm={6} md={6} lg={6} xl={6}>
                <Box m={1.5} sx={{display: 'flex', justifyContent: 'flex-end'}}>
                  {topic?.id && (
                      <Button
                          onClick={() => handleTopicDelete(topic?.id)}
                          sx={{marginRight: 1, "&:hover": {bgcolor: "#b6040a", color: "white"}}}
                          variant="outlined"
                          color="error"
                          disabled={disabled}
                      >
                        Delete
                      </Button>
                  )}
                </Box>
              </Grid>
              <Grid my={2} container sx={{display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
                <Grid item xs={11} sm={11} md={9} lg={9} xl={9} sx={{bgcolor: "#d1e6e8", borderRadius: 3}}>
                  <Grid sx={{bgcolor: "#74B5BA", borderRadius: 2}}>
                    <Grid container sx={{placeItems: "center"}} height="100%">
                      <Grid pl={3} item xs={6} textAlign="left">
                        <Typography>Terms</Typography>
                      </Grid>
                      <Grid item xs={6} textAlign="right" p={0.4}>
                        <Button size="small"
                                onClick={() => setNewTermOpen(true)}
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
                          setCurrentEditTerm({...term});
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
            editDialogOpen &&
          <TermEditDialog dialogText="Edit term" open={true} term={currentEditTerm} onClose={handleDialogEditClose}
                          onSave={handleEditTerm} onDelete={()=> deleteTermById(currentEditTerm.id)}/>
        }
        {
            newTermOpen && <TermEditDialog dialogText="Create term" open={true} term={currentEditTerm}
                                           onClose={() => setNewTermOpen(false)}
                                           onSave={handleNewTerm}/>
        }
      </Box>
  );
};

export default TopicForm;