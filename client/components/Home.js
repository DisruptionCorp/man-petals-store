import React, { Component } from 'react';
import { Typography } from '@material-ui/core'

//Components
import SearchBar from './SearchBar'

export default class Home extends Component {

  render() {

    return (
      <div >
        <SearchBar />
        <div style={{ display: 'flex', justifyContent: 'center' }}>
          <img  src="https://ak5.picdn.net/shutterstock/videos/6291365/thumb/1.jpg"/>
        </div>

      </div>
    )
  }
}
