import {Dialog, DialogActions, DialogContent, DialogTitle} from "@mui/material";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import {Term} from "./TopicForm.tsx";
import { useState} from "react";
import Grid from "@mui/material/Grid";

interface Props {c
  open: boolean;
  term: Term;
  onClose: () => void;
  onSave: (term: Term) => void;
}

const TermEditDialog = ({term, onSave, onClose, open}: Props) => {
  const [name, setName] = useState(term.name);
  const [definition, setDefinition] = useState(term.definition);

  return (
      <Dialog
          open={open}
          onClose={onClose}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
          fullWidth
          maxWidth="sm"
      >
        <DialogTitle id="alert-dialog-title">
          Edit term
        </DialogTitle>
        <DialogContent sx={{my: 2}}>
          <Grid container>
          <TextField multiline sx={{m: 1}} label="Name" value={name} defaultValue={term.name} fullWidth
                     onChange={(e) => setName(e.target.value)}/>
          <TextField multiline sx={{m: 1}} label="Definition" value={definition} fullWidth
                     onChange={(e) => setDefinition(e.target.value)}/>
          </Grid>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => onSave({...term, name, definition})}>Save</Button>
          <Button onClick={() => onClose()} autoFocus>
            Close
          </Button>
        </DialogActions>
      </Dialog>
  );
};

export default TermEditDialog;