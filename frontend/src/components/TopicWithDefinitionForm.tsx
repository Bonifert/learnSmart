import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import {TopicWithDefinitionDTO} from "../type/dtos/TopicWithDefinitionDTO.ts";
import {useForm} from "react-hook-form";
import {zodResolver} from "@hookform/resolvers/zod";
import {TopicWithDefinitionFormSchema} from "../type/TopicWithDefinitionFormSchema.ts";
import InfoPopover from "./InfoPopover.tsx";

const centerStyle = {display: "flex", alignItems: "center", justifyContent: "center"};
const buttonStyle = {
  color: "white",
  bgcolor: "#469ca3",
  borderColor: "#469ca3",
  "&:hover": {bgcolor: "#18838c"},
  boxShadow: 2
};

interface Props {
  onGenerate: (data: TopicWithDefinitionDTO) => void;
}

const TopicWithDefinitionForm = ({onGenerate}: Props) => {
  const {
    register,
    handleSubmit,
    formState: {errors}
  } = useForm<TopicWithDefinitionDTO>({resolver: zodResolver(TopicWithDefinitionFormSchema), mode: "onTouched"});

  async function submit(data: TopicWithDefinitionDTO) {
    onGenerate(data);
  }

  return (
      <Box height="100%" width="100%" sx={{...centerStyle}}>
        <Grid my={4} container
              sx={{...centerStyle}}>
          <Grid item xs={10} sm={8} md={7} lg={6} minWidth="275px"
                sx={{bgcolor: "white", borderRadius: 2, boxShadow: 3}}>
            <Box m={3}>
              <Box>
                <Typography variant="h5">
                  Enter the configuration to generate topic!
                </Typography>
                <Typography mt={5}>* is required!</Typography>
              </Box>
              <Grid container my={1}>
                <Grid my={1} item xs={12} lg={6} p={1}>
                  <Box>
                    <Typography>What should the topic be about?*</Typography>
                    <TextField placeholder="eg.: Human brain*" required multiline
                               type="text"
                               {...register("topic")}
                               name="topic"
                               error={!!errors.topic}
                               helperText={errors.topic?.message ?? " "}
                               sx={{width: "80%", mt: 2}}
                    />
                  </Box>
                </Grid>
                <Grid my={1} item xs={12} lg={6} p={1}>
                  <Typography>How many cards do you need?*</Typography>
                  <TextField required placeholder="eg.: 12, max: 30*"
                             type="number"
                             {...register("numberOfCards", {valueAsNumber: true})}
                             error={!!errors.numberOfCards}
                             name="numberOfCards"
                             helperText={errors.numberOfCards?.message ?? " "}
                             sx={{width: "80%", mt: 2}}
                  />
                </Grid>
                <Grid my={1} item xs={12} lg={6} p={1}>
                  <Typography>Give some example!</Typography>
                  <TextField placeholder="eg.: Diencephalon, grey matter"
                             type="text"
                             {...register("examples")}
                             name="examples"
                             helperText={errors.examples?.message ?? " "}
                             sx={{width: "80%", mt: 2}}
                  />
                </Grid>
                <Grid my={1} item xs={12} lg={6} p={1}>
                  <Typography>Length (in sentences):</Typography>
                  <TextField placeholder="eg.: 4, max: 8"
                             type="number"
                             sx={{width: "80%", mt: 2}}
                             {...register("definitionSentenceAmount", {valueAsNumber: true})}
                             error={!!errors.definitionSentenceAmount}
                             helperText={errors.definitionSentenceAmount?.message ?? " "}
                  />
                </Grid>
              </Grid>
              <Box display="flex" justifyContent="flex-end">
                <Button type="submit" variant="outlined" sx={buttonStyle}
                        onClick={handleSubmit(submit)}>Generate</Button>
              </Box>
            </Box>
          </Grid>
        </Grid>
      </Box>
  );
};

export default TopicWithDefinitionForm;