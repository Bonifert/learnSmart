import {useState} from "react";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import {Autocomplete, Select} from "@mui/material";
import MenuItem from "@mui/material/MenuItem";
import languages from "../../languages.json";
import {TopicWithWordsDTO} from "../type/dtos/TopicWithWordsDTO.ts";
import {Controller, useForm} from "react-hook-form";
import {zodResolver} from "@hookform/resolvers/zod";
import {TopicWithWordsFormSchema} from "../type/TopicWithWordsFormSchema.ts";
import {TopicWithWordsFormData} from "../type/TopicWithWordsFormData.ts";
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
  onGenerate: (data: TopicWithWordsDTO) => void;
}

const TopicWithWordsForm = ({onGenerate}: Props) => {
  const [nameLangValue, setNameLangValue] = useState("");
  const [defLangValue, setDefLangValue] = useState("");
  const {
    register,
    handleSubmit,
    formState: {errors},
    control
  } = useForm<TopicWithWordsFormData>({
    resolver: zodResolver(TopicWithWordsFormSchema), mode: "onTouched", defaultValues: {
      nameLang: null,
      defLang: null
    }
  });

  async function submit(data: TopicWithWordsFormData) {
    // after zod validation, so the fields can't be null
    onGenerate(data as TopicWithWordsDTO);
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
                  <Typography>What should the topic be about?*</Typography>
                  <TextField placeholder='eg.: "English interview topic"' required multiline
                             type="text"
                             {...register("topic")}
                             error={!!errors.topic}
                             helperText={errors.topic?.message ?? " "}
                             sx={{width: "80%", mt: 2}}/>
                </Grid>
                <Grid my={1} item xs={12} lg={6} p={1}>
                  <Typography>How many cards do you need?*</Typography>
                  <TextField required placeholder='eg.: "12", max: 40'
                             type="number"
                             {...register("numberOfCards", {valueAsNumber: true})}
                             error={!!errors.numberOfCards}
                             helperText={errors.numberOfCards?.message ?? " "}
                             sx={{width: "80%", mt: 2}}/>
                </Grid>
                <Grid my={1} item xs={12} lg={6} p={1}>
                  <Typography>Card front language:*</Typography>
                  <Controller
                      name="nameLang"
                      control={control}
                      render={({field}) => (
                          <Autocomplete
                              {...field}
                              options={languages.filter(e => e !== defLangValue)}
                              isOptionEqualToValue={(option, value) => option === value || value === ''}
                              getOptionLabel={(option) => option}
                              onChange={(_, newValue) => {
                                field.onChange(newValue);
                                setNameLangValue(newValue as string);
                              }}
                              renderInput={(params) => (
                                  <TextField
                                      {...params}
                                      error={!!errors.nameLang}
                                      helperText={errors.nameLang?.message ?? " "}
                                      sx={{width: "80%", mt: 2}}
                                      placeholder="Card front language"
                                  />
                              )}
                          />
                      )}
                  />
                </Grid>
                <Grid my={1} item xs={12} lg={6} p={1}>
                  <Typography>Card back language:*</Typography>
                  <Controller
                      name="defLang"
                      control={control}
                      render={({field}) => (
                          <Autocomplete
                              {...field}
                              options={languages.filter(e => e !== nameLangValue)}
                              isOptionEqualToValue={(option, value) => option === value || value === ''}
                              getOptionLabel={(option) => option}
                              onChange={(_, newValue) => {
                                field.onChange(newValue);
                                setDefLangValue(newValue as string);
                              }}
                              renderInput={(params) => (
                                  <TextField
                                      {...params}
                                      error={!!errors.defLang}
                                      helperText={errors.defLang?.message ?? " "}
                                      sx={{width: "80%", mt: 2}}
                                      placeholder="Card back language"
                                  />
                              )}
                          />
                      )}
                  />
                </Grid>
                <Grid my={1} item xs={12} lg={6} p={1}>
                  <Typography>Language level:*</Typography>
                  <Select
                      {...register("level")}
                      sx={{width: "80%", mt: 2}}
                      id="demo-simple-select"
                      placeholder="Intermediate"
                      defaultValue="BEGINNER"
                  >
                    <MenuItem value="BEGINNER">Beginner</MenuItem>
                    <MenuItem value="INTERMEDIATE">Intermediate</MenuItem>
                    <MenuItem value="ADVANCED">Advanced</MenuItem>
                    <MenuItem value="FLUENT">Fluent</MenuItem>
                  </Select>
                </Grid>
              </Grid>
              <Box display="flex" justifyContent="flex-end">
                <InfoPopover message="Generated content may not always be accurate, so use with caution."/>
                <Button type="submit" variant="outlined" sx={buttonStyle}
                        onClick={handleSubmit(submit)}>Generate</Button>
              </Box>
            </Box>
          </Grid>
        </Grid>
      </Box>
  );
};

export default TopicWithWordsForm;