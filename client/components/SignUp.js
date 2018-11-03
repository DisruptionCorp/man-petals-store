import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { TextField, Button } from '@material-ui/core'
import { _createUser } from '../reducers/userReducer';

class SignUp extends Component {
  constructor(){
  	super()
  	this.state={
  	  name: '',
  	  email: '',
  	  password: '',
  	}
  }

  handleChange = (e) => {
  	const { name, value } = e.target;
  	this.setState({ [name]: value })
  }

  handleClick = () => {
  	const { name, email, password } = this.state;
  	const { _createUser, history } = this.props;
  	_createUser({name, email, password})
  	.then(() => history.push('/'))
  }

  render() {
  	const { handleChange, handleClick } = this;
  	const { name, email, password } = this.state;
  	return (
  	  <div style={{ display: 'flex', justifyContent: 'center' }}>
  	  <div >
  	  	<form className="signUp">
  	  	  	<TextField
	          id="outlined-name"
	          name="name"
	          label="name"
	          value={name}
	          onChange={handleChange}
	          margin="normal"
	          variant="outlined"
	        />
	         <TextField
	          id="outlined-name"
	          name="email"
	          label="email"
	          value={email}
	          onChange={handleChange}
	          margin="normal"
	          variant="outlined"
	        />
	        <TextField
	          id="outlined-name"
	          name="password"
	          label="password"
	          value={password}
	          onChange={handleChange}
	          margin="normal"
	          variant="outlined"
	        />
  	  	<div><Button onClick={handleClick}>Sign Up</Button></div>
  	  	</form>
  	  	</div>
  	  </div>
  	)
  }
}

const mapStateToProps = ({ user }, { history }) => ({
  user,
  history
})

const mapDispatchToProps = dispatch => ({
  _createUser: userInfo => dispatch(_createUser(userInfo))
})

export default connect(mapStateToProps, mapDispatchToProps)(SignUp)