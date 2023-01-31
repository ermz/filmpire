import React from 'react';
import { useParams, Link, useHistory } from 'react-router-dom';
import { Grid, Box, CircularProgress, Button } from '@mui/material';
import { ArrowBack } from '@mui/icons-material';
import { Typography } from '@material-ui/core';
import { useGetActorQuery } from '../../services/TMDB';

import makeStyles from './styles';

const Actors = () => {
  const history = useHistory();
  const { id } = useParams();
  const classes = makeStyles();
  const { data, isFetching, error } = useGetActorQuery(id);
  console.log('hello');
  console.log(data);
  console.log('bye');

  if (isFetching) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center">
        <CircularProgress size="8rem" />
      </Box>
    );
  }

  if (error) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center">
        <Link to="/">Something has gone wrong - Go back</Link>
      </Box>
    );
  }

  const readableDate = (dateString) => {
    const date1 = new Date(dateString);
    return date1.toString().split(' ').slice(0, 4).join(' ');
  };

  const goBack = () => {
    history.goBack();
  };

  return (
    <Grid container className={classes.containerSpaceAround}>
      <Grid item sm={12} lg={5}>
        <img
          className={classes.poster}
          src={`https://image.tmdb.org/t/p/w500/${data?.profile_path}`}
          alt={data?.title}
        />
      </Grid>
      <Grid item container direction="column" lg={7} justifyContent="center">
        <Typography variant="h2" align="left" gutterBottom>
          {data?.name}
        </Typography>
        <Typography variant="h5" align="left">
          Born: {readableDate(data?.birthday.toString())}
        </Typography>
        <Typography>
          {data?.biography}
        </Typography>
        <Grid item style={{ marginTop: '2rem' }} className={classes.buttonContainer}>
          <Button target="_blank" rel="noopener noreferrer" href={`https://www.imdb.com/name/${data?.imdb_id}`}>
            <Typography>
              IMDB
            </Typography>
          </Button>
          <Button startIcon={<ArrowBack />} sx={{ borderColor: 'blue' }}>
            <Typography style={{ textDecoration: 'none' }} onClick={goBack}>
              Back
            </Typography>
          </Button>
        </Grid>
      </Grid>
      <Box marginTop="5rem" width="100%">
        <Typography variant="h3" gutterBottom align="center">
          Movies
        </Typography>
      </Box>
    </Grid>
  );
};

export default Actors;
