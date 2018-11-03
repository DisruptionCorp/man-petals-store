import React, { Component } from 'react';
import { connect } from 'react-redux';
import { TextField, Button, Paper, FormGroup } from '@material-ui/core';

import { login } from '../reducers/authReducer'

class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      password: '',
      err: ''
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleClick = this.handleClick.bind(this);
  }

  handleChange(ev) {
    this.setState({ [ev.target.name]: ev.target.value });
  }
  handleClick(ev) {
    ev.preventDefault();
    const { email, password } = this.state;
    this.props.login({ email, password })
      .catch(err => this.setState({ err: 'Invalid Login Credentials' }));
  }

  render() {
    const user = this.state;
    return (
      <div style={{ display: 'flex', 
                    justifyContent: 'center', 
                    padding: '35px'}}>
        <div className="loginBox">
          <FormGroup>
            <TextField
              className="loginTF"
              id="outlined-email-input"
              label="Email"
              type="email"
              // helperText="required*"
              name="email"
              // autoComplete="email"
              margin="normal"
              required={true}
              variant="filled"
              onChange={this.handleChange}
            />
            &nbsp;
            <TextField
              className="loginTF"
              id="standard-password-input"
              label="Password"
              type="password"
              // helperText="required*"
              name="password"
              // autoComplete="current-password"
              margin="normal"
              required={true}
              variant="filled"
              onChange={this.handleChange}
            />
            <br />
            <Button
              disabled={!(user.email && user.password)}
              label="Submit"
              color="primary"
              variant="contained"
              onClick={this.handleClick}
            >
              Sign in
            </Button>
          </FormGroup>
          <h2>{this.state.err}</h2>
        </div>
      </div>
    );
  }
}

const mapDispatchToProps = (dispatch, { history })=> {
  return {
    login: (credentials)=> dispatch(login(credentials, history))
  };
}

export default connect(null, mapDispatchToProps)(Login);
