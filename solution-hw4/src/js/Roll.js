import React, { Component } from 'react';
import {glazingOptions, packSizeOptions, typeOptions} from './HelperStructs.js';

/*
* -------------------------------------------------
* Main Roll Component/Functionality
* -------------------------------------------------
*/


// Roll class using state so that products can be updated as state changes happen
class Roll extends Component {
  constructor(props) {
    super(props);
    this.state = {id: props.id,
                  type: this.props.type,          // Type index
                  glazing: this.props.glazing,    // Glazing index
                  packSize: this.props.packSize,  // Pack size index
                  price: this.props.price};       // Current price of the product
  }

  // Very short update functions, but having them keeps it clear where things are happening
  updatePack = (e) => {
    this.setState({packSize: e.currentTarget.value});
  }
  updateGlazing = (e) => {
    this.setState({glazing: e.currentTarget.value});
  }

  // Updates price when something else is updated, if necessary
  componentDidUpdate(prevProps, prevState){
    if (prevState.packSize !== this.state.packSize || prevState.glazing !== this.state.glazing){
      this.setState({price: ((typeOptions[this.state.type].basePrice + glazingOptions[this.state.glazing].glazingPrice)
                              * packSizeOptions[this.state.packSize].packPrice).toFixed(2) })
    }
  }
  
  // Render is long, but it's long purely because of two option/input fields.
  render() {
    return (
      <section className="product" id={ this.state.id }>
        <img src={typeOptions[this.state.type].imgSrc} alt={typeOptions[this.state.type].imgAlt} className="productPic"/>
        <h3 className="productName">{typeOptions[this.state.type].typeName}</h3>

        <label htmlFor={"dropdown" + this.state.id} className="option">Glazing:</label>
        <select onChange={this.updateGlazing} name="glazing" id={"dropdown" + this.state.id} className="glazeDropdown">
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
                onClick={() => this.props.cartFunc(this.state.type,
                  this.state.glazing, this.state.packSize, this.state.price, )}
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

export default Roll;