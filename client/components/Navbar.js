import React, { Component } from 'react'
import { Link } from 'react-router-dom'


export default class Navbar extends Component {
    render() {
        return (
            <div>
                <ul>
                    <Link to="/home">
                        <li>Home</li>
                    </Link>
                    <Link to="/cart">
                        <li>Cart</li>
                    </Link>
                    <Link to="/orders">
                        <li>Orders</li>
                    </Link>
                    <Link to="/login">
                        <li>Login</li>
                    </Link>
                </ul>
            </div>
        )
    }
}
