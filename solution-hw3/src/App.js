import logo from './logo-01.svg';
import './css/theme.css';
import React, { Component } from 'react';


// Navbar class to handle nav and future cart functionality
class Navbar extends Component {
  render() {
    return(
      <header className="header">
        <img src={logo} alt="Bun Bun cinnamon roll logo" id="logo"/>
        <div className="headerText">
          <nav id="nav">
            <a href="" className="navText">PRODUCTS</a>
            <div id="cart">
              <a href="" className="navText" id="cartLink">CART</a>
            </div>
          </nav>

          <hr/>
          <h1 id="motto">Our hand-made cinnamon rolls</h1>
        </div>
      </header>
    );
  }
}

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

// Main App function
function App() {
  return (
    <div className="App">
      <Navbar />

      <main className="catalog">
        <Product id={0} imgSrc="./products/original-cinnamon-roll.jpg"
                        imgAlt="Cinnamon roll with glaze and cinnamon stick"
                        nameID="original" name="Original cinnamon roll" price={2.49}/>
        
        <Product id={1} imgSrc="./products/apple-cinnamon-roll.jpg"
                        imgAlt="Cinnamon roll with glaze and apples"
                        nameID="apple" name="Apple cinnamon roll" price={3.49}/>
        
        <Product id={2} imgSrc="./products/raisin-cinnamon-roll.jpg"
                        imgAlt="Cinnamon roll with glaze and raisins"
                        nameID="raisin" name="Raisin cinnamon roll" price={2.99}/>
        
        <Product id={3} imgSrc="./products/walnut-cinnamon-roll.jpg"
                        imgAlt="Cinnamon roll with glaze and walnuts"
                        nameID="walnut" name="Walnut cinnamon roll" price={3.49}/>
        
        <Product id={4} imgSrc="./products/double-chocolate-cinnamon-roll.jpg"
                        imgAlt="Cinnamon roll with glaze and chocolate"
                        nameID="double-chocolate" name="Double-chocolate cinnamon roll" price={3.99}/>
        
        <Product id={5} imgSrc="./products/strawberry-cinnamon-roll.jpg"
                        imgAlt="Cinnamon roll with glaze and strawberries"
                        nameID="strawberry" name="Strawberry cinnamon roll" price={3.99}/>
      </main>

    </div>
  );
}

export default App;
