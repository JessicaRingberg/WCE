//Array to hold courses from json file
let jsonList = [];
//Array to hold created courses
let newCourse = JSON.parse(localStorage.getItem("SAVED")) || [];
//array that holds all courses
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
            //Concat jsonlist with newCourse to create array that holds both created and original courses
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
        <p>${course.price} SEK</p>
        <button id="courses-site" class="btn
        btn-sm add-to-cart" onclick="addToCart(${course.id})">
        <span><i class="bi bi-bag"></i></span>
        Lägg i kundvagn</button>
      </div>
    </div>
  </div>`
        document.getElementById("show-cards").innerHTML += courseDisplay;
    }
    //Save to localstorage
    localStorage.setItem("SAVED", JSON.stringify(newCourse));

}



//Add course to array and display on site
function addCourse() {
    let x = document.forms["myForm"]["input-id"].value;
    if (x == "" || x == null) {
        return false;
    }
    x = document.forms["myForm"]["input-name"].value;
    if (x == "" || x == null) {
        return false;
    }
    x = document.forms["myForm"]["input-length"].value;
    if (x == "" || x == null) {
        return false;
    }
    x = document.forms["myForm"]["input-info"].value;
    if (x == "" || x == null) {
        return false;
    }
     x = document.forms["myForm"]["input-price"].value;
    if (x == "" || x == null) {
        return false;
    }
    //If added course id already exists, then return and alert user
    if (coursesArray.some((course) => course.id == document.getElementById("input-id").value)) {
        alert("En kurs med detta id existerar redan!")
        return false;
        
    }

    //Add course to array with created courses
    newCourse.push({
        id: document.getElementById("input-id").value,
        name: document.getElementById("input-name").value,
        description: document.getElementById("input-info").value,
        length: document.getElementById("input-length").value + "veckor",
        price: document.getElementById("input-price").value,
        imgSrc: "./images/new.png"
    
    });

    displayList();

}


//Add selected item to cart
function addToCart(id) {
    //Prevents same course to be added twice
    if (cart.some((added) => added.id == id)) {
        return;
    }

    const added = coursesArray.find(x => x.id == id);
    cart.push(added);
    showCart();
}


//Opens cart container
function openCart() {
    document.getElementById("mySidepanel").style.width = "250px";
}


//Closes cart container
function closeCart() {
  document.getElementById("mySidepanel").style.width = "0";
}


//Display items in cart
function showCart() {
    //Count items in cart
    let cartCount = 0;

    //Empty the html each time to avoid duplicates in cart display
    document.getElementById("my-things").innerHTML = "";
    let p = 0;
   //Each item gets the deleteFromCart function
    for (let i = 0; i < cart.length; i++) {
        const element = cart[i];
        p = p + parseInt(element.price);
        let seen = `<li class="list-group-item justify-content-between align-items-center">
        <h5 onclick="deleteFromCart(${element.id})">
        ${element.name}<i class="bi bi-trash3 ms-md-auto">
        </i></h5>`
        document.getElementById("my-things").innerHTML += seen;
        cartCount++;



    }
    document.getElementById("total-p").innerText = p + " SEK";
    document.getElementById("cart-counter").innerText = cartCount;

    //Save cart to local storage
    localStorage.setItem("CART", JSON.stringify(cart));

}


//Delete selected item in cart
function deleteFromCart(id) {
    cart = cart.filter((item) => item.id != id)
    showCart();
}


//Modal to confirm purchase
function buyItems() {
    if (cart.length <= 0) {
        document.getElementById("confirmed").innerHTML = "Din kundvagn innehåller inga varor!";
    }
    else if (cart.length > 0) {
        document.getElementById("confirmed").innerHTML = "Tack för ditt köp!";
        cart.length = 0;
        showCart();
    }
    closeCart();
}