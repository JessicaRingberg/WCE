//Array to hold courses from json file
let jsonList = [];
//Array to hold created courses
let newCourse = JSON.parse(localStorage.getItem("p")) || [];
//array that holds in both jsonList and newArray
let coursesArray = [];
//Array to hold items in cart
let cart = JSON.parse(localStorage.getItem("CART")) || [];
showCart();



//Get jsonobjects to javascript array
    fetch(new Request("courses.json"))
        .then((res) => res.json())
        .then((data) => {
            for (let i = 0; i < data.length; i++) {
                const item = data[i];
                jsonList.push(item);
               
            }
            //Concat jsonlist with newCourse to create array that holds in both created and original courses
            coursesArray = jsonList.concat(newCourse)

            displayList();
            
        })
    .catch(console.error);

       
   


//Displays courses from array
//Each element added gets a button with the function addToCart
function displayList() {

    document.getElementById("show-cards").innerHTML = "";

    for (let i = 0; i < coursesArray.length; i++) {
        const course = coursesArray[i];
        let courseDisplay = `<div class=" card-group col">
    <div class="card" style="width:15rem;">
      <img src="${course.imgSrc}" class="card-img-top" alt="kursbild">
      <div class="card-body">
        <h5 class="card-title">${course.name}</h5>
        <small class="card-text">${course.description}</small>
        <button class="btn btn-success
        btn-sm add-to-cart" onclick="addToCart(${course.id})">
        <span><i class="bi bi-bag"></i></span>
        Lägg i kundvagn</button>
      </div>
    </div>
  </div>`
        document.getElementById("show-cards").innerHTML += courseDisplay;
    }
    //Save array to localstorage
    localStorage.setItem("p", JSON.stringify(newCourse));

}



//Add course to array and display on site
function addCourse() {
    //If added course id already exists, then return and alert user
    if (coursesArray.some((course) => course.id == document.getElementById("input-id").value)) {
        alert("En kurs med detta id existerar redan!")
        return;
    }
    //Add course to array with created courses
    newCourse.push({
        id: document.getElementById("input-id").value,
        name: document.getElementById("input-name").value,
        description: document.getElementById("input-info").value,
        length: document.getElementById("input-length").value,
        imgSrc: "./images/new.png"
    
    });

    displayList();

}


// Add selected item to cart array
function addToCart(id) {
    //Prevents same course to be added twice
      if (cart.some((added) => added.id == id)) {
          return;
    }
    const added = coursesArray.find(x => x.id == id);
   //add course to cart array
    cart.push(added);

    showCart();
}



// display items from cart array in html
function showCart() {
    //Empty the html each time to avoid duplicates in cart display
    document.getElementById("my-things").innerHTML = "";
//Each item gets a function added that lets you remove the item
    for (let i = 0; i < cart.length; i++) {
        const element = cart[i];
        let seen = `<li class="list-group-item justify-content-between align-items-center">
        <h5 onclick="deleteFromCart(${element.id})">
        ${element.name}<i class="bi bi-trash3 ms-md-auto">
        </i></h5><small>${element.description}</small>`
        document.getElementById("my-things").innerHTML += seen;
        
    }
    //Save cart to local storage
    localStorage.setItem("CART", JSON.stringify(cart));

}



//Delete selected item in cart
function deleteFromCart(id) {
    //The clicked item gets removed from cart array
    cart = cart.filter((item) => item.id != id)

    showCart();
}



//Display modal to thank for purchase and empty cart array, or alert cart is empty
function buyItems() {
    if (cart.length <= 0) {
        document.getElementById("confirmed").innerHTML = "Din kundvagn innehåller inga varor!";
    }
    else if (cart.length > 0) {
        document.getElementById("confirmed").innerHTML = "Tack för ditt köp!";
        cart.length = 0;
        showCart();
    }
}

