import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import {registerUser} from "../providers/userProvider.ts";
import {useFeedback} from "../context/alertContext/feedbackContextImport.ts";
import {ApiResObj} from "../type/dtos/ApiResObj.ts";
import {useForm} from "react-hook-form";
import {zodResolver} from '@hookform/resolvers/zod';
import {RegistrationFormSchema} from "../type/RegistrationFormSchema.ts";
import {RegistrationData} from "../type/RegistrationData.ts";
import {grey} from "@mui/material/colors";

interface Props {
  onNavigateLogin: () => void;
}

const RegisterForm = ({onNavigateLogin}: Props) => {
  const {feedback} = useFeedback();
  const {
    register,
    handleSubmit,
    formState: {errors},
  } = useForm<RegistrationData>({resolver: zodResolver(RegistrationFormSchema), mode: "onTouched"});

  async function submit(data: RegistrationData) {
    try {
      const response: ApiResObj = await registerUser(data);
      if (response.status === 201) {
        feedback("Successful registration!", "info");
        onNavigateLogin();
      } else if (response.status === 409) {
        feedback("User name is already used.", "error");
      }
    } catch (e) {
      console.error(e);
      feedback("Unexpected error occurred.", "error");
    }
  }

  return (
      <Box
          boxShadow={2}
          borderRadius={3}
          position="relative"
          p={1}
          bgcolor="white"
          paddingTop={2}
      >
        <Container component="main" maxWidth="xs" sx={{bgcolor: "white", borderRadius: 3}}>
          <Box sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}>
            <Grid container justifyContent="flex-start">
              <Typography component="h1" variant="h5">
                Register
              </Typography>
            </Grid>

            <Box component="form" onSubmit={handleSubmit(submit)} noValidate sx={{mt: 2}}>
              <TextField
                  type="string"
                  {...register("username")}
                  error={!!errors.username}
                  helperText={errors.username?.message ?? " "}
                  InputLabelProps={{style: {color: grey[600]}}}
                  margin="normal"
                  required
                  fullWidth
                  id="username"
                  label="Username"
                  name="username"
                  autoComplete="username"
                  sx={{
                    mb: 0
                  }}
              />
              <TextField
                  margin="normal"
                  required
                  {...register("password")}
                  error={!!errors.password}
                  helperText={errors.password?.message ?? " "}
                  InputLabelProps={{style: {color: grey[600]}}}
                  fullWidth
                  name="password"
                  label="Password"
                  type="password"
                  id="password"
                  autoComplete="current-password"
                  sx={{
                    mb: 0
                  }}
              />
              <TextField
                  margin="normal"
                  required
                  {...register("confirmPassword")}
                  error={!!errors.confirmPassword}
                  helperText={errors.confirmPassword?.message ?? " "}
                  InputLabelProps={{style: {color: grey[600]}}}
                  fullWidth
                  name="confirmPassword"
                  label="Password again"
                  type="password"
                  id="confirmPassword"
                  autoComplete="current-password"
                  sx={{
                    mb: 0
                  }}
              />
              <Grid container justifyContent="flex-end" sx={{pb: 1}}>
                <Button
                    type="submit"
                    variant="contained"
                    sx={{
                      mt: 3,
                      mb: 2,
                      color: "white",
                      bgcolor: "#469ca3",
                      "&:hover": {bgcolor: "#18838c", color: "white"}
                    }}
                >
                  register
                </Button>
              </Grid>
            </Box>
          </Box>
        </Container>
      </Box>
  );
};

export default RegisterForm;