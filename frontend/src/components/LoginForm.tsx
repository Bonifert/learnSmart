import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import {UserNamePassword} from "../context/userContext/UserProvider.tsx";
import {useUser} from "../context/userContext/userContextImport.ts";
import {useFeedback} from "../context/alertContext/feedbackContextImport.ts";
import {ApiResObj} from "../providers/userProvider.ts";
import {useNavigate} from "react-router-dom";
import {FormEvent} from "react";

const LoginForm = () => {
  const navigate = useNavigate();
  const {login} = useUser();
  const {feedbackAlert} = useFeedback();

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const loginData: UserNamePassword = {
      userName: data.get("email") as string,
      password: data.get("password") as string
    };
    try {
      const response : ApiResObj = await login(loginData);
      if (response.status === 401){
        feedbackAlert("Invalid user name or password!", "error");
      } else if (response.status === 200){
        feedbackAlert("Logged in", "info");
        navigate("/topics");
        return;
      } else {
        feedbackAlert("Unexpected error occurred.", "error");
      }
    } catch (e){
      feedbackAlert("Unexpected error occurred.", "error");
    }
  };

  return (
      <Box
          boxShadow={7} // Adjust the shadow depth as needed
          borderRadius={3}
          position="relative" // Position relative to allow positioning of the shadow
          p={1} // Adjust padding as needed
          bgcolor="#74B5BA"
          paddingTop={2}
      >
        <Container component="main" maxWidth="xs" sx={{bgcolor: "#74B5BA", borderRadius: 3}}>
          <Box sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}>
            <Grid container justifyContent="flex-start">
              <Typography component="h1" variant="h5" color="white">
                Sign in
              </Typography>
            </Grid>

            <Box component="form" onSubmit={handleSubmit} noValidate sx={{mt: 2}}>
              <TextField
                  margin="normal"
                  required
                  fullWidth
                  id="email"
                  label="Email Address"
                  name="email"
                  autoComplete="email"
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
                      color: "#18838c",
                      bgcolor: "#D9D9D9",
                      "&:hover": {bgcolor: "#18838c", color: "#D9D9D9"}
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