import React, { Component } from 'react';
import Roll from './Roll.js';
import Navbar from './Navbar.js';
import {Product} from './HelperStructs.js';

class Page extends Component{
  constructor(props){
    super(props);
    this.state = {cartContent: [],
                  totalCost: 0.00};
  }

  // Method passed between components to update cart contents
  updateCart = (type, glazing, packSize, price) => {
    this.setState(prevState => ({
      cartContent: [...prevState.cartContent, new Product(type, glazing, packSize, price)],
      totalCost: (parseFloat(prevState.totalCost) + parseFloat(price)).toFixed(2)}));
  }

  render(){
    return(
      <div className="Page">
        <Navbar content={this.state.cartContent} priceTotal={this.state.totalCost} infoPopup="none"/>

        <main className="catalog">
          <Roll id={0} cartFunc = {this.updateCart} type={0} glazing={0} packSize={0} price={2.49}/>
          
          <Roll id={1} cartFunc = {this.updateCart} type={1} glazing={0} packSize={0} price={3.49}/>
          
          <Roll id={2} cartFunc = {this.updateCart} type={2} glazing={0} packSize={0} price={2.99}/>
          
          <Roll id={3} cartFunc = {this.updateCart} type={3} glazing={0} packSize={0} price={3.49}/>
          
          <Roll id={4} cartFunc = {this.updateCart} type={4} glazing={0} packSize={0} price={3.99}/>
          
          <Roll id={5} cartFunc = {this.updateCart} type={5} glazing={0} packSize={0} price={3.99}/>
        </main>
    </div>
  )}
}

export default Page;