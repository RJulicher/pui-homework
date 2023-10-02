import React, { Component } from 'react';

/*
* -------------------------------------------------
* Helper Classes + Data Structures
* -------------------------------------------------
*/

/*
  Glaze class to keep options separate and standardized. Technically wouldn't
  have needed to make it its own class, but this allows me to have a toString
  method for easy debugging.
*/
class Glaze {
  optionName          = "";
  glazingPrice        = 0.00;

  constructor(newName, newPrice){
    this.optionName   = newName;
    this.glazingPrice = newPrice;
  }

  // String method for debugging
  toString(){
    return "optionName: " + this.optionName + ", glazingPrice: " + this.glazingPrice;
  }
}

// Basic class for pack size selection, see Glaze class justification above.
class Pack {
  packOption;
  packPrice;

  constructor(newOption, newPrice){
    this.packOption = newOption;
    this.packPrice  = newPrice;
  }
}

// Class to hold deeper metadata for each type of roll
class Type {
  typeName;
  typeID;
  imgSrc;
  imgAlt;
  basePrice;

  constructor(newTypeName, newTypeID, newImgSrc, newImgAlt, newBasePrice){
    this.typeName   = newTypeName;
    this.typeID     = newTypeID;
    this.imgSrc     = newImgSrc;
    this.imgAlt     = newImgAlt;
    this.basePrice  = newBasePrice;
  }
}

// Array/List to hold glazes.
let glazingOptions  = [new Glaze("Keep original", 0.00),
                        new Glaze("Sugar milk", 0.00),
                        new Glaze("Vanilla milk", 0.50),
                        new Glaze("Double chocolate", 1.50)];

// Array/List to hold pack sizes.
let packSizeOptions = [new Pack(1, 1), new Pack(3, 3), new Pack(6, 5), new Pack(12, 10)];

// Array/List to hold type info.
let typeOptions     = [new Type("Original cinnamon roll" , "original",
                                  "./products/original-cinnamon-roll.jpg", 
                                  "Cinnamon roll with glaze and cinnamon stick", 2.49),
                        new Type("Apple cinnamon roll", "apple",
                                  "./products/apple-cinnamon-roll.jpg",
                                  "Cinnamon roll with glaze and apples", 3.49),
                        new Type("Raisin cinnamon roll", "raisin",
                                  "./products/raisin-cinnamon-roll.jpg",
                                  "Cinnamon roll with glaze and raisins", 2.99),
                        new Type("Walnut cinnamon roll", "walnut",
                                  "./products/walnut-cinnamon-roll.jpg",
                                  "Cinnamon roll with glaze and walnuts", 3.49),
                        new Type("Double-chocolate cinnamon roll", "double-chocolate",
                                  "./products/double-chocolate-cinnamon-roll.jpg",
                                  "Cinnamon roll with glaze and chocolate", 3.99),
                        new Type("Strawberry cinnamon roll", "strawberry",
                                  "./products/strawberry-cinnamon-roll.jpg",
                                  "Cinnamon roll with glaze and strawberries", 3.99)]

/*
* -------------------------------------------------
* Main Product Component/Functionality
* -------------------------------------------------
*/


// Product class using state so that products can be updated as state changes happen
class Product extends Component {
  constructor(props) {
    super(props);
    this.state = {id: props.id,            // ID number of product
                  imgSrc: props.imgSrc,    // Source dest for image of product
                  imgAlt: props.alt,      // Alt text for image
                  name: props.name,       // Name of product
                  nameID: props.nameID,   // lowercase name id of product
                  glaze: 0,
                  packSize: 0,
                  basePrice: props.price, // Base price of product
                  price: props.price};    // Price of the product
  }

  // Very short update functions, but having them keeps it clear where things are happening
  updatePack = (e) => {
    this.setState({packSize: e.currentTarget.value});
  }
  updateGlaze = (e) => {
    this.setState({glaze: e.currentTarget.value});
  }

  getPrice(){
    return ((this.state.basePrice + glazingOptions[this.state.glaze].glazingPrice) * packSizeOptions[this.state.packSize].packPrice).toFixed(2);
  }

  // Updates price when something else is updated, if necessary
  componentDidUpdate(prevProps, prevState){
    if (prevState.packSize !== this.state.packSize || prevState.glaze !== this.state.glaze){
      this.setState({price: ((this.state.basePrice + glazingOptions[this.state.glaze].glazingPrice) * packSizeOptions[this.state.packSize].packPrice).toFixed(2)})
    }
  }
  
  // Render is long, but it's long purely because of two option/input fields.
  render() {
    return (
      <section className="product" id={ this.state.id }>
        <img src={this.state.imgSrc} alt={this.state.imgAlt} className="productPic"/>
        <h3 className="productName">{this.state.name}</h3>

        <label htmlFor={"dropdown" + this.state.id} className="option">Glazing:</label>
        <select onChange={this.updateGlaze} name="glazing" id={"dropdown" + this.state.id} className="glazeDropdown">
          <option value="0" productid = {this.state.id}>Keep original</option>
          <option value="1" productid = {this.state.id}>Sugar milk</option>
          <option value="2" productid = {this.state.id}>Vanilla milk</option>
          <option value="3" productid = {this.state.id}>Double chocolate</option>
        </select>

        <span className="option">Pack size:</span>
        <div className="packSizeContainer">
          <input onChange={this.updatePack} type="radio" value="0" name={"roll" + this.state.id}
                            id={"rollOption" + this.state.id + "1"} className="packSizeRadio"/>
          <label htmlFor={"rollOption" + this.state.id + "1"} className="packSizeButton">1</label>
          
          <input onChange={this.updatePack} type="radio" value="1" name={"roll" + this.state.id}
                            id={"rollOption" + this.state.id + "3"} className="packSizeRadio"/>
          <label htmlFor={"rollOption" + this.state.id + "3"} className="packSizeButton">3</label>
          
          <input onChange={this.updatePack} type="radio" value="2" name={"roll" + this.state.id}
                            id={"rollOption" + this.state.id + "6"} className="packSizeRadio"/>
          <label htmlFor={"rollOption" + this.state.id + "6"} className="packSizeButton">6</label>
          
          <input onChange={this.updatePack} type="radio" value="3" name={"roll" + this.state.id}
                            id={"rollOption" + this.state.id + "12"} className="packSizeRadio"/>
          <label htmlFor={"rollOption" + this.state.id + "12"} className="packSizeButton">12</label>
        </div>

        <h4 className="price" id={"price" + this.state.id}>{"$ " + this.state.price}</h4>
        <button type="button"
                onClick={() => this.props.cartFunc(this.state.name,
                  this.state.price, this.state.glaze, this.state.packSize)}
                className="addToCart">Add to Cart</button>
      </section>
    );
  }
}

/*
* -------------------------------------------------
* Exports
* -------------------------------------------------
*/

export default Product;
export {Glaze, Pack, glazingOptions, packSizeOptions};