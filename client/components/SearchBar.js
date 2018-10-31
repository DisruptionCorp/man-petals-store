import React, { Component } from 'react';
import { connect } from 'react-redux';
import { _getTags } from '../reducers/productReducer';
import { Toolbar, 
         TextField, 
         Icon,
         IconButton,
         Paper } from '@material-ui/core'


//reduce tags function

class SearchBar extends Component {

  render() {

  	return (
  	<Paper>
  	  <Toolbar style={{ display: 'flex', 
                        justifyContent: 'center' }}>
          <div>
          <TextField></TextField>
          <IconButton><Icon>search_icon</Icon></IconButton>
          </div>
      </Toolbar>
    </Paper>
  	)
  }
}

const mapDispatchToProps = dispatch => ({
  _getTags: (search) => dispatch(_getTags(search))
})

export default connect(null, mapDispatchToProps)(SearchBar);