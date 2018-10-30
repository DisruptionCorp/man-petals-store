import React, { Component } from 'react';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import FormGroup from '@material-ui/core/FormGroup';

class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      password: '',
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleClick = this.handleClick.bind(this);
  }

  handleChange(ev) {
    this.setState({ [ev.target.name]: ev.target.value });
  }
  handleClick(ev) {
    ev.preventDefault();
    console.log(this.state);
  }

  render() {
    const user = this.state;
    return (
      <div>
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
        </div>
      </div>
    );
  }
}

export default Login;
