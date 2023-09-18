// Roll class to contain basic information about selected rolls and roll types
class Roll {
  type;
  price;
  glazing;
  packSize;

  constructor(newType, newPrice, newGlazing, newPackSize){
    this.type     = newType;
    this.price    = newPrice;
    this.glazing  = newGlazing;
    this.packSize = newPackSize;
  }

  /*
    Basic method to calculate the price of a roll rather than updating the roll's
    type price every time. This keeps me from needing to use magic numbers for
    creating new rolls.
  */
  getPrice(){
    return ((this.price + this.glazing.glazingPrice) * this.packSize.packPrice).toFixed(2);
  }

  // Basic stringify function for debugging
  toString(){
    return "type: " + this.type + ", price: " + this.price + ", glazing: " 
            + this.glazing + ", packSize: " + this.packSize + "\n";
  }
}

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

  // Another basic string method for debugging
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

  // Behold, another string method for debugging. Always good to have them.
  toString(){
    return "packOption: " + this.packOption + ", packPrice: " + this.packPrice;
  }
}

// Array/List to hold glazes. Could be a const, but in lab we were told to avoid those.
let glazingOptions  = [new Glaze("Keep original", 0.00),
                        new Glaze("Sugar milk", 0.00),
                        new Glaze("Vanilla milk", 0.50),
                        new Glaze("Double chocolate", 1.50)];

// Array/List to hold pack sizes. Also could be a const if we weren't told to avoid them.
let packSizeOptions = [new Pack(1, 1), 
                        new Pack(3, 3),
                        new Pack(6, 5),
                        new Pack(12, 10)];

// Array/List to hold Roll objects for all rolls currently displayed in catalog.
let rollOptions     = [new Roll("Original cinnamon roll", 2.49, glazingOptions[0], packSizeOptions[0]),
                        new Roll("Apple cinnamon roll", 3.49, glazingOptions[0], packSizeOptions[0]),
                        new Roll("Raisin cinnamon roll", 2.99, glazingOptions[0], packSizeOptions[0]),
                        new Roll("Walnut cinnamon roll", 3.49, glazingOptions[0], packSizeOptions[0]),
                        new Roll("Double-chocolate cinnamon roll", 3.99, glazingOptions[0], packSizeOptions[0]),
                        new Roll("Strawberry cinnamon roll", 3.99, glazingOptions[0], packSizeOptions[0])];

// Object containing cart cost totals and item list. I ignored the const avoidance, this needed a const.
const cart          = {priceTotal: 0.00, items: []};

// Updates the price box of a specific product
function updatePrice(productID){
  let cost = document.querySelector("#price" + productID.toString());
  cost.textContent = "$ " + rollOptions[productID].getPrice().toString();
}

// Updates the backing glazing option and price for a product
function updateGlazing(event){
  // Collect the ID of the product to update and update the current pending one
  let elementID                   = event.currentTarget.id;
  // Could have done this with parentElement id, but I didn't remember that when I wrote it.
  let productID                   = parseInt(elementID.charAt(elementID.length-1));
  rollOptions[productID].glazing  = glazingOptions[event.currentTarget.value];

  updatePrice(productID)
}

// Updates the backing pack option and price for a product.
function updatePack(event){
  // Collect the ID of the product to update and update the current pending one
  let targetName = event.currentTarget.name;
  // Also could have done this with parentElement id. Not going to bother refactoring unless it's an issue.
  let productID = parseInt(targetName.charAt(targetName.length-1));
  rollOptions[productID].packSize = packSizeOptions[event.currentTarget.value];

  updatePrice(productID);
}

