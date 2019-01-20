import { Router, Scene, Stack, ActionConst, Actions } from 'react-native-router-flux';

import React, { Component } from 'react';

import Movies from './screens/movies';
import MovieDetails from "./screens/movies/movDetail";
class Nav extends Component {


  render() {
    return <Router>
        <Stack key="root">
          <Stack key="movies" hideNavBar initial>
            <Scene key="movies" component={Movies} />
            <Scene key="moviedetails" component={MovieDetails} />
          </Stack>
        </Stack>
      </Router>;
  }
}

export default Nav;