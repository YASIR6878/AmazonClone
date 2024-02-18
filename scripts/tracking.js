import { products } from "../data/products.js";
 export function trackshipping(producttrackid) {
    let trackhtml = "";

    products.forEach((product) => {
        if (product.id == producttrackid) {
            trackhtml = `
                <div class="delivery-date">
                    Arriving on Monday, June 13
                </div>

                <div class="product-info">
                    ${product.name}
                </div>

                <div class="product-info">
                    Quantity: 1
                </div>

                <img class="imageintrack" src="${product.image}">

                <div class="progress-labels-container">
                    <div class="progress-label">
                        Preparing
                    </div>
                    <div class="progress-label current-status">
                        Shipped
                    </div>
                    <div class="progress-label">
                        Delivered
                    </div>
                </div>
                <div class="progress-bar-container">
        <div class="progress-bar"></div>
      </div>
            `;
        }
    });

    return trackhtml;
}
document.addEventListener('DOMContentLoaded', () => {
    const trackhtml = JSON.parse(localStorage.getItem('trackhtml'));
    if (trackhtml) {
        document.querySelector('.trackdata').innerHTML = trackhtml;
    }
});
