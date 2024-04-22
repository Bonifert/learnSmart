import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import {register} from "../providers/userProvider.ts";
import {useFeedback} from "../context/alertContext/feedbackContextImport.ts";
import {FormEvent} from "react";
import {ApiResObj} from "./types/dto/ApiResObj.ts";
import {UsernamePasswordDTO} from "./types/dto/UsernamePasswordDTO.ts";

interface Props {
  onNavigateLogin: () => void;
}

const RegisterForm = ({onNavigateLogin}: Props) => {
  const {feedback} = useFeedback();

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const data: FormData = new FormData(event.currentTarget);
    if (data.get("password") !== data.get("passwordAgain")) {
      feedback("Passwords don't match.", "error");
      return;
    }
    const loginData: UsernamePasswordDTO = {
      username: data.get("username") as string,
      password: data.get("password") as string
    };
    try {
      const response: ApiResObj = await register(loginData);
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

            <Box component="form" onSubmit={handleSubmit} noValidate sx={{mt: 2}}>
              <TextField
                  margin="normal"
                  required
                  fullWidth
                  id="username"
                  label="Username"
                  name="username"
                  autoComplete="username"
                  autoFocus
                  sx={{
                    '& .MuiInputLabel-root': {
                      color: '#10575c', // Default label color
                    },
                    '& .MuiOutlinedInput-root': {
                      '& .MuiOutlinedInput-notchedOutline': {
                        borderColor: '#10575c', // Default border color
                      },
                      '&:hover .MuiOutlinedInput-notchedOutline': {
                        borderColor: '#10575c', // Border color on hover (optional)
                      },
                      '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
                        borderColor: '#10575c', // Border color when focused
                      },
                    },
                  }}
              />
              <TextField
                  margin="normal"
                  required
                  fullWidth
                  name="password"
                  label="Password"
                  type="password"
                  id="password"
                  autoComplete="current-password"
                  sx={{
                    '& .MuiInputLabel-root': {
                      color: '#10575c', // Default label color
                    },
                    '& .MuiOutlinedInput-root': {
                      '& .MuiOutlinedInput-notchedOutline': {
                        borderColor: '#10575c', // Default border color
                      },
                      '&:hover .MuiOutlinedInput-notchedOutline': {
                        borderColor: '#10575c', // Border color on hover (optional)
                      },
                      '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
                        borderColor: '#10575c', // Border color when focused
                      },
                    },
                  }}
              />
              <TextField
                  margin="normal"
                  required
                  fullWidth
                  name="passwordAgain"
                  label="Password again"
                  type="password"
                  id="passwordAgain"
                  autoComplete="current-password"
                  sx={{
                    '& .MuiInputLabel-root': {
                      color: '#10575c', // Default label color
                    },
                    '& .MuiOutlinedInput-root': {
                      '& .MuiOutlinedInput-notchedOutline': {
                        borderColor: '#10575c', // Default border color
                      },
                      '&:hover .MuiOutlinedInput-notchedOutline': {
                        borderColor: '#10575c', // Border color on hover (optional)
                      },
                      '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
                        borderColor: '#10575c', // Border color when focused
                      },
                    },
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