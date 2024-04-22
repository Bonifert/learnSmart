import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import {useUser} from "../context/userContext/userContextImport.ts";
import {useFeedback} from "../context/alertContext/feedbackContextImport.ts";
import {useNavigate} from "react-router-dom";
import {FormEvent, useEffect} from "react";
import {ApiResObj} from "./types/dto/ApiResObj.ts";
import {UserNamePasswordDTO} from "./types/dto/UserNamePasswordDTO.ts";

const LoginForm = () => {
  const navigate = useNavigate();
  const {login, user} = useUser();
  const {feedback} = useFeedback();

  useEffect(() => {
    if (user){
      navigate("/");
    }
  }, [user]);

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const loginData: UserNamePasswordDTO = {
      userName: data.get("username") as string,
      password: data.get("password") as string
    };
    try {
      const response: ApiResObj = await login(loginData);
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