import React, { Component } from 'react';
import CartProduct from './CartProduct';

// Takes props cartContent, totalCost, and active
class CartSection extends Component {
  removeCartItem = (id) => {
    this.props.removeCartItem(id);
  }

  render() {
    let numItems = this.props.cartContent.length;
    return (
      this.props.active && 
      <section className="cartSection">
        <div className="cartText">
          <span className="cartText" id="cartHeader">
            {"Shopping Cart ("+numItems+(numItems !== 1 ? " items)":" item)")}
          </span>

          <span className="cartText" id="cartTotal">
            {"Total: $ " + this.props.totalCost}
          </span>
        </div>
        
        {this.props.cartContent.length > 0 ?
          this.props.cartContent.map((product, idx) => {
            //console.log(roll.type);
            return <CartProduct key={idx} roll={product} id={idx}
                                removeCartItem={this.removeCartItem}/>
          })
          :
          <h3>The cart is empty!</h3>}
      </section>
    );
  }
}

export default CartSection;