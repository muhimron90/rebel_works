import { Router, Scene, Stack, ActionConst, Actions } from 'react-native-router-flux';

import React, { Component } from 'react';

import Movies from './screens/movies';
import Detail from "./screens/details";

class Nav extends Component {


  render() {
    return (
      <Router>
        <Stack key="root">
          <Stack key='movies' hideNavBar>
          <Scene key='movies' initial component={Movies} type={ActionConst.REPLACE}  />

        <Scene key='moviedetails' component={Detail} type={ActionConst.PUSH}  />

          </Stack>

        </Stack>
      </Router>
    );

  }
}

export default Nav;
