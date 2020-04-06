import React, {Component} from 'react';
import axios from "axios";
import Container from "@material-ui/core/Container";
import Grid from "@material-ui/core/Grid";
import Card from "@material-ui/core/Card";
import CardMedia from "@material-ui/core/CardMedia";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";
import {withStyles} from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import Skeleton from '@material-ui/lab/Skeleton';
import {Link} from "react-router-dom";
import Alert from "@material-ui/lab/Alert";

const styles = (theme) => ({
  cardGrid: {
    paddingTop: theme.spacing(8),
    paddingBottom: theme.spacing(8),
  },
  card: {
    height: '100%',
    display: 'flex',
    flexDirection: 'column',
  },
  error: {
    marginTop: theme.spacing(2),
    marginBottom: theme.spacing(2),
  },
  header: {
    paddingTop: theme.spacing(2),
    paddingBottom: theme.spacing(2),
  },
  input: {
    display: 'none',
  },
});

class Filter extends Component {
  state = {
    error: "",
    greyScaleFile: null,
    uploadedFile: null,
  };

  handleChange = (files) => {
    if (files.length > 0) {
      this.setState({error: "", greyScaleFile: null, uploadedFile: URL.createObjectURL(files[0])});
      const formData = new FormData();
      formData.append("file", files[0]);
      let url = "http://34.217.27.245:8080/rest/image";
      if (process.env.NODE_ENV === 'development') {
        url = "http://localhost:8080/rest/image";
      }

      if (files[0].type !== "image/jpeg") {
        this.setState({
          error: "Image must be a jpg or jpeg",
          greyScaleFile: null,
          uploadedFile: null,
        });
        return;
      }

      const options = {
        method: 'post',
        url: url,
        data: formData,
        body: files[0],
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        }
      };
      axios(options)
          .then((response) => {
            this.setState({greyScaleFile: response.data});
          })
          .catch((error) => {
            console.error(error);
            this.setState({
              error: "There was an error processing the image",
              greyScaleFile: null,
              uploadedFile: null,
            });
          });

    } else {
      this.setState({greyScaleFile: null, uploadedFile: null});
    }
  };

  render() {
    const {classes} = this.props;
    const {error, greyScaleFile, uploadedFile} = this.state;
    return (
        <Container className={classes.cardGrid} maxWidth={false}>
          <Container className={classes.header} maxWidth="md">
            <Typography component="h1" variant="h5" align="center" color="textPrimary" gutterBottom>
              Click the Upload button below upload an image (jpeg) and it will automatically show the converted file.
            </Typography>
            <Grid container spacing={2} justify="center">
              <Grid item>
                <Link to="/">
                  <Button align="center" color="primary" variant="contained">
                    Back
                  </Button>
                </Link>
              </Grid>
              <Grid item>
                <input
                    accept="image/jpeg"
                    className={classes.input}
                    id="contained-button-file"
                    name="file"
                    onChange={(e) => {
                      this.handleChange(e.target.files);
                    }}
                    type="file"
                />
                <label htmlFor="contained-button-file">
                  <Button variant="contained" color="primary" component="span">
                    Upload
                  </Button>
                </label>
              </Grid>
            </Grid>
            {error && (<Alert className={classes.error} severity="error">{error}</Alert>)}
          </Container>
          <Grid container spacing={2}>
            <Grid item key="uploadedImage" lg>
              <Card className={classes.card}>
                {uploadedFile ? (
                    <CardMedia
                        component="img"
                        src={uploadedFile}
                        title="Uploaded File"
                    />
                ) : (
                    <Skeleton variant="rect" width="100%" height={200} />
                )}
                <CardContent>
                  <Typography gutterBottom variant="h5" component="h2">
                    Before
                  </Typography>
                  <Typography>
                    {uploadedFile ? "This is the uploaded image." : "After uploading, the image will appear here."}
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
            <Grid item key="greyscaleImage" lg>
              <Card>
                {greyScaleFile ? (
                    <CardMedia
                        component="img"
                        src={greyScaleFile}
                        title="Greyscale Image"
                    />
                ) : (
                    <Skeleton variant="rect" width="100%" height={200} />
                )}
                <CardContent>
                  <Typography gutterBottom variant="h5" component="h2">
                    After
                  </Typography>
                  <Typography>
                    {greyScaleFile ?
                        "This is the image altered to greyscale."
                        : "After uploading and processing, the greyscale image will appear here."
                    }
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
          </Grid>
        </Container>
    );
  }
}

export default withStyles(styles)(Filter);
