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
import {deleteTopic, editTopicName} from "../providers/topicProvider.ts";
import {useNavigate} from "react-router-dom";
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined';
import InfoPopover from "./InfoPopover.tsx";
import {AddCircleOutlined} from "@mui/icons-material";
import DeleteOutlinedIcon from '@mui/icons-material/DeleteOutlined';
import DoneOutlinedIcon from '@mui/icons-material/DoneOutlined';
import {Topic, Term} from "./types/Topic.ts";
import {ApiResObj} from "./types/dto/ApiResObj.ts";

interface Props {
  topic: Topic;
  disabled: boolean;
}

const TopicForm = ({topic, disabled}: Props) => {
  const {feedback} = useFeedback();
  const navigate = useNavigate();
  const [topicName, setTopicName] = useState(topic?.name ?? "");
  const debouncedTopicName = useDebouncedValue(topicName, 1000);
  const [terms, setTerms] = useState(topic?.terms ?? []);
  const [currentEditTerm, setCurrentEditTerm] = useState<Term>({
    name: "",
    definition: "",
    id: -1,
    nextShowDateTime: ""
  });
  const [editDialogOpen, setEditDialogOpen] = useState(false);
  const [newTermOpen, setNewTermOpen] = useState(false);

  function shortString(definition: string) {
    if (definition.length > 13) return definition.substring(0, 11) + "...";
    return definition;
  }

  async function handleTopicNameChange() {
    try {
      if (debouncedTopicName !== "" && debouncedTopicName !== topic.name) {
        const httpRes: ApiResObj = await editTopicName({topicId: topic.id, newName: debouncedTopicName});
        if (httpRes.status === 200) {
          feedback("Topic name saved!", "info");
        } else {
          feedback("We can't save the new name. Unexpected error occurred.", "error");
        }
      }
    } catch (e) {
      console.log(e);
      feedback("Unexpected error occurred.", "error");
    }
  }

  async function handleFinishEditing() {
    try {
      if (topicName !== debouncedTopicName) {
        const response: ApiResObj = await editTopicName({topicId: topic.id, newName: topicName});
        if (response.status === 200) {
          feedback("Topic name saved!", "info");
        } else {
          feedback("We can't save the new name. Unexpected error occurred.", "error");
        }
      }
      navigate(`/info/${topic.id}`);
    } catch (e) {
      console.log(e);
      feedback("We can't save the new name. Unexpected error occurred.", "error");
    }
  }

  useEffect(() => {
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
            id: term.id,
            nextShowDateTime: term.nextShowDateTime
          } : currentTerm);
        });
        feedback("Term edited!", "success");
      } else {
        feedback("The edit was not successful. Unexpected error occurred.", "error");
      }
    } catch (e) {
      console.log(e);
      feedback("The edit was not successful. Unexpected error occurred.", "error");
    } finally {
      handleDialogEditClose();
    }
  }

  function handleDialogEditClose() {
    setCurrentEditTerm({name: "", definition: "", id: -1, nextShowDateTime: ""});
    setEditDialogOpen(false);
  }

  async function handleNewTerm(term: Term) {
    try {
      const response = await createTerm({name: term.name, topicId: topic.id, definition: term.definition});
      if (response.status === 201 && response.body) {
        setTerms((prevState) => {
          const newTerm: Term = response.body as Term;
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
      const response: ApiResObj = await deleteTopic(id);
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
      <Box height="100%" width="100%" sx={{justifyContent: 'center', alignItems: 'center'}}>
        <Grid my={4} container
              sx={{display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
          <Grid boxShadow={3} item xs={11} md={8} lg={7} sm={10} minWidth="275px"
                sx={{bgcolor: "white", borderRadius: 2}}>
            <Grid container>
              <Grid item xs={12} sm={8} md={6} lg={6} xl={6}>
                <Box m={3}>
                  <Typography color="#676767" mb={2}><InfoOutlinedIcon fontSize="inherit"/> Enter the topic
                    name</Typography>
                  <TextField value={topicName} sx={{width: "75%"}} onChange={(e) => handleEditTopicName(e.target.value)}
                             label="Topic name"
                             color={topicName === "" ? "error" : "primary"}/>
                </Box>
              </Grid>
              <Grid item xs={12} sm={4} md={6} lg={6} xl={6}>
                <Box m={3} sx={{display: 'flex', justifyContent: 'flex-end'}}>
                  <Button onClick={handleFinishEditing} sx={{
                    color: "white",
                    bgcolor: "#469ca3",
                    mr: 1.5,
                    borderColor: "#469ca3",
                    "&:hover": {bgcolor: "#18838c"}
                  }}
                          variant="outlined"
                          color="inherit"><DoneOutlinedIcon/></Button>

                  <Button
                      onClick={() => handleTopicDelete(topic?.id)}
                      sx={{marginRight: 1, "&:hover": {bgcolor: "#b6040a", color: "white"}}}
                      variant="outlined"
                      color="error"
                      disabled={disabled}
                  >
                    <DeleteOutlinedIcon fontSize="medium"/>
                  </Button>
                </Box>
              </Grid>
              <Grid my={3} container sx={{display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
                <Grid boxShadow={2} item xs={11} sm={11} md={9} lg={9} xl={9}
                      sx={{bgcolor: "white", borderRadius: 3}}>
                  <Grid sx={{bgcolor: "#bcd8dc", borderRadius: 2}}>
                    <Grid container sx={{placeItems: "center"}} height="100%">
                      <Grid pl={3} item xs={6} textAlign="left">
                        <Typography>Cards
                          <InfoPopover
                              message={"Click on the \"+\" button to create new card.\nClick on the card to edit or delete it."}>

                          </InfoPopover>
                        </Typography>
                      </Grid>
                      <Grid item xs={6} textAlign="right" p={0.4}>
                        <Button size="small"
                                onClick={() => setNewTermOpen(true)}
                                sx={{
                                  color: "white",
                                  borderRadius: "7px",
                                  backgroundColor: "#18838c",
                                  "&:hover": {bgcolor: "#154f57"}
                                }}><AddCircleOutlined fontSize="small"/></Button>
                      </Grid>
                    </Grid>
                  </Grid>
                  <Grid container p={0.5}>
                    {terms.map(term => <Grid item xs={12} sm={6} key={term.id}
                    >
                      <Box m={0.5} sx={{
                        bgcolor: "#d8e6e8",
                        "&:hover": {bgcolor: "#c7dfe1", transform: "scaleY(1.1) scaleX(1.01)", transition: ".1s"},
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
          <TermEditDialog dialogText="Edit card" open={true} term={currentEditTerm} onClose={handleDialogEditClose}
                          onSave={handleEditTerm} onDelete={() => deleteTermById(currentEditTerm.id)}/>
        }
        {
            newTermOpen && <TermEditDialog dialogText="Create card" open={true} term={currentEditTerm}
                                           onClose={() => setNewTermOpen(false)}
                                           onSave={handleNewTerm}/>
        }
      </Box>
  );
};

export default TopicForm;