class Roll {
  type;
  glazing;
  packSize;
  price;

  constructor(newType, newGlazing, newPackSize, newPrice){
    this.type     = newType;
    this.glazing  = newGlazing;
    this.packSize = newPackSize;
    this.price    = newPrice;
  }

  // Basic stringify function for debugging
  toString(){
    return "type: " + this.type + ", price: " + this.price + ", glazing: " 
            + this.glazing + ", packSize: " + this.packSize + "\n";
  }
}


// Class to hold deeper metadata for each type of roll
class Type {
  typeNum;
  typeID;
  imgSrc;
  imgAlt;
  basePrice;

  constructor(newTypeNum, newTypeID, newImgSrc, newImgAlt, newBasePrice){
    this.typeNum    = newTypeNum;
    this.typeID     = newTypeID;
    this.imgSrc     = newImgSrc;
    this.imgAlt     = newImgAlt;
    this.basePrice  = newBasePrice;
  }
}

// Array/List to hold glazes.
let glazingOptions  = {"Keep original": 0.00,
                        "Sugar milk": 0.00,
                        "Vanilla milk": 0.50,
                        "Double chocolate": 1.50};

// Array/List to hold pack sizes.
let packSizeOptions = {1: 1,
                        3: 3,
                        6: 5,
                        12: 10};

// Array/List to hold type info so I don't have magic numbers all over the place.
let typeOptions     = {"Original cinnamon roll": new Type(0, "original", "./products/original-cinnamon-roll.jpg", 
                                                        "Cinnamon roll with glaze and cinnamon stick", 2.49),
                        "Apple cinnamon roll": new Type(1, "apple", "./products/apple-cinnamon-roll.jpg",
                                                        "Cinnamon roll with glaze and apples", 3.49),
                        "Raisin cinnamon roll": new Type(2, "raisin", "./products/raisin-cinnamon-roll.jpg",
                                                        "Cinnamon roll with glaze and raisins", 2.99),
                        "Walnut cinnamon roll": new Type(3, "walnut", "./products/walnut-cinnamon-roll.jpg",
                                                        "Cinnamon roll with glaze and walnuts", 3.49),
                        "Double-chocolate cinnamon roll": new Type(4, "double-chocolate", "./products/double-chocolate-cinnamon-roll.jpg",
                                                        "Cinnamon roll with glaze and chocolate", 3.99),
                        "Strawberry cinnamon roll": new Type(5, "strawberry", "./products/strawberry-cinnamon-roll.jpg",
                                                        "Cinnamon roll with glaze and strawberries", 3.99)};

export {Roll, glazingOptions, packSizeOptions, typeOptions};