import React, { Component } from 'react'
import { connect } from 'react-redux';
import { Link, NavLink } from 'react-router-dom'
import {
    Paper,
    Typography,
    AppBar,
    Toolbar,
    IconButton,
    MenuList,
    MenuItem,
    ClickAwayListener,
    Grow,
    Badge
}
from '@material-ui/core'
import MenuIcon from '@material-ui/icons/Menu'
import { logout } from '../reducers/authReducer'


class Navbar extends Component {
    constructor(props) {
        super(props)
        this.state = { open: false }
        this.toggle = this.toggle.bind(this);
        this.handleClickAway = this.handleClickAway.bind(this);
    }

    toggle() {
        this.setState({ open: !this.state.open })
    }

    handleClickAway() {
        this.setState({ open: false })
    }

    render() {
        const { toggle, handleClickAway } = this;
        return (
            <Paper style={{ width:'100%' }}>
            <Toolbar style={{ justifyContent: 'space-between'}}>
            <Typography variant='h4'
                        backgroundcolor='transparent'
                        color='default'
                        style={{ padding:'2%' }}>Welcome to Disrupt Co {'{'}<span style={{color: 'grey'}}>Grace Shopper</span>{'}'}</Typography>
            <Grow>
            <ClickAwayListener onClickAway={()=>handleClickAway()}>
            <div>
            <IconButton onClick={()=>toggle()} color="inherit" aria-label="Open drawer">
              <MenuIcon />
            </IconButton>
            {this.state.open &&
            <MenuList>
                <MenuItem><NavLink to="/home">Home</NavLink></MenuItem>
                <MenuItem><NavLink to={`/products/page/${1}`}>Products</NavLink></MenuItem>
                <MenuItem><Badge badgeContent={0} color="primary" style={{padding:"1px"}}><NavLink to="/cart">Cart</NavLink></Badge></MenuItem>
                <MenuItem><Badge badgeContent={0} color="primary" style={{padding:"1px"}}><NavLink to="/orders">Orders</NavLink></Badge></MenuItem>
                {/*userId ?*/}
                
                {this.props.isLoggedIn ? (
                    <MenuItem onClick={this.props.logout}><NavLink to="/login">Logout: {this.props.isLoggedIn.name}</NavLink></MenuItem>
                    ) : (
                    <MenuItem><NavLink to="/login">Login</NavLink></MenuItem>
                )}
                {/* :
                <MenuItem><NavLink to="/myaccount">My Account</NavLink></MenuItem>
                <MenuItem><NavLink to="/logout">Logout</NavLink></MenuItem>
                */}
             </MenuList>
            }
            </div>
            </ClickAwayListener>
            </Grow>
                </Toolbar>
            </Paper>
        )
    }
}

const mapStateToProps = ({ auth, orders }) => {
    return {
        isLoggedIn: auth.id ? auth : false,
    }  
}

const mapDispatchToProps = (dispatch)=> {
    return {
      logout: ()=> dispatch(logout())
    }
  }

export default connect(mapStateToProps, mapDispatchToProps)(Navbar)
