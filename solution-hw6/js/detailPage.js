// -------- update detail page selection ------------------------------------------
// reference lab 4
const queryString = window.location.search; 
const params = new URLSearchParams(queryString); 
const chosenRoll = params.get('roll');
// get roll information: https://www.geeksforgeeks.org/how-to-access-and-process-nested-objects-arrays-or-json/
const basePrice = rolls[chosenRoll]["basePrice"]; 
updateDetailPage(chosenRoll);

function updateDetailPage(roll) {
    // update header roll type
    const headerElement = document.querySelector("#rollTitle"); 
    headerElement.innerText = roll + " cinnamon roll"; 

    // update image
    const rollImage = document.querySelector("#detailPageImage"); 
    const newImage = rolls[chosenRoll]["imageFile"]; 
    // change roll name to lowercase: https://www.w3schools.com/jsref/jsref_tolowercase.asp
    rollImage.src = "../assets/products/" + newImage; 

    // update base price
    const priceDisplay = document.querySelector("#finalPrice"); 
    priceDisplay.textContent= "$" + basePrice.toFixed(2); 
}

// -------- define the basic case ------------------------------------
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

let currGlazingPrice = 0;
let currPackSize = 1;
let glazingOption = "Keep original"; 
let packOption = 1; 
let cart = []; 

// check local storage for cart information
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


// -------- glazing price -------------------------------------------
const glazingSelect = document.querySelector("select#glazingOption");
// create dropdown menu for glazing
// javascript dropdown menu: https://github.com/cmu-spuds/pui-materials/tree/main/in-lab-examples/puinote-lab04/select-example
// javascript for loop for object: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/entries
for (const [glazing, price] of Object.entries(glazingPrice)) {
    const option = document.createElement('option');
    option.text = glazing;
    option.value = price;
    glazingSelect.add(option);
}

function glazingChange(element) {
    // get selected text: https://stackoverflow.com/questions/14976495/get-selected-option-text-with-javascript
    glazingOption = element.options[element.selectedIndex].text; 
    // change the value to a float: https://www.freecodecamp.org/news/how-to-convert-a-string-to-a-number-in-javascript/
    currGlazingPrice = parseFloat(element.value);
    priceUpdate();
}

// -------- pack size ------------------------------------------------
const packSelect = document.querySelector("select#packSizeOption");

// create dropdown menu for price
// javascript dropdown menu: https://github.com/cmu-spuds/pui-materials/tree/main/in-lab-examples/puinote-lab04/select-example
// javascript for loop for object: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/entries
for (const [pack, price] of Object.entries(packSize)) {
    const option = document.createElement('option');
    option.text = pack;
    option.value = price;
    packSelect.add(option);
}

function packSizeChange(element) {
    packOption = element.options[element.selectedIndex].text; 
    currPackSize = parseFloat(element.value);
    priceUpdate(); 
}

// -------- update the price ------------------------------------------
function priceUpdate() {
    const priceTotal = (basePrice + currGlazingPrice) * currPackSize; 
    const priceDisplay = document.querySelector("#finalPrice"); 
    // round the float: https://stackoverflow.com/questions/11832914/how-to-round-to-at-most-2-decimal-places-if-necessary
    // update the webpage: lab example
    priceDisplay.textContent= "$" + priceTotal.toFixed(2); 
}

// -------- update cart ------------------------------------------
function updateCart(){
    // create new roll when click
    const newRollType = chosenRoll; 
    const newRollGlazing = glazingOption; 
    const newRollSize = packOption.toString(); 
    const newbasePrice = basePrice; 
    // item in class: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Classes
    const newRoll = new Roll(newRollType, newRollGlazing, newRollSize, newbasePrice); 
    // add item to array: https://w3schools.com/jsref/jsref_push.asp
    cart.push(newRoll); 

    // update the badge
    badge.innerText = cart.length

    saveToLocalStorage();
}

function saveToLocalStorage() {  
    const cartArrayString = JSON.stringify(cart);
  
    localStorage.setItem('storedCart', cartArrayString);
    console.log(localStorage.getItem('storedCart')); 
  }