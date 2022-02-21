const courseList =[];
let cart = JSON.parse(localStorage.getItem("CART")) || [];
const newCourses = JSON.parse(localStorage.getItem("CO")) || [];
showCart();

// class Kurs {
//     constructor(input) {
//         this.id = input.id;
//         this.name = input.name;
//         this.description = input.description;
//         this.length = input.length;
//         this.imgSrc = input.imgSrc
//     }
// }
//Get jsonobjects to javascript array
fetch(new Request("courses.json")) 
    .then((res) => res.json())
        .then((data) => {
            for (let i = 0; i < data.length; i++) {
                const item = data[i];
                courseList.push(item);
            }
            displayList(courseList);
            displayList(allC);
        })
    .catch(console.error);
       
    
//Show elements from json in html
function displayList(array) {

    for (let i = 0; i < array.length; i++) {
        const course = array[i];
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
        document.getElementById("createN").innerHTML += courseDisplay;
    }
    //localStorage.setItem("COURSES", JSON.stringify(courseList));
    //courseList.length = 0; 
}  


//Add course to array and display on site
function addCourse() {
    newCourses.push({
        id: document.getElementById("input-id").value,
        name: document.getElementById("input-name").value,
        description: document.getElementById("input-info").value,
        length: document.getElementById("input-length").value,
        
    });
    const allC = courseList.concat(newCourses);
    console.log(courseList);
    localStorage.setItem("CO", JSON.stringify(newCourses));

}


// Add selected item to cart array
function addToCart(id) {
      if (cart.some((added) => added.id == id)) {
          return;
    }
    const added = courseList.find(x => x.id == id);
   
    cart.push(added);
    showCart();
}


// display items from cart in html
function showCart() {
    //Empty the html each time to avoid duplicates in cart display
    document.getElementById("my-things").innerHTML = "";

    for (let i = 0; i < cart.length; i++) {
        const element = cart[i];
        let seen = `<li class="list-group-item justify-content-between align-items-center">
        <h5 onclick="deleteFromCart(${element.id})">
        ${element.name} <i class="bi bi-trash3"></i> 
        </h5>` //Align trashcans later
        document.getElementById("my-things").innerHTML += seen;
        
    }
    //Save cart
    localStorage.setItem("CART", JSON.stringify(cart));

}


//Delete selected item in cart
function deleteFromCart(id) {
    cart = cart.filter((item) => item.id != id)

    showCart();
}


//Display modal to thank for purchase or alert cart is empty
function buyItems() {
    if (cart.length <= 0) {
        document.getElementById("confirmed").innerHTML = "Din kundvagn är tom!";
    }
    else if (cart.length > 0) {
        document.getElementById("confirmed").innerHTML = "Tack för ditt köp!";
        cart.length = 0;
        showCart();
    }
}