// Shows the popup for adding a new product to a cart.
function showCartPopup(){
  let newRoll = cart.items[cart.items.length - 1];

  let popup           = document.querySelector("#cartPopup");
  popup.style.display = "block";
  let product         = document.querySelector("#addedProduct");
  product.textContent = newRoll.type;
  document.querySelector("#addedGlazing").textContent = newRoll.glazing.optionName + " glazing";
  document.querySelector("#addedPackSize").textContent = "Pack of " + newRoll.packSize.packOption;
  document.querySelector("#addedPrice").textContent = "Price: $" + newRoll.price;
  
  /*
    There's probably prettier ways of doing this. But this works, and works well.
    Yes, it's technically a one-liner and those are bad, but they're both parameters,
    so I'm justifying it.
  */
  setTimeout(function() { popup.style.display = "none";}, 3000);
}

// Adds a product with its current settings to the cart and shows the popup.
function addToCart(event){
  /*
    See, I do know the parentNode trick, I'm just lazy.
    Please don't take my points, I love them and I will cry.
  */
  let productID     = parseInt(event.currentTarget.parentNode.id);

  let currRoll      = rollOptions[productID];
  let currPrice     = currRoll.getPrice();
  cart.items.push(new Roll(currRoll.type, currPrice, currRoll.glazing, currRoll.packSize));
  // Adding parseFloat calls just in case, it was trying to do weird string stuff without it. 
  cart.priceTotal   = (parseFloat(cart.priceTotal) + parseFloat(currPrice)).toFixed(2);

  let cartSummaries = document.querySelectorAll(".cartSummary");
  // This exists because plural language sucks.
  if (cart.items.length < 2){
    cartSummaries[0].textContent  = cart.items.length + " item";
  }
  else{
    cartSummaries[0].textContent  = cart.items.length + " items";
  }
  cartSummaries[1].textContent    = "Total: $ " + cart.priceTotal;
  showCartPopup();
}

// "Let there be glaze options." -God, probably
function loadGlazeOptions(){
  // Select all glazing dropdown lists, add glaze options to them
  let glazeDropdowns = document.querySelectorAll(".glazeDropdown");
  for (let i = 0; i < glazeDropdowns.length; i++) {
    let dropdown = glazeDropdowns[i];
    for (let j = 0; j < glazingOptions.length; j++) {
      let option        = document.createElement("option");
      option.text       = glazingOptions[j].optionName;
      option.value      = j;
      option.productID  = i;
      dropdown.add(option);
    }
    dropdown.addEventListener("change", updateGlazing);
  }
}

// "Let there be pack size options, I can't eat this many cinnamon rolls in one sitting." -Me
function loadPackSizeOptions(){
  console.log("Loading pack sizes...");
  let packSizeLists = document.querySelectorAll(".packSizeContainer");
  // Iterates through the rolls in the catalog and gifts them all 6-packs. Also the other pack sizes.
  for (let i = 0; i < packSizeLists.length; i++) {
    let packOptions = packSizeLists[i];
    for (let j = 0; j < packSizeOptions.length; j++) {
      let option    = document.createElement("input");
      option.type   = "radio";
      option.value  = j;
      option.name   = "roll" + i.toString();
      option.id     = "rollOption" + i.toString() + j.toString();
      option.className  = "packSizeRadio";
      option.addEventListener("change", updatePack);
      packOptions.appendChild(option);
      
      // Updates the pack option labels
      let label         = document.createElement("label");
      label.setAttribute("for", "rollOption" + i.toString() + j.toString());
      label.className   = "packSizeButton";
      label.textContent = packSizeOptions[j].packOption.toString()
      packOptions.appendChild(label);
    }
  }
}

// Loads all prices for products
function loadPrices(){
  let prices = document.querySelectorAll(".price");
  for (let i = 0; i < prices.length; i++) {
    prices[i].textContent = "$ " + rollOptions[i].getPrice();
  }
}

// Adds event listeners to the addToCart buttons, since it seems like that's what we're intended to do?
function loadCartHandlers(){
  let cartButtons = document.querySelectorAll(".addToCart");
  for (let i = 0; i < cartButtons.length; i++) {
    cartButtons[i].addEventListener("click", addToCart);
  }
}

// Loads all the content. Runs on page load.
function loadContent(){
  loadGlazeOptions();
  loadPackSizeOptions();
  loadPrices();
  loadCartHandlers();
}