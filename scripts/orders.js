import {cart} from "../data/cart.js";
import { products } from "../data/products.js";
import { trackshipping } from "./tracking.js";

export let ordercart=JSON.parse(localStorage.getItem('ordercart'))||[];
cart.forEach((cartitem)=>{
    const orderitemid=cartitem.productId;
    products.forEach((productitem)=>{
      if(orderitemid===productitem.id){
          ordercart.push({
            quantity:cartitem.quantity,
            isorder:productitem

          })
      }
    })
})
saveorder();
function saveorder(){
    localStorage.setItem('ordercart',JSON.stringify(ordercart));
}


let orderhtml='';
    ordercart.forEach((orderitem)=>{
      orderhtml+=`
      <div class="order-container-${orderitem.isorder.id}">

        <div class="order-header">
          <div class="order-header-left-section">
            <div class="order-date">
              <div class="order-header-label">Order Placed:</div>
              <div>June 10</div>
            </div>
            <div class="order-total">
              <div class="order-header-label">Total:</div>
              <div>$${(orderitem.isorder.priceCents)/100}</div>
            </div>
          </div>

          <div class="order-header-right-section">
            <div class="order-header-label">Order ID:</div>
            <div>${orderitem.isorder.id}</div>
          </div>
        </div>

        <div class="order-details-grid">
          <div class="product-image-container">
            <img src="${orderitem.isorder.image}">
          </div>

          <div class="product-details">
            <div class="product-name">
              ${orderitem.isorder.name}
            </div>
            <div class="product-delivery-date">
              Arriving on: June 17
            </div>
            <div class="product-quantity">
              Quantity: ${orderitem.quantity}
            </div>
            <button class="buy-again-button button-primary">
              <img class="buy-again-icon" src="images/icons/buy-again.png">
              <span class="buy-again-message">Buy it again</span>
            </button>
          </div>

          <div class="product-actions">
            
              <button class="track-package-button button-secondary trackbutton" data-product-id="${orderitem.isorder.id}">
                Track package
              </button>
            
            <button class="delete-orderitem" data-product-id="${orderitem.isorder.id}">
            Remove
          </button>
          </div>
        </div>
      </div>`
    });
    if(ordercart.length===0){
    document.querySelector('.orderempty').innerHTML=` <div><img src="https://codehap.com/images/empty_cart.jpeg" style="margin-left:3cm"alt="empty"></div>`;
    }
    else{
document.querySelector('.orders-grid').innerHTML=orderhtml;}

document.querySelectorAll('.delete-orderitem').forEach((link) => {
  link.addEventListener('click', () => {
    const productId = link.dataset.productId;
    console.log(`Clicked on Delete button for product ID: ${productId}`);
    deleteorderitem(productId);
    console.log('Order item removed. Updated ordercart:', ordercart);
    const container = document.querySelector(`.order-container-${productId}`);
    if (container) {
      container.remove();
    }
  });
});

function deleteorderitem(productId) {
  const newordercart = ordercart.filter((cartitem) => cartitem.isorder.id !== productId);
  ordercart = newordercart;
  saveorder();
  const updatedLocalStorage = JSON.parse(localStorage.getItem('ordercart')) || [];
  const updatedData = updatedLocalStorage.filter((cartitem) => cartitem.isorder.id !== productId);
  localStorage.setItem('ordercart', JSON.stringify(updatedData));

}
document.querySelector('.clearallbutton').addEventListener('click',()=>{
  ordercart=[];
  document.querySelector('.orders-grid').innerHTML='';
  document.querySelector('.orderempty').innerHTML=` <div><img src="https://codehap.com/images/empty_cart.jpeg" style="margin-left:3cm"alt="empty"></div>`;
  localStorage.clear();
})

const trackButtons = document.querySelectorAll('.trackbutton');
trackButtons.forEach((trackButton) => {
    trackButton.addEventListener('click', () => {
        const itemid = trackButton.dataset.productId;
        const trackhtml = trackshipping(itemid);
        localStorage.setItem('trackhtml', JSON.stringify(trackhtml));
        window.location.href = 'tracking.html';
    });
});









