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

// Array/List to hold type info so I don't have magic numbers all over the place.
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
                                  "Cinnamon roll with glaze and strawberries", 3.99)];

export {Roll, Glaze, Pack, glazingOptions, packSizeOptions, typeOptions};