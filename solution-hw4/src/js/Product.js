import React, { Component } from 'react';

// Product class using state so that products can be updated as state changes happen
class Product extends Component {
  constructor(props) {
    super(props);
    this.state = {id: props.id,
                  imgSrc: props.imgSrc,
                  imgAlt: props.alt,
                  name: props.name,
                  nameID: props.nameID,
                  price: props.price};
  }
  
  // Render is long, but it's long purely because of two option/input fields.
  render() {
    return (
      <section className="product" id={ this.state.id }>
        <img src={this.state.imgSrc} alt={this.state.imgAlt} className="productPic"/>
        <h3 className="productName">{this.state.name}</h3>

        <label htmlFor={"dropdown" + this.state.id} className="option">Glazing:</label>
        <select name="glazing" id={"dropdown" + this.state.id} className="glazeDropdown">
          <option value="original">Keep original</option>
          <option value="sugar">Sugar milk</option>
          <option value="vanilla">Vanilla milk</option>
          <option value="chocolate">Double chocolate</option>
        </select>

        <span className="option">Pack size:</span>
        <div className="packSizeContainer">
          <input type="radio" value="1" name="original" id={this.state.nameID + "1"} className="packSizeRadio"/>
          <label htmlFor={this.state.nameID + "1"} className="packSizeButton">1</label>
          
          <input type="radio" value="3" name="original" id={this.state.nameID + "3"} className="packSizeRadio"/>
          <label htmlFor={this.state.nameID + "3"} className="packSizeButton">3</label>
          
          <input type="radio" value="6" name="original" id={this.state.nameID + "6"} className="packSizeRadio"/>
          <label htmlFor={this.state.nameID + "6"} className="packSizeButton">6</label>
          
          <input type="radio" value="12" name="original" id={this.state.nameID + "12"} className="packSizeRadio"/>
          <label htmlFor={this.state.nameID + "12"} className="packSizeButton">12</label>
        </div>

        <h4 className="price" id={"price" + this.state.id}>{"$ " + this.state.price}</h4>
        <button type="button" className="addToCart">Add to Cart</button>
      </section>
    );
  }
}

export default Product;