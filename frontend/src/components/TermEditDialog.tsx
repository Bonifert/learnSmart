import {Dialog, DialogActions, DialogContent, DialogTitle} from "@mui/material";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import {Term} from "./TopicForm.tsx";
import {useState} from "react";
import Grid from "@mui/material/Grid";
import DeleteOutlinedIcon from '@mui/icons-material/DeleteOutlined';

interface Props {
  open: boolean;
  term: Term;
  dialogText: string;
  onClose: () => void;
  onSave: (term: Term) => void;
  onDelete?: ()=>void
}

const TermEditDialog = ({term, onSave, onClose, open, dialogText, onDelete}: Props) => {
  const [name, setName] = useState(term.name);
  const [definition, setDefinition] = useState(term.definition);

  function handleSave(term: Term) {
    if (name !== "" && definition !== "") {
      onSave(term);
    }
  }

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
          <Grid container>
            <Grid item xs={6} sm={6} md={6} lg={6} xl={6}>
              {dialogText}
            </Grid>
            {onDelete && <Grid item xs={6} sm={6} md={6} lg={6} xl={6} sx={{display: 'flex', justifyContent: 'flex-end'}}>
              <Button variant="outlined" color="error" onClick={onDelete}><DeleteOutlinedIcon/></Button>
            </Grid>}

          </Grid>
        </DialogTitle>
        <DialogContent sx={{my: 2}}>
          <Grid container>
            <TextField multiline sx={{m: 1}} label="Name" value={name} fullWidth
                       onChange={(e) => setName(e.target.value)}
                       color={name.trim() !== "" ? "primary" : "error"} required/>
            <TextField multiline sx={{m: 1}} label="Definition" value={definition} fullWidth
                       onChange={(e) => setDefinition(e.target.value)}
                       color={definition.trim() !== "" ? "primary" : "error"} required/>
          </Grid>
        </DialogContent>
        <DialogActions>
          <Button disabled={name.trim() === "" || definition.trim() === ""}
                  onClick={() => handleSave({...term, name, definition})}>Save</Button>
          <Button onClick={() => onClose()} autoFocus>
            Close
          </Button>
        </DialogActions>
      </Dialog>
  );
};

export default TermEditDialog;