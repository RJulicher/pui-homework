import React, { Component } from 'react';
import logo from '../logo-01.svg';
import {glazingOptions, packSizeOptions, typeOptions} from './HelperStructs.js';

/*
* -------------------------------------------------
* Main Navbar Component/Functionality
* -------------------------------------------------
*/

// Navbar class to handle nav and future cart functionality
class Navbar extends Component {
  // If there was an update and it was to the cart, show the popup
  componentDidUpdate(prevProps){
    if (prevProps.numItemsInCart < this.props.numItemsInCart){
      let popup           = document.querySelector("#cartPopup");
      popup.style.display = "block";
      setTimeout(function() { popup.style.display = "none";}, 3000);
    }
  }

  render() {
    let content = JSON.parse(localStorage.getItem("cartContent")) ?? [];
    return(
      <header className="header">
        <img src={logo} alt="Bun Bun cinnamon roll logo" id="logo"/>
        <div className="headerText">
          <nav id="nav">
            <button className="navText">PRODUCTS</button>
            <div id="cart">
              <button onClick={this.props.toggleCart} className="navText" id="cartLink">CART</button>

              <div id="cartPopup">
                <span className="addedSummaryText">Added to cart:</span><br/><br/>
						    <span className="addedSummaryText" id="addedProduct">
                  {content.length > 0 ?
                    content[content.length-1].type
                    : ""}
                </span><br/>
						    <span className="addedSummaryText" id="addedGlazing">
                  {content.length > 0 ?
                    (content[content.length-1].glazing + " glazing")
                    : ""}
                </span><br/>
                <span className="addedSummaryText" id="addedPackSize">
                  {content.length > 0 ?
                    ("Pack of " + content[content.length-1].packSize)
                    : ""}
                </span><br/>
                <span className="addedSummaryText" id="addedPrice">
                  {content.length > 0 ?
                    ("Price: $" + content[content.length-1].price)
                    : ""}
                </span>
              </div>
            </div>
          </nav>

          <hr/>
          <h1 id="motto">Our hand-made cinnamon rolls</h1>
        </div>
      </header>
    );
  }
}

/*
* -------------------------------------------------
* Exports
* -------------------------------------------------
*/

export default Navbar;