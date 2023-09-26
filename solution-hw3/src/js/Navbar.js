import React, { Component } from 'react';
import logo from '../logo-01.svg';

// Navbar class to handle nav and future cart functionality
class Navbar extends Component {
  render() {
    return(
      <header className="header">
        <img src={logo} alt="Bun Bun cinnamon roll logo" id="logo"/>
        <div className="headerText">
          <nav id="nav">
            <a href="" className="navText">PRODUCTS</a>
            <div id="cart">
              <a href="" className="navText" id="cartLink">CART</a>
            </div>
          </nav>

          <hr/>
          <h1 id="motto">Our hand-made cinnamon rolls</h1>
        </div>
      </header>
    );
  }
}

export default Navbar;