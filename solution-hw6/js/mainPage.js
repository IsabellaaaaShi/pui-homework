// setup badge
const badge = document.querySelector(".oval"); 

if (localStorage.getItem('storedCart') != null) {
    retrieveCartSize();
  }
else {badge.innerText = 0}; 

function retrieveCartSize() {
    const cartArrayString = localStorage.getItem('storedCart');
    const cartArray = JSON.parse(cartArrayString);
    
    badge.innerText = cartArray.length; 
  }