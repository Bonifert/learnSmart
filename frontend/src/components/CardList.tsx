import {Term} from "./TopicForm.tsx";
import Typography from "@mui/material/Typography";
import {Accordion, AccordionDetails, AccordionSummary, Box, Grid} from "@mui/material";
import ArrowDownwardIcon from "@mui/icons-material/ArrowDownward";

interface Props {
  cards: Term[];
}

const CardList = ({cards} : Props) => {
  function urgencyCalculator(givenDate: Date): string {
    const now = new Date();
    if (givenDate < now) {
      return "Pending";
    } else {
      return "Fulfilled";
    }
  }

  return (
      <Box m={3}>
        <Typography variant="h5">Cards:</Typography>
        <Grid container>
          {cards.map(card => (
              <Grid item xs={12} sm={12} p={1}>
                <Accordion sx={{bgcolor: "#e6eff1"}}>
                  <AccordionSummary
                      expandIcon={<ArrowDownwardIcon/>}
                      aria-controls="panel1-content"
                      id="panel1-header"
                  >
                    <Typography sx={{width: '65%', flexShrink: 0}}>{card.name}</Typography>
                    <Typography
                        sx={{color: 'text.secondary'}}>{urgencyCalculator(new Date(card.nextShowDateTime))}</Typography>
                  </AccordionSummary>
                  <AccordionDetails>
                    <Typography>
                      {card.definition}
                    </Typography>
                  </AccordionDetails>
                </Accordion>
              </Grid>
          ))}
        </Grid>
      </Box>
  );
};

export default CardList;