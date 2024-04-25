import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import {Card, CardContent, CardMedia} from "@mui/material";
import Typography from "@mui/material/Typography";
import {useNavigate} from "react-router-dom";
import AutoAwesomeIcon from '@mui/icons-material/AutoAwesome';


const GeneratingOptions = () => {
  const navigate = useNavigate();
  return (
      <Box display="flex" justifyContent="center" minHeight="70vh">
        <Grid container my={2} alignContent="center" width={{xs: "95%", sm: "85%", md: "70%", lg: "60%"}}>
          <Grid mt={2} item xs={12} display="flex" justifyContent="center">
            <Grid p={4} width="100%" mx={2} sx={{bgcolor: "transparent", borderRadius: 2, boxShadow: 1}}>
              <Typography sx={{mb: 4}} variant="h4">Create topic with AI! <AutoAwesomeIcon fontSize="large"/></Typography>
              <Typography>Whether you're delving into topics or exploring vocabulary, our innovative
                tool caters to your learning needs.</Typography><br/>
              <Typography>Accelerate your learning journey with concise definitions
                and expand your language skills with ease.</Typography>
              <Typography>Learn in a smarter way, and generate definitions and words! <br/><br/> Learning has never been so easy!</Typography></Grid>
          </Grid>
          <Grid mt={3} px={2} item xs={12} sm={6} display="flex" justifyContent="center">
            <Card onClick={() => navigate("/ai/generate/definitions")} sx={{
              width: "100%",
              borderRadius: 2,
              pt: 1,
              boxShadow: 2,
              "&:hover": {transform: "scaleY(1.01) scaleX(1.01)", transition: ".1s", cursor: "pointer"}
            }}>
              <CardMedia
                  sx={{height: 140,}}
                  image="/src/assets/definition.png"
                  title="Definition icon"
              />
              <CardContent sx={{textAlign: "center"}}>
                <Typography gutterBottom variant="h5" component="div" sx={{mt: 2}}>
                  Generate definitions
                </Typography>
              </CardContent>
            </Card>
          </Grid>
          <Grid mt={3} px={2} item xs={12} sm={6} sx={{bgcolor: "transparent"}} display="flex" justifyContent="center">
            <Card onClick={() => navigate("/ai/generate/words")} sx={{
              borderRadius: 2,
              width: "100%",
              boxShadow: 2,
              pt: 1,
              "&:hover": {transform: "scaleY(1.01) scaleX(1.01)", transition: ".1s", cursor: "pointer"}
            }}>
              <CardMedia
                  sx={{height: 140}}
                  image="/src/assets/dictionary.png"
                  title="Dictionary icon"
              />
              <CardContent sx={{textAlign: "center"}}>
                <Typography gutterBottom variant="h5" component="div" sx={{ mt: 2}}>
                  Generate words
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      </Box>

  );
};

export default GeneratingOptions;