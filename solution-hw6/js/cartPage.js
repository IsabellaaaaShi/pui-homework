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

// -------- define the cart and retrieve existing ------------------------------------
let cart = []; 
if (localStorage.getItem('storedCart') != null) {
    retrieveFromLocalStorage();
  }

function retrieveFromLocalStorage() {
    const cartArrayString = localStorage.getItem('storedCart');
    const cartArray = JSON.parse(cartArrayString);
    for (const cartInfo of cartArray) {
      const cartItem = new Roll(cartInfo.type, cartInfo.glazing, cartInfo.size, cartInfo.basePrice); 
      cart.push(cartItem); 
    }
  }

// setup badge; length of array: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/length
const badge = document.querySelector(".oval"); 
badge.innerText = cart.length

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
    const index = cart.indexOf(roll); 
    cart.splice(index, 1); 
    updateTotalPrice(roll); 

    // update the badge
    badge.innerText = cart.length

    saveToLocalStorage(); 
}

function saveToLocalStorage() {  
    const cartArrayString = JSON.stringify(cart);
  
    localStorage.setItem('storedCart', cartArrayString);
    console.log(localStorage.getItem('storedCart')); 
  }


// -------- calculate price ------------------------------------------
function updateTotalPrice(){
    const cartTotalPrice = document.querySelector("#checkoutPrice"); 
    let priceCount = 0; 
    for (const roll of cart){
        individualPrice = parseFloat(roll.totalPrice); 
        priceCount += individualPrice; 
    }

    cartTotalPrice.innerText = "$ " + priceCount.toFixed(2); 
}

for (const rollItem of cart){
    displayRollOnPage(rollItem); 
}