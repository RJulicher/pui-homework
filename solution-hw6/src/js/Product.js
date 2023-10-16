import React, { Component } from 'react';
import {typeOptions} from './HelperStructs.js';

/*
* -------------------------------------------------
* Main Product Component/Functionality
* -------------------------------------------------
*/


// Product class using state so that products can be updated as state changes happen
// Takes "roll" in props, the roll that backs the component
class Product extends Component {
  constructor(props) {
    super(props);
    // This is so completely useless to be doing with state.
    this.state = {packSizeVal: this.props.roll.packSize, 
                  typeNum: typeOptions[this.props.roll.type].typeNum};
  }

  // Handler for passing event values to props parent method
  updateGlazing = (e) => {
    this.props.glazeFunc(e.target.value, parseInt(e.target.id.charAt(e.target.id.length-1)));
  }

  // Handler for passing event values to props parent method
  updatePackSize = (e) => {
    this.props.packFunc(parseInt(e.target.value), parseInt(e.target.name.charAt(e.target.name.length-1)));
    this.setState({packSizeVal: e.target.value});
  }
  
  // Render is long, but it's long purely because of two option/input fields.
  render() {
    return (
      <section className="product" id={ this.props.roll.type }>
        <img src={typeOptions[this.props.roll.type].imgSrc} alt={typeOptions[this.props.roll.type].imgAlt} className="productPic"/>
        <h3 className="productName">{this.props.roll.type}</h3>

        <label htmlFor={"dropdown" + this.state.typeNum} className="option">Glazing:</label>
        <select onChange={this.updateGlazing} name="glazing" id={"dropdown" + this.state.typeNum} className="glazeDropdown">
          <option value="Keep original" productid = {this.props.roll.type}>Keep original</option>
          <option value="Sugar milk" productid = {this.props.roll.type}>Sugar milk</option>
          <option value="Vanilla milk" productid = {this.props.roll.type}>Vanilla milk</option>
          <option value="Double chocolate" productid = {this.props.roll.type}>Double chocolate</option>
        </select>

        <span className="option">Pack size:</span>
        <div className="packSizeContainer">
          <input onChange={this.updatePackSize} type="radio" value="1"
                            name={"roll" + this.state.typeNum}
                            id={"rollOption" + this.props.roll.type + "1"}
                            className="packSizeRadio"/>
          <label htmlFor={"rollOption" + this.props.roll.type + "1"}
                  className={this.state.packSizeVal == "1" ?
                  "packSizeButtonSelected" : "packSizeButton"}>1</label>
          
          <input onChange={this.updatePackSize} type="radio" value="3" 
                            name={"roll" + this.state.typeNum}
                            id={"rollOption" + this.props.roll.type + "3"} 
                            className="packSizeRadio"/>
          <label htmlFor={"rollOption" + this.props.roll.type + "3"}
                  className={this.state.packSizeVal == "3" ?
                  "packSizeButtonSelected" : "packSizeButton"}>3</label>
          
          <input onChange={this.updatePackSize} type="radio" value="6" 
                            name={"roll" + this.state.typeNum}
                            id={"rollOption" + this.props.roll.type + "6"} 
                            className="packSizeRadio"/>
          <label htmlFor={"rollOption" + this.props.roll.type + "6"}
                  className={this.state.packSizeVal == "6" ?
                  "packSizeButtonSelected" : "packSizeButton"}>6</label>
          
          <input onChange={this.updatePackSize} type="radio" value="12" 
                            name={"roll" + this.state.typeNum}
                            id={"rollOption" + this.props.roll.type + "12"} 
                            className="packSizeRadio"/>
          <label htmlFor={"rollOption" + this.props.roll.type + "12"}
                  className={this.state.packSizeVal == "12" ?
                  "packSizeButtonSelected" : "packSizeButton"}>12</label>
        </div>

        <h4 className="price" id={"price" + this.props.roll.type}>{"$ " + this.props.roll.price}</h4>
        <button type="button"
                onClick={() => this.props.cartFunc(this.props.roll.type,
                  this.props.roll.glazing, this.props.roll.packSize, this.props.roll.price, )}
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