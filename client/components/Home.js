import React, { Component } from 'react';
import { Typography } from '@material-ui/core'

//Components
import SearchBar from './SearchBar'

export default class Home extends Component {

    constructor(props){
        super(props)
    }

  render() {
    console.log(window.localStorage)
    const {history} = this.props
    return (
      <div >
        <SearchBar history={history}/>
        <div style={{ display: 'flex', justifyContent: 'center' }}>
          <img  src="https://ak5.picdn.net/shutterstock/videos/6291365/thumb/1.jpg"/>
        </div>

      </div>
    )
  }
}
