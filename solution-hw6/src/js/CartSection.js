import React, { Component } from 'react';
import CartProduct from './CartProduct';

// Takes props cartContent, totalCost, and active
class CartSection extends Component {
  removeCartItem = (id) => {
    this.props.removeCartItem(id);
  }

  // Deserializes cart contents for use in cart div. Serialization method is in Page.js
  // You never say to use hooks, and this is less of a pain than using hooks.
  deserializeCartContent(cartContent) {
    let numItems    = cartContent.length;
    
    return <div>
      <div className="cartText">
        <span className="cartText" id="cartHeader">
          {"Shopping Cart ("+numItems+(numItems !== 1 ? " items)":" item)")}
        </span>

        <span className="cartText" id="cartTotal">
          {"Total: $ " + localStorage.getItem("totalCost")}
        </span>
      </div>
      {cartContent.map((product, idx) => {
        return <CartProduct key={idx} roll={product} id={idx}
                            removeCartItem={this.removeCartItem}/>
      })}
    </div>
  }

  render() {
    let cartContent = JSON.parse(localStorage.getItem("cartContent")) ?? [];
    let numItems = cartContent.length;
    return (
      this.props.active && 
      <section className="cartSection">
        
        {cartContent.length > 0 ?
          this.deserializeCartContent(cartContent)
          :
          <h3 id="emptyCart">The cart is empty!</h3>}
      </section>
    );
  }
}

export default CartSection;