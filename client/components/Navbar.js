import React, { Component } from 'react'
import { Link } from 'react-router-dom'

export default class Navbar extends Component {
    render() {
        return (
            <div>
                <li>
                    <Link to="/home">
                        <ul>Home</ul>
                    </Link>
                    <Link to="/cart">
                        <ul>Cart</ul>
                    </Link>
                    <Link to="/orders">
                        <ul>Orders</ul>
                    </Link>
                    <Link to="/login">
                        <ul>Login</ul>
                    </Link>
                </li>
            </div>
        )
    }
}
