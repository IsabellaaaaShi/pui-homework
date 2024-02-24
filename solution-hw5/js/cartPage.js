// -------- const from detailPage ---------------------
const glazingPrice = {
    "Keep original": 0,
    "Sugar milk": 0,
    "Vanilla milk": 0.5,
    "Double chocolate": 1.5
}

const packSize = {
    "1": 1,
    "3": 3,
    "6": 5,
    "12": 10
}

// -------- define the basic case ------------------------------------
let cartItem = []; 

class Roll {
    constructor(rollType, rollGlazing, packAmount, basePrice) {
        this.type = rollType;
        this.glazing =  rollGlazing;
        this.size = packAmount;
        this.basePrice = basePrice;
        let totalPrice = (this.basePrice + glazingPrice[this.glazing]) * packSize[this.size];
        // round the float: https://stackoverflow.com/questions/11832914/how-to-round-to-at-most-2-decimal-places-if-necessary
        this.totalPrice = parseFloat(totalPrice.toFixed(2));
    }
}

// -------- add new rolls to cart ------------------------------------
function addToCart(rollType, rollGlazing, packSize, basePrice){
    const newRoll = new Roll(rollType, rollGlazing, packSize, basePrice); 
    // add item to array: https://w3schools.com/jsref/jsref_push.asp
    cartItem.push(newRoll); 
}

addToCart("Original", "Sugar milk", 1, rolls["Original"]["basePrice"]); 
addToCart("Walnut", "Vanilla milk", 12, rolls["Walnut"]["basePrice"]); 
addToCart("Raisin", "Sugar milk", 3, rolls["Raisin"]["basePrice"]); 
addToCart("Apple", "Keep original", 3, rolls["Apple"]["basePrice"]); 

console.log(cartItem)

// --------- display cart items on the page
function aaa(){

}
// --------- remove from cart ----------------------------------------

function removeFromCart(this){

}
// -------- calculate price ------------------------------------------