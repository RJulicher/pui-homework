import React, { Component } from 'react';
import Product from './Product.js';
import Navbar from './Navbar.js';
import {Roll, glazingOptions, packSizeOptions, typeOptions} from './HelperStructs.js';
import CartSection from './CartSection.js';

class Page extends Component{
  constructor(props){
    super(props);
    this.state = {cartContent: [],
                  listingContent: [new Roll(0, 0, 0, 2.49), new Roll(1, 0, 0, 3.49), 
                                    new Roll(2, 0, 0, 2.99), new Roll(3, 0, 0, 3.49),
                                    new Roll(4, 0, 0, 3.99), new Roll(5, 0, 0, 3.99)],
                  totalCost: 0.00,
                  cartActive: false,
                  searchQuery: "",
                  searchIsEmpty: false};
  }

  sortByName = () => {
    let sortedContent = [...this.state.listingContent];
    sortedContent.sort((a,b) =>   {
                                    let aName = typeOptions[a.type].typeName;
                                    let bName = typeOptions[b.type].typeName;
                                    if (aName < bName)      return -1;
                                    else if (bName < aName) return 1;
                                    else                    return 0;
                                  });
    this.setState({listingContent: sortedContent});
  }

  sortByPrice = () => {
    let sortedContent = [...this.state.listingContent];
    sortedContent.sort((a,b) =>   {
                                    let aPrice = typeOptions[a.type].basePrice;
                                    let bPrice = typeOptions[b.type].basePrice;
                                    if (aPrice < bPrice)      return -1;
                                    else if (bPrice < aPrice) return 1;
                                    else                    return 0;
                                  });
    this.setState({listingContent: sortedContent});
  }

  sort = (e) => {
    e.target.value == "name" ? this.sortByName() : this.sortByPrice();
  }

  toggleCart = () => {
    this.setState({cartActive: !this.state.cartActive});
  }

  search = () => {
    let searchString = document.getElementById("searchInput").value;
    let emptySearch = true;
    this.state.listingContent.forEach(roll => {
      let rollName = typeOptions[roll.type].typeName.toLowerCase();
      if (rollName.includes(searchString.toLowerCase())){
        emptySearch = false;
      }
      this.setState({searchQuery: searchString, searchIsEmpty: emptySearch});
    });
  }

  // Method passed between components to update cart contents
  updateCart = (type, glazing, packSize, price) => {
    this.setState(prevState => ({
      cartContent: [...prevState.cartContent, new Roll(type, glazing, packSize, price)],
      totalCost: (parseFloat(prevState.totalCost) + parseFloat(price)).toFixed(2)}));
  }

  updatePrice = (updatedListing, id) => {
    let currRoll = updatedListing[id];
    currRoll.price = ((typeOptions[currRoll.type].basePrice + glazingOptions[currRoll.glazing].glazingPrice)
                        * packSizeOptions[currRoll.packSize].packPrice).toFixed(2)
  }

  // Very short update functions, but having them keeps it clear where things are happening
  updatePack = (value, id) => {
    //console.log("updating packSize of " + id + " to " + value);
    let updatedListing = [...this.state.listingContent];
    updatedListing[id].packSize = value;
    this.updatePrice(updatedListing, id);
    this.setState({listingContent: updatedListing});
  }
  
  updateGlazing = (value, id) => {
    //console.log("updating glazing of " + id + " to " + value);
    let updatedListing = [...this.state.listingContent];
    updatedListing[id].glazing = value;
    this.updatePrice(updatedListing, id);
    this.setState({listingContent: updatedListing});
  }

  removeCartItem = (index) => {
    let updatedCart = [...this.state.cartContent];
    let cost = (parseFloat(this.state.totalCost) -
                parseFloat(updatedCart.splice(index, 1)[0].price)).toFixed(2);
    this.setState({cartContent: updatedCart, totalCost: cost})
  }

  render(){
    return(
      <div className="Page">
        <Navbar content={this.state.cartContent} infoPopup="none" toggleCart={this.toggleCart}/>

        <CartSection cartContent={this.state.cartContent}
                      totalCost={this.state.totalCost}
                      active={this.state.cartActive}
                      removeCartItem={this.removeCartItem}/>
        
        <div className="searchSection">
          <input type="search" id="searchInput" className="searchSegment"/>
          <input type="submit" onClick={this.search}value="Search"/>
          <label htmlFor="sortDropdown" className="searchSegment">sort by:</label>
          <select id="sortDropdown" onChange={this.sort}>
            <option value="name">Name</option>
            <option value="basePrice">Base Price</option>
          </select>
        </div>

        <main className="catalog">
          {this.state.listingContent.map((roll, idx) => {
            //console.log(roll.type);
            let rollName = typeOptions[roll.type].typeName.toLowerCase();
            return (rollName.includes(this.state.searchQuery.toLowerCase()) && 
            <Product
              key       = {roll.type}
              id        = {idx} 
              roll      = {roll}
              glazeFunc = {this.updateGlazing} 
              packFunc  = {this.updatePack}
              cartFunc  = {this.updateCart} />)
          })}
          {this.state.searchIsEmpty && <span className="noSearchMatch">No Match!</span>}
        </main>
    </div>
  )}
}

export default Page;