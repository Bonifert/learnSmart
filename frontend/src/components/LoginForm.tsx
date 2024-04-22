import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import {useUser} from "../context/userContext/userContextImport.ts";
import {useFeedback} from "../context/alertContext/feedbackContextImport.ts";
import {useNavigate} from "react-router-dom";
import {useEffect} from "react";
import {ApiResObj} from "./types/dto/ApiResObj.ts";
import {UsernamePasswordDTO} from "./types/dto/UsernamePasswordDTO.ts";
import {useForm} from "react-hook-form";
import {zodResolver} from "@hookform/resolvers/zod";
import {LoginFormSchema} from "./types/LoginFormSchema.ts";
import {grey} from "@mui/material/colors";

const LoginForm = () => {
  const navigate = useNavigate();
  const {login, user} = useUser();
  const {feedback} = useFeedback();
  const {
    register,
    handleSubmit,
    formState: {errors},
  } = useForm<UsernamePasswordDTO>({resolver: zodResolver(LoginFormSchema), mode: "onSubmit"});

  useEffect(() => {
    if (user){
      navigate("/");
    }
  }, [user]);

  const submit = async (data: UsernamePasswordDTO) => {

    try {
      const response: ApiResObj = await login(data);
      if (response.status === 401) {
        feedback("Invalid user name or password!", "error");
      } else if (response.status === 200) {
        if (user) {
          feedback("Logged in", "info");
        }
        return;
      } else {
        feedback("Unexpected error occurred.", "error");
      }
    } catch (e) {
      feedback("Unexpected error occurred.", "error");
    }
  };

  return (
      <Box
          boxShadow={2} // Adjust the shadow depth as needed
          borderRadius={3}
          position="relative" // Position relative to allow positioning of the shadow
          p={1} // Adjust padding as needed
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
                Sign in
              </Typography>
            </Grid>

            <Box component="form" onSubmit={handleSubmit(submit)} noValidate sx={{mt: 2}}>
              <TextField
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
                  autoFocus
                  sx={{
                    mb: 0
                  }}
              />
              <TextField
                  {...register("password")}
                  error={!!errors.password}
                  helperText={errors.password?.message ?? " "}
                  InputLabelProps={{style: {color: grey[600]}}}
                  margin="normal"
                  required
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
                  sign in
                </Button>
              </Grid>
            </Box>
          </Box>
        </Container>
      </Box>
  );
};

export default LoginForm;