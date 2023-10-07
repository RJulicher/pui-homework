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
    if (prevProps.content.length < this.props.content.length){
      let popup           = document.querySelector("#cartPopup");
      popup.style.display = "block";
      setTimeout(function() { popup.style.display = "none";}, 3000);
    }
  }

  /*
  */
  render() {
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
                  {this.props.content.length > 0 ?
                    typeOptions[this.props.content[this.props.content.length-1].type].typeName
                    : ""}
                </span><br/>
						    <span className="addedSummaryText" id="addedGlazing">
                  {this.props.content.length > 0 ?
                    (glazingOptions[this.props.content[this.props.content.length-1].glazing].optionName + " glazing")
                    : ""}
                </span><br/>
                <span className="addedSummaryText" id="addedPackSize">
                  {this.props.content.length > 0 ?
                    ("Pack of " + packSizeOptions[this.props.content[this.props.content.length-1].packSize].packOption)
                    : ""}
                </span><br/>
                <span className="addedSummaryText" id="addedPrice">
                  {this.props.content.length > 0 ?
                    ("Price: $" + this.props.content[this.props.content.length-1].price)
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