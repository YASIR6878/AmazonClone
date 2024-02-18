import { products } from "../data/products.js";
import { searching } from "../scripts/search.js";

export let cart=JSON.parse(localStorage.getItem('cart'));
if(!cart){
  cart=[{
     productId:"e43638ce-6aa0-4b85-b27f-e1d07eb678c6",
     quantity:2
   }];
 }


export function addtocart(productid){
    let matchingitem;
  cart.forEach((cartitem)=>{
    if(productid===cartitem.productId){
      matchingitem=cartitem;
    }
  })
  if(matchingitem){
    matchingitem.quantity+=1;
  }
  else{
  cart.push({
    productId:productid,
    quantity:1
  })}
  savetostorage();
  }
function savetostorage(){
  localStorage.setItem('cart',JSON.stringify(cart));
}
export function cartquantity(){
    let totalcartquantity=0;
    cart.forEach((cartitem)=>{
       totalcartquantity+=cartitem.quantity;
    })
   document.querySelector('.cart-quantity').innerHTML=totalcartquantity;
    }

   export function removefromcart(productId){
      const newcart=[];
      cart.forEach((cartitem)=>{
        if(cartitem.productId!==productId){
          newcart.push(cartitem);
        }
      });
      cart=newcart;
      if(newcart.length==0){
        document.querySelector('.js-order-summary').innerHTML=`<div><img src="https://cdni.iconscout.com/illustration/premium/thumb/your-cart-is-empty-2161427-1815069.png"></div>`;
      }
      
      savetostorage();
    }
    export function totalamount(deleteitemid) {
      let itemcount=0;
      let totalcost = 0;
      cart.forEach((cartitem) => {
        itemcount+=1;
        const cartitemid = cartitem.productId;
        products.forEach((product) => {
          if (cartitemid == product.id && cartitemid!=deleteitemid) {
            totalcost += product.priceCents * Number(cartitem.quantity);
          }
        });
      });
      let delivery=20.23;
      let gst=4.77;
      let discount=10.74
      let grandtotal;
      if(totalcost==0){
        grandtotal=0;
      }
      else{
      grandtotal =(delivery+gst+totalcost)-discount;}
      
      document.querySelector('.total-order-items').innerHTML='Items:('+itemcount+')';
      document.querySelector('.total-money').innerHTML = '$' + (totalcost / 100).toFixed(2);
      document.querySelector('.endmoney').innerHTML = '$' + (grandtotal / 100).toFixed(2);
    }
      
let searchitem = [];
export function searchbar(textvalue) {
  searchitem = [];

  products.forEach((product) => {
    if (product.keywords.includes(textvalue)) {
      searchitem.push({
        searchid: product.id,
        name: product.name,
        image: product.image,
        rating: product.rating,
        priceCents: product.priceCents,
      });
    }
  });

  const searchtmll = searching(searchitem);
  localStorage.setItem('searchtmll', JSON.stringify(searchtmll));
  localStorage.setItem('textvalue',JSON.stringify(textvalue));
  window.location.href = 'search.html';
}

