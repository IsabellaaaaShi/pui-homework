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
        this.totalPrice = totalPrice.toFixed(2);
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


// --------- display cart items on the page --------------------------
function displayRollOnPage(roll){
    // template: lab 5
    // create clone
    const template  = document.querySelector("#cartTemplate"); 
    const clone = template.content.cloneNode(true); 
    roll.element = clone.querySelector("#cartFormat"); 

    // remove item
    const removeItem = roll.element.querySelector(".removeStyle"); 
    removeItem.addEventListener("click", () => {
        removeFromCart(roll); 
    }); 

    updateRoll(roll); 
    updateTotalPrice(roll); 
    
    // add to DOM
    const rollListElement = document.querySelector("#rollList"); 
    rollListElement.append(roll.element); 
}

function updateRoll(roll){
    const rollImage = roll.element.querySelector(".cartImg"); 
    const rollTitle = roll.element.querySelector("#rollName"); 
    const rollCurrGlaze = roll.element.querySelector("#rollGlaze"); 
    const rollPacking = roll.element.querySelector("#rollPack"); 
    const rollTotalPrice = roll.element.querySelector(".cartItemPrice"); 

    rollImage.src = "../assets/products/" + rolls[roll.type]["imageFile"];
    rollTitle.innerText = roll.type + " Cinnamon Roll"; 
    rollCurrGlaze.innerText = "Glazing: " + roll.glazing; 
    rollPacking.innerText = "Pack Size: " + roll.size; 
    rollTotalPrice.innerText = "$ " + roll.totalPrice; 

}

// --------- remove from cart ----------------------------------------

function removeFromCart(roll){
    roll.element.remove(); 
    // remove from array: https://sentry.io/answers/remove-specific-item-from-array/
    const index = cartItem.indexOf(roll); 
    cartItem.splice(index, 1); 
    console.log(cartItem); 
    updateTotalPrice(roll); 
}

// -------- calculate price ------------------------------------------
function updateTotalPrice(){
    const cartTotalPrice = document.querySelector("#checkoutPrice"); 
    let priceCount = 0; 
    for (const roll of cartItem){
        individualPrice = parseFloat(roll.totalPrice); 
        priceCount += individualPrice; 
    }

    cartTotalPrice.innerText = "$ " + priceCount.toFixed(2); 
}

for (const rollItem of cartItem){
    displayRollOnPage(rollItem); 
}