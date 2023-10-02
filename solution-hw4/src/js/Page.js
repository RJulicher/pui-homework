import React, { Component } from 'react';
import Product from './Product.js';
import {Roll, Navbar} from './Navbar.js';

class Page extends Component{
  constructor(props){
    super(props);
    this.state = {cartContent: [],
                  totalCost: 0.00};
  }

  updateCart = (type, price, glazing, packSize) => {
    this.setState(prevState => ({
      cartContent: [...prevState.cartContent, new Roll(type, price, glazing, packSize)],
      totalCost: (parseFloat(prevState.totalCost) + parseFloat(price)).toFixed(2)}));
    console.log("Cart updated: " + this.state.cartContent + ", total cost is $" + this.state.totalCost);
  }

  render(){
    return(
      <div className="Page">
        <Navbar content={this.state.cartContent} priceTotal={this.state.totalCost} infoPopup="none"/>

        <main className="catalog">
          <Product id={0} cartFunc = {this.updateCart} imgSrc="./products/original-cinnamon-roll.jpg"
                          imgAlt="Cinnamon roll with glaze and cinnamon stick"
                          nameID="original" name="Original cinnamon roll" price={2.49}/>
          
          <Product id={1} cartFunc = {this.updateCart} imgSrc="./products/apple-cinnamon-roll.jpg"
                          imgAlt="Cinnamon roll with glaze and apples"
                          nameID="apple" name="Apple cinnamon roll" price={3.49}/>
          
          <Product id={2} cartFunc = {this.updateCart} imgSrc="./products/raisin-cinnamon-roll.jpg"
                          imgAlt="Cinnamon roll with glaze and raisins"
                          nameID="raisin" name="Raisin cinnamon roll" price={2.99}/>
          
          <Product id={3} cartFunc = {this.updateCart} imgSrc="./products/walnut-cinnamon-roll.jpg"
                          imgAlt="Cinnamon roll with glaze and walnuts"
                          nameID="walnut" name="Walnut cinnamon roll" price={3.49}/>
          
          <Product id={4} cartFunc = {this.updateCart} imgSrc="./products/double-chocolate-cinnamon-roll.jpg"
                          imgAlt="Cinnamon roll with glaze and chocolate"
                          nameID="double-chocolate" name="Double-chocolate cinnamon roll" price={3.99}/>
          
          <Product id={5} cartFunc = {this.updateCart} imgSrc="./products/strawberry-cinnamon-roll.jpg"
                          imgAlt="Cinnamon roll with glaze and strawberries"
                          nameID="strawberry" name="Strawberry cinnamon roll" price={3.99}/>
        </main>
    </div>
  )}
}

export default Page;