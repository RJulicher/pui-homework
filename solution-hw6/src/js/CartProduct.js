import React, { Component } from 'react';
import {glazingOptions, packSizeOptions, typeOptions} from './HelperStructs.js';

// Takes roll as props. Serialization and deserialization is handled in CartSection.js and Page.js
class CartProduct extends Component {
  render () {
    return (
      <section className="cartProduct">
        <img src={typeOptions[this.props.roll.type].imgSrc}
              alt={typeOptions[this.props.roll.type].imgAlt}
              className="cartProductPic"/>
        <span className="cartOption">
          {this.props.roll.type}
        </span>
        <span className="cartOption">
          {"Glazing: " + this.props.roll.glazing}
        </span>
        <span className="cartOption">
          {"Pack Size: " + this.props.roll.packSize}
        </span>
        <span className="cartProductPrice">{"$ " + this.props.roll.price}</span>

        <button className="removeCartItemButton"
                onClick={() => {this.props.removeCartItem(this.props.id)}}>Remove</button>
      </section>
    );
  }
  
}

export default CartProduct;