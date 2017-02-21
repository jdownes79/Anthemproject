
var restaurants = []

window.onload = function() {

  let xmlhttp = new XMLHttpRequest()

  xmlhttp.onreadystatechange = function() {

    if (xmlhttp.readyState === 4 && xmlhttp.status === 200) {
       let cuisines = JSON.parse(xmlhttp.responseText)
       buildMenu(cuisines)
       getRestaurants(cuisines[0])
      }
    }

  xmlhttp.open("GET", "/cuisines", true)
  xmlhttp.send()

}


function buildMenu(cuisines) {

  var menu = document.getElementById("cuisine-menu")

  // this is a closure
  var isFirst = true

  cuisines.forEach(function(cuisine) {

    let radiobutton = document.createElement("input")
    radiobutton.setAttribute("type","radio")
    radiobutton.setAttribute("id",cuisine)
    radiobutton.setAttribute("name","cuisine")
    radiobutton.setAttribute("value",cuisine)
    radiobutton.setAttribute("onclick","selectCuisine(this)")

    if( isFirst == true) {

      isFirst = false;
      radiobutton.setAttribute("checked","true")

    }

    menu.appendChild(radiobutton)

    let span = document.createElement("span")

    // make the first character uppercase
    span.innerText = cuisine.charAt(0).toUpperCase() + cuisine.slice(1)
    menu.appendChild(span)

    let linebreak = document.createElement("br")
    menu.appendChild(linebreak)

  })

}


function selectCuisine(radiobutton) {
  getRestaurants(radiobutton.value)
}


function getRestaurants( selectedCuisine ) {

  // reset the reastaurants
  restaurants = []

  let xmlhttp = new XMLHttpRequest()

  xmlhttp.onreadystatechange = function() {

    if (xmlhttp.readyState === 4 && xmlhttp.status === 200) {

      let values = JSON.parse(xmlhttp.responseText);

      values.forEach(function (restaurant) {
        restaurant.showReview = false
        restaurants.push(restaurant)
      })

      showRestaurants(restaurants)

    }
  }

  xmlhttp.open("GET", "/restaurants/" + selectedCuisine, true)
  xmlhttp.send()

}

function showRestaurants( restaurants ) {

  let info = document.getElementById("restaurant-info")

  info.innerHTML = ""

  for( let i = 0; i < restaurants.length; i++ ) {

    let title = document.createElement("title")
    title.innerHTML = restaurants[i].name
    info.appendChild(title)

    let addressDiv = document.createElement("div")
    addressDiv.innerHTML =
      restaurants[i].address +
      "<br>" +
      restaurants[i].city +
      ", " +
      restaurants[i].state +
      "&nbsp;&nbsp;" +
      restaurants[i].zip

    info.appendChild(addressDiv)

    let reviewDiv = document.createElement("div")
    reviewDiv.setAttribute("class","review-div")
    reviewDiv.innerHTML = "Review"

    let img = document.createElement("img")
    img.setAttribute("src","/images/"+(restaurants[i].showReview?"minus":"plus")+".png")
    img.setAttribute("class","icon")
    img.setAttribute("onclick","showReview("+ i +")")
    reviewDiv.appendChild(img)

    info.appendChild(reviewDiv)

    if (restaurants[i].showReview) {

      for (let j = 0; j < restaurants[i].review.length; j++) {
        let reviewParagraph = document.createElement("p")
        reviewParagraph.innerText = restaurants[i].review[j].text
        info.appendChild(reviewParagraph)
      }

      let ratings = document.createElement("p")
      ratings.innerText = "Rating: " + restaurants[i].rating + "/5"
      info.appendChild(ratings)

    }

    if( i < restaurants.length - 1 ) {
      let hr = document.createElement("hr")
      info.appendChild(hr)
    }

  }

}

function showReview(i) {
  restaurants[i].showReview = !restaurants[i].showReview
  showRestaurants(restaurants)
}