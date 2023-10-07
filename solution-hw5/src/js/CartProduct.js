import React, { Component } from 'react';
import {glazingOptions, packSizeOptions, typeOptions} from './HelperStructs.js';

// Takes roll as props
class CartProduct extends Component {
  render () {
    return (
      <section className="cartProduct">
        <img src={typeOptions[this.props.roll.type].imgSrc}
              alt={typeOptions[this.props.roll.type].imgAlt}
              className="cartProductPic"/>
        <span className="cartOption">
          {typeOptions[this.props.roll.type].typeName}
        </span>
        <span className="cartOption">
          {"Glazing: " + glazingOptions[this.props.roll.glazing].optionName}
        </span>
        <span className="cartOption">
          {"Pack Size: " + packSizeOptions[this.props.roll.packSize].packOption}
        </span>
        <span className="cartProductPrice">{"$ " + this.props.roll.price}</span>

        <button className="removeCartItemButton"
                onClick={() => {this.props.removeCartItem(this.props.id)}}>Remove</button>
      </section>
    );
  }
  
}

export default CartProduct;