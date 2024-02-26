import LoginForm from "../components/LoginForm.tsx";
import RegisterForm from "../components/RegisterForm.tsx";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import {ToggleButton, ToggleButtonGroup, useMediaQuery, useTheme} from "@mui/material";
import {useState} from "react";
import Box from "@mui/material/Box";

export const HomePage = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm')); // Check if screen size is mobile or smaller
  const [loginOrRegister, setLoginOrRegister] = useState("login");

  function navigateToLogin() {
    setLoginOrRegister("login");
  }

  function handleSwitch(value: string | null) {
    if (value !== null) setLoginOrRegister(value);
  }

  return (
      <Box sx={{bgcolor: "#d1e6e8"}} height="100vh" overflow="hidden">
        <Box display="flex"
             justifyContent="center"
             position="relative"
             width="100%"
             marginTop={0}
             paddingTop="10vh"
        >
          <Box width={isMobile ? '70%' : 'auto'}
               maxWidth={isMobile ? 500 : 500} // Adjust max-width as needed
          >
            <Grid container justifyContent="flex-start">
              <Typography variant="h5" color="#18838c">Learn in a smarter way...</Typography>
            </Grid>
            <Grid container justifyContent="flex-start" margin={5}>
              <ToggleButtonGroup
                  onChange={(_e, value) => handleSwitch(value)}
                  exclusive
                  color="standard" // Optional: Change the color to "secondary" or "default"
                  aria-label="Platform"
                  value={loginOrRegister}
              >
                <ToggleButton value="login">Login</ToggleButton>
                <ToggleButton value="register">Register</ToggleButton>
              </ToggleButtonGroup>
            </Grid>
            <Grid container direction="row" spacing={2} margin={0}>
              {loginOrRegister === "login" ? <LoginForm></LoginForm> :
                  <RegisterForm onNavigateLogin={navigateToLogin}></RegisterForm>}
            </Grid>
          </Box>
        </Box>
      </Box>);

};

