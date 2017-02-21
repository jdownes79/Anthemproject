
var restaurants = []

window.onload = function() {

  // create the XMLHttpRequest object
  let xmlhttp = new XMLHttpRequest()

  xmlhttp.onreadystatechange = function() {

    // complete the ready state handler callback

  }

  xmlhttp.open("GET", "/cuisines", true)
  xmlhttp.send()

}


function buildMenu(cuisines) {

  var menu = document.getElementById("cuisine-menu")

  // create the radio buttons and select the first one

}


function selectCuisine(radiobutton) {
  getRestaurants(radiobutton.value)
}


function getRestaurants( selectedCuisine ) {

  // reset the reastaurants array
  restaurants = []

  let xmlhttp = new XMLHttpRequest()

  xmlhttp.onreadystatechange = function() {

    if (xmlhttp.readyState === 4 && xmlhttp.status === 200) {

      // complete the ready state handler callback
      // set the flag to say that the review is not displayed

    }
  }

  xmlhttp.open("GET", "/restaurants/" + selectedCuisine, true)
  xmlhttp.send()

}

function showRestaurants( restaurants ) {

  let info = document.getElementById("restaurant-info")

  info.innerHTML = ""

  for( let i = 0; i < restaurants.length; i++ ) {

    // create the Name, Address and Review line
    // (with plus/minus badge) for each restaurant


    // if the review is supposed to be displayd - display it
  }

}

function showReview(i) {

  // toggle the display flag

  showRestaurants(restaurants)
}