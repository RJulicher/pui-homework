import '../css/theme.css';
import Product from './Product.js';
import Navbar from './Navbar.js';

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
