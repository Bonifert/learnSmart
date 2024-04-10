import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import {Card, CardActions, CardContent, CardMedia} from "@mui/material";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";

const buttonStyle = {
  color: "white",
      bgcolor: "#469ca3",
      mr: 1.5,
      borderColor: "#469ca3",
      "&:hover": {bgcolor: "#18838c"}
}

const GeneratingOptions = () => {
  return (
      <Box display="flex" justifyContent="center">
        <Grid container my={2} alignContent="center" height="75vh"  width={{xs: "100%", sm: "90%", md: "80%", lg: "70%"}}>
          <Grid mt={3} px={4} item xs={12} sm={6} display="flex" justifyContent="center">
            <Card sx={{ maxWidth: 500, borderRadius: 2, boxShadow: 2}}>
              <CardMedia
                  sx={{ height: 140 }}
                  image="/public/img.png"
                  title="green iguana"
              />
              <CardContent>
                <Typography gutterBottom variant="h5" component="div">
                  Topic with definitions
                </Typography>
                <Typography variant="body2" color="text.secondary" height="100px">
                  Generate topic with definitions with the AI! You just have to give some details about the topic.
                </Typography>
              </CardContent>
              <CardActions sx={{display: "flex", justifyContent: "flex-end"}}>
                <Button size="medium" sx={buttonStyle}>Generate</Button>
              </CardActions>
            </Card>
          </Grid>
          <Grid mt={3} px={4} item xs={12} sm={6} display="flex" justifyContent="center">
            <Card sx={{ maxWidth: 500, borderRadius: 2, boxShadow: 2}}>
              <CardMedia
                  sx={{ height: 140 }}
                  image="/public/img_6.png"
                  title="green iguana"
              />
              <CardContent>
                <Typography gutterBottom variant="h5" component="div">
                  Topic with words
                </Typography>
                <Typography variant="body2" color="text.secondary" height="100px">
                  Create a topic and flash cards with the AI! You can specify the topic, the number of flash cards and the language skill level.
                </Typography>
              </CardContent>
              <CardActions sx={{display: "flex", justifyContent: "flex-end"}} >
                <Button size="medium" sx={buttonStyle}>Generate</Button>
              </CardActions>
            </Card>
          </Grid>
        </Grid>
      </Box>

  );
};

export default GeneratingOptions;