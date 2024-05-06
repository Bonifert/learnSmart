import {Term} from "../type/Topic.ts";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import {useEffect, useState} from "react";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";

interface Props {
  onTermSuccess: (id: number) => void;
  onTermFailed: () => void;
  term: Term;
  termInfo: string;
}

const TermWithFlashCard = ({onTermSuccess, onTermFailed, term, termInfo}: Props) => {
  const [isFlipped, setIsFlipped] = useState(false);

  useEffect(() => {
    setIsFlipped(false);
  }, [term]); // todo is it good like this?

  function handleFlip() {
    setIsFlipped(!isFlipped);
  }

  return (
      <Grid height="100%" width="100%" my={4} container
            sx={{display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
        <Grid item xs={10} sm={8} md={7} lg={6} xl={5} minWidth="275px"
              sx={{
                borderRadius: 2,
                justifyContent: "center"
              }}>
          <Grid container>
            <Grid item xs={4}>
              <Button variant="outlined" onClick={onTermFailed} color="error">Not yet</Button>
            </Grid>
            <Grid item xs={4} sx={{display: "flex", justifyContent: "center"}}>
              <Typography>{termInfo}</Typography>
            </Grid>
            <Grid item xs={4} sx={{display: "flex", justifyContent: "flex-end"}}>
              <Button variant="outlined" color="success" onClick={()=>onTermSuccess(term.id)}>Finished</Button>
            </Grid>
          </Grid>
          <Grid xs={12} className="flip-card" onClick={handleFlip}>
            <Box sx={{display: "flex", justifyContent: "center", alignItems: "cen"}}>
              <div className={isFlipped ? "flip-card-inner flipped" : "flip-card-inner"}>
                <div className="flip-card-front">
                  <Typography p={5}>{term.name}</Typography>
                </div>
                <div className="flip-card-back">
                  <Typography p={5}>{term.definition}</Typography>
                </div>
              </div>
            </Box>
          </Grid>
        </Grid>
      </Grid>
  );
};

export default TermWithFlashCard;
