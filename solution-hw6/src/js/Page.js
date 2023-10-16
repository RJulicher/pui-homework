import React, { Component } from 'react';
import Product from './Product.js';
import Navbar from './Navbar.js';
import {Roll, glazingOptions, packSizeOptions, typeOptions} from './HelperStructs.js';
import CartSection from './CartSection.js';

// NOTE: THE SERIALIZATION METHOD IS RIGHT ABOVE THE MOUNT HANDLER.
// Deserialization is in CartSection.js
// The spec did not specify requiring hooks, and this handles the task well.
// The only reason serialization is here is because something needs to be here to ping Navbar.

class Page extends Component{
  constructor(props){
    super(props);
    // Just so we don't accidentally get any negative values for testing
    this.state = {listingContent: [new Roll("Original cinnamon roll", "Keep original", "1", 2.49),
                                    new Roll("Apple cinnamon roll", "Keep original", "1", 3.49),
                                    new Roll("Raisin cinnamon roll", "Keep original", "1", 2.99),
                                    new Roll("Walnut cinnamon roll", "Keep original", "1", 3.49),
                                    new Roll("Double-chocolate cinnamon roll", "Keep original", "1", 3.99),
                                    new Roll("Strawberry cinnamon roll", "Keep original", "1", 3.99)],
                  cartActive: false,
                  searchQuery: "",
                  searchIsEmpty: false,
                  numItemsInCart: (JSON.parse(localStorage.getItem("cartContent")) || []).length};
  }

  // Serializes cart items to JSON
  serializeCartToJSON(newCartContent, newCost) {
    localStorage.setItem("cartContent", JSON.stringify(newCartContent));
    localStorage.setItem("totalCost", newCost);
    console.log("Cart Contents: \n" + localStorage.getItem("cartContent") + 
                "\n \nTotal Cost: \n" + JSON.parse(localStorage.getItem("totalCost")));
  }

  componentDidMount() {
    // Just in case.
    if (!localStorage.getItem("cartContent")){
      this.serializeCartToJSON([], 0.00);
    }
  }

  // Method passed between components to update cart contents and ping state for the navbar
  updateCart = (type, glazing, packSize, price) => {
    let newCartContent = [...(JSON.parse(localStorage.getItem("cartContent")) || []), new Roll(type, glazing, packSize, price)];
    this.serializeCartToJSON(newCartContent, (parseFloat(JSON.parse(localStorage.getItem("totalCost"))) + parseFloat(price)).toFixed(2));
    this.setState({numItemsInCart: this.state.numItemsInCart + 1});
  }

  // Removes a given item from cart ang pings state for the navbar
  removeCartItem = (index) => {
    let updatedCart = (JSON.parse(localStorage.getItem("cartContent")) || []);

    let cost = (parseFloat(localStorage.getItem("totalCost") ?? 0.00) -
                parseFloat(updatedCart.splice(index, 1)[0].price)).toFixed(2);
    
    this.serializeCartToJSON(updatedCart, cost);
    this.setState({numItemsInCart: this.state.numItemsInCart - 1});
  }

  // Sort listing content by name
  sortByName = () => {
    let sortedContent = [...this.state.listingContent];
    sortedContent.sort((a,b) =>   {
                                    let aName = a.type;
                                    let bName = b.type;
                                    if (aName < bName)      return -1;
                                    else if (bName < aName) return 1;
                                    else                    return 0;
                                  });
    this.setState({listingContent: sortedContent});
  }

  // Sort listing content by price
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

  // Decides which sorting method to use, method gets passed to component
  sort = (e) => {
    e.target.value == "name" ? this.sortByName() : this.sortByPrice();
  }

  // Toggles cart expansion
  toggleCart = () => {
    this.setState({cartActive: !this.state.cartActive});
  }

  // Search function for listing filtration
  search = () => {
    let searchString = document.getElementById("searchInput").value;
    let emptySearch = true;
    this.state.listingContent.forEach(roll => {
      let rollName = roll.type.toLowerCase();
      if (rollName.includes(searchString.toLowerCase())){
        emptySearch = false;
      }
      this.setState({searchQuery: searchString, searchIsEmpty: emptySearch});
    });
  }

  updatePrice = (updatedListing, id) => {
    let currRoll = updatedListing[id];
    currRoll.price = ((typeOptions[currRoll.type].basePrice + glazingOptions[currRoll.glazing])
                        * packSizeOptions[currRoll.packSize]).toFixed(2)
  }

  // Very short update functions, but having them keeps it clear where things are happening
  updatePack = (value, id) => {
    let updatedListing = [...this.state.listingContent];
    updatedListing[id].packSize = value;
    this.updatePrice(updatedListing, id);
    this.setState({listingContent: updatedListing});
  }
  
  updateGlazing = (value, id) => {
    let updatedListing = [...this.state.listingContent];
    updatedListing[id].glazing = value;
    this.updatePrice(updatedListing, id);
    this.setState({listingContent: updatedListing});
  }

  render(){
    return(
      <div className="Page">
        <Navbar numItemsInCart={this.state.numItemsInCart} infoPopup="none" toggleCart={this.toggleCart}/>

        <CartSection totalCost={this.state.totalCost}
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
            let rollName = roll.type.toLowerCase();
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