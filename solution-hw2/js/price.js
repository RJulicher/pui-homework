// TODO: Add commenting, cart functionality
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

  getPrice(){
    return ((this.price + this.glazing.glazingPrice) * this.packSize.packPrice).toFixed(2);
  }

  toString(){
    return "type: " + this.type + ", price: " + this.price + ", glazing: " + this.glazing + ", packSize: " + this.packSize + "\n";
  }
}

class Glaze {
  optionName = "";
  glazingPrice = 0.00;

  constructor(newName, newPrice){
    this.optionName = newName;
    this.glazingPrice = newPrice;
  }

  toString(){
    return "optionName: " + this.optionName + ", glazingPrice: " + this.glazingPrice;
  }
}

class Pack {
  packOption;
  packPrice;

  constructor(newOption, newPrice){
    this.packOption = newOption;
    this.packPrice  = newPrice;
  }

  toString(){
    return "packOption: " + this.packOption + ", packPrice: " + this.packPrice;
  }
}

let glazingOptions  = [new Glaze("Keep original", 0.00),
                        new Glaze("Sugar milk", 0.00),
                        new Glaze("Vanilla milk", 0.50),
                        new Glaze("Double chocolate", 1.50)];

let packSizeOptions = [new Pack(1, 1), 
                        new Pack(3, 3),
                        new Pack(6, 5),
                        new Pack(12, 10)];

let rollOptions     = [new Roll("Original cinnamon roll", 2.49, glazingOptions[0], packSizeOptions[0]),
                        new Roll("Apple cinnamon roll", 3.49, glazingOptions[0], packSizeOptions[0]),
                        new Roll("Raisin cinnamon roll", 2.99, glazingOptions[0], packSizeOptions[0]),
                        new Roll("Walnut cinnamon roll", 3.49, glazingOptions[0], packSizeOptions[0]),
                        new Roll("Double-chocolate cinnamon roll", 3.99, glazingOptions[0], packSizeOptions[0]),
                        new Roll("Strawberry cinnamon roll", 3.99, glazingOptions[0], packSizeOptions[0])];

const cart          = {priceTotal: 0.00, items: []};

function updatePrice(productID){
  let cost = document.querySelector("#price" + productID.toString());
  cost.textContent = "$ " + rollOptions[productID].getPrice().toString();
}

function updateGlazing(event){
  // Collect the ID of the product to update and update the current pending one
  let elementID = event.currentTarget.id;
  let productID = parseInt(elementID.charAt(elementID.length-1));
  rollOptions[productID].glazing = glazingOptions[event.currentTarget.value];

  updatePrice(productID)
}

function updatePack(event){
  // Collect the ID of the product to update and update the current pending one
  let targetName = event.currentTarget.name;
  let productID = parseInt(targetName.charAt(targetName.length-1));
  rollOptions[productID].packSize = packSizeOptions[event.currentTarget.value];

  updatePrice(productID);
}

function showCartPopup(){
  let newRoll = cart.items[cart.items.length - 1];

  let popup = document.querySelector("#cartPopup");
  popup.style.display = "block";
  let product = document.querySelector("#addedProduct");
  product.textContent = newRoll.type;
  document.querySelector("#addedGlazing").textContent = newRoll.glazing.optionName + " glazing";
  document.querySelector("#addedPackSize").textContent = "Pack of " + newRoll.packSize.packOption;
  document.querySelector("#addedPrice").textContent = "Price: $" + newRoll.price;
  
  setTimeout(function() { popup.style.display = "none";}, 3000);
  
}

function addToCart(event){
  let productID     = parseInt(event.currentTarget.parentNode.id);

  let currRoll      = rollOptions[productID];
  let currPrice     = currRoll.getPrice();
  cart.items.push(new Roll(currRoll.type, currPrice, currRoll.glazing, currRoll.packSize));
  // Adding parseFloat calls just in case, it was trying to do weird string stuff without it. 
  cart.priceTotal   = (parseFloat(cart.priceTotal) + parseFloat(currPrice)).toFixed(2);

  let cartSummaries = document.querySelectorAll(".cartSummary");
  if (cart.items.length < 2){
    cartSummaries[0].textContent  = cart.items.length + " item";
  }
  else{
    cartSummaries[0].textContent  = cart.items.length + " items";
  }
  cartSummaries[1].textContent  = "Total: $ " + cart.priceTotal;
  showCartPopup();
}

function loadGlazeOptions(){
  // Select all glazing dropdown lists, add glaze options to them
  console.log("Loading glazes...");
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

function loadPackSizeOptions(){
  console.log("Loading pack sizes...");
  let packSizeLists = document.querySelectorAll(".packSizeContainer");
  for (let i = 0; i < packSizeLists.length; i++) {
    let packOptions = packSizeLists[i];
    for (let j = 0; j < packSizeOptions.length; j++) {
      let option    = document.createElement("input");
      option.type   = "radio";
      option.value  = j;
      option.name   = "roll" + i.toString();
      option.id     = "rollOption" + i.toString() + j.toString();
      option.className = "packSizeRadio";
      option.addEventListener("change", updatePack);
      packOptions.appendChild(option);

      let label     = document.createElement("label");
      label.setAttribute("for", "rollOption" + i.toString() + j.toString());
      label.className = "packSizeButton";
      label.textContent = packSizeOptions[j].packOption.toString()
      packOptions.appendChild(label);
    }
  }
}

function loadPrices(){
  console.log("Loading prices...");
  let prices = document.querySelectorAll(".price");
  for (let i = 0; i < prices.length; i++) {
    prices[i].textContent = "$ " + rollOptions[i].getPrice();
  }
}

function loadCartHandlers(){
  let cartButtons = document.querySelectorAll(".addToCart");
  for (let i = 0; i < cartButtons.length; i++) {
    cartButtons[i].addEventListener("click", addToCart);
  }
}

function loadContent(){
  console.log("---LOADING CONTENT...");
  loadGlazeOptions();
  loadPackSizeOptions();
  loadPrices();
  loadCartHandlers();
}