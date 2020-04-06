import React, { Component } from 'react';
import {Link} from "react-router-dom";
import Typography from "@material-ui/core/Typography";
import Container from "@material-ui/core/Container";
import Button from "@material-ui/core/Button";
import {withStyles} from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";

const styles = (theme) => ({
  header: {
    paddingTop: theme.spacing(2),
    paddingBottom: theme.spacing(2),
  },
});

class Welcome extends Component {
  render() {
    const {classes} = this.props;
    return (
      <Container className={classes.header} maxWidth="md">
        <Typography component="h1" variant="h2" align="center" color="textPrimary" gutterBottom>
          Welcome
        </Typography>
        <Typography variant="h5" align="center" color="textSecondary" paragraph>
          Welcome to the Cloudpractice Greyscale Image Filter.  Click on the Greyscale Filter button to upload a photo, and view the before and after results.
        </Typography>
        <Grid container spacing={2} justify="center">
          <Grid item>
            <Link to="/filter">
              <Button align="center" color="primary" variant="contained">
                Greyscale Filter
              </Button>
            </Link>
          </Grid>
        </Grid>
      </Container>
    );
  }
}

export default withStyles(styles)(Welcome);
