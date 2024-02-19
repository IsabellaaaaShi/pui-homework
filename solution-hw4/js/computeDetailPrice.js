
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
let currGlazingPrice = 0;
let currPackSize = 1;
let cart = []; 

// -------- glazing price -------------------------------------------
const glazingPrice = {
    "Keep original": 0,
    "Sugar milk": 0,
    "Vanilla milk": 0.5,
    "Double chocolate": 1.5
}

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
    // change the value to a float: https://www.freecodecamp.org/news/how-to-convert-a-string-to-a-number-in-javascript/
    currGlazingPrice = parseFloat(element.value);
    //console.log(typeof currGlazingPrice)
    priceUpdate();
}

// -------- pack size ------------------------------------------------
const packSize = {
    "1": 1,
    "3": 3,
    "6": 5,
    "12": 10
}

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

function updateCart(){
    
}