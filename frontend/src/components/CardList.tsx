import {Term} from "./TopicForm.tsx";
import Typography from "@mui/material/Typography";
import {Accordion, AccordionDetails, AccordionSummary, Box, Grid} from "@mui/material";
import ArrowDownwardIcon from "@mui/icons-material/ArrowDownward";
import {BasicTerm} from "../pages/CreateTopicWithDefinition.tsx";

interface Props {
  cards: Term[] | BasicTerm[];
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
                    {('nextShowDateTime' in card) && (
                        <Typography sx={{color: 'text.secondary'}}>
                          {urgencyCalculator(new Date((card as Term).nextShowDateTime))}
                        </Typography>
                    )}
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