
let carts = document.querySelectorAll('.cart');

let products = [
   {
      name : 'Lauder WM- Black and White Shoes',
      tag : 'f1',
      price : 650,
      inCart : 0
   },
   {
      name : 'Mens Casual Board Shoes sneakers',
      tag : 'f2',
      price : 650,
      inCart : 0
   },
   {
      name : "Men's Casual Running sneakers- Khaki",
      tag : 'f3',
      price : 650,
      inCart : 0
   },
   {
      name : 'Men Casual Classic Running Sneakers-White',
      tag : 'f4',
      price : 650,
      inCart : 0
   },
   {
      name : 'Stylish Fedoera Wool Fashion Hat',
      tag : 'f5',
      price : 650,
      inCart : 0
   },
   {
      name : "Men's Color Stitching Polo  Shirt",
      tag : 'f6',
      price : 400,
      inCart : 0
   },
   {
      name : "'Men's Casual Business T-shirts Polos",
      tag : 'f7',
      price : 400,
      inCart : 0
   },
   {
      name : 'Men/Women Turtle Neck Top/Cooperate Black',
      tag : 'f8',
      price : 300,
      inCart : 0
   },
   {
    name : 'Luxury Stainless Steel Snake Pendan',
    tag : 'f9',
    price : 800,
    inCart : 0
 },

 {
   name : "V8 Wrist Watches Men's Sport Waterproof",
   tag : 'f10',
   price : 800,
   inCart : 0
},
{
   name : "4 in 1 Set Handbags Single Shoulder",
   tag : 'f11',
   price : 800,
   inCart : 0
},
{
   name : "Custom-Made Trendy Up and Down Wears",
   tag : 'f12',
   price : 800,
   inCart : 0
},
{
   name : "Ladies Pencil Leather Mix Pencil Pants-Black",
   tag : 'f13',
   price : 800,
   inCart : 0
},
{
   name : "Ladies Half Zip Tank Unitard Romper",
   tag : 'f14',
   price : 800,
   inCart : 0
},
{
   name : "Woman Office Ladies Elegant Classy Jumpsuit Blue",
   tag : 'f15',
   price : 800,
   inCart : 0
},

{
   name : "Woman Office Ladies Elegant Classy Jumpsuit Blue",
   tag : 'f16',
   price : 800,
   inCart : 0
},
]

for(let i=0; i<carts.length; i++) {
   carts[i].addEventListener('click', () => {
      cartNumbers(products[i]);
      totalCost(products[i]);
   })
}

function onLoadCartNumbers() {
   let productNumbers = localStorage.getItem('cartNumbers');

   if(productNumbers) {
      document.querySelector('#cnt').textContent = productNumbers;
   }
}

function cartNumbers(product) {
   console.log("The product is : ", product);
   let productNumbers = localStorage.getItem('cartNumbers');
   productNumbers = parseInt(productNumbers);
   if(productNumbers) {
      localStorage.setItem('cartNumbers', productNumbers+1);
      document.querySelector('#cnt').textContent = productNumbers + 1;
   }
   else {
      localStorage.setItem('cartNumbers', 1);
      document.querySelector('#cnt').textContent = 1;
   }

   setItems(product);
}

function setItems(product) {

   let cartItems = localStorage.getItem('productsInCart');
   cartItems = JSON.parse(cartItems);

   if(cartItems != null) {

      if(cartItems[product.tag] == undefined) {
         cartItems = {
            ...cartItems,
            [product.tag] : product
         }
      }
      cartItems[product.tag].inCart += 1;
   }
   else {
      product.inCart = 1;
      cartItems = {
         [product.tag] : product
      }
   }

   localStorage.setItem("productsInCart", JSON.stringify(cartItems));
}

function totalCost(product) {
   let cartCost = localStorage.getItem('totalCost');
   if(cartCost != null) {
      cartCost = parseInt(cartCost);
      localStorage.setItem("totalCost",cartCost+product.price);
   }
   else {
      localStorage.setItem("totalCost",product.price); 
   }
}


function displayCart() {
   let cartItems = localStorage.getItem("productsInCart")
   cartItems = JSON.parse(cartItems);
   console.log(cartItems);
   let productContainer = document.querySelector(".products");
   let cartCost = localStorage.getItem('totalCost');
   if(cartItems && productContainer) {
      productContainer.innerHTML = '';
      Object.values(cartItems).map(item => {
         productContainer.innerHTML += `
         <div class="product">
            <button class="btn" onclick='deleteFromCart(${JSON.stringify(item)})'>Delete</button>
           
            <span>${item.name}</span>
            <div class="price">₦${item.price} </div>
            <div class="quantity">
               <ion-icon name="caret-back"></ion-icon>
               <span>${item.inCart}</span>
               <ion-icon name="caret-forward"></ion-icon>
            </div>
            <div class="total">
            ₦${item.inCart * item.price}
            </div>
         </div>
         `;
      });

      productContainer.innerHTML += `
         <div class="basketTotalContainer">
            <h4 class="basketTotalTitle">
               Cart Total
            </h4>
            <h4 class="basketTotal">
            ₦${cartCost}
            </h4>
         </div>
      `;
   }
}


function deleteFromCart(item) {
   let cartItems = JSON.parse(localStorage.getItem('productsInCart'));
 
   delete cartItems[item.tag];
   localStorage.setItem('productsInCart', JSON.stringify(cartItems));

   let productNumbers = localStorage.getItem('cartNumbers');
   productNumbers = parseInt(productNumbers);
   if (productNumbers) {
     localStorage.setItem('cartNumbers', productNumbers - item.inCart);
     document.querySelector('#cnt').textContent = productNumbers - item.inCart;
   }
   let cartCost = localStorage.getItem('totalCost');
   if (cartCost != null) {
     cartCost = parseInt(cartCost);
     localStorage.setItem('totalCost', cartCost - (item.price * item.inCart));
   }
 
   displayCart();
}

onLoadCartNumbers();
displayCart();


// hamburger
const hamburger = document.querySelector("#bar");
const navMenu = document.querySelector(".nav-menu");

hamburger.addEventListener("click", () => {
   hamburger.classList.toggle("active");
   navMenu.classList.toggle("active");

})

document.querySelectorAll(".nav-link").forEach((link) => 
link.addEventListener("click", ()=> {
   hamburger.classList.remove("active");
   navMenu.classList.remove("active");
})

);