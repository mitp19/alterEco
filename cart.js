console.log("CART JS");

let tabUrl = window.location.toString()
let regex = ".*amazon\.ca.*cart"
if (tabUrl.match(regex)) {
    let total = 0;
    let count = 0;
    let cart = document.getElementById("sc-active-cart")
    let activeCart = document.querySelectorAll("[data-name='Active Items']")[0]
    // let items = activeCart.querySelectorAll('sc-list-item-content');
    // let cartItems = cart.querySelectorAll("sc-product-price")
    let priceDiv = document.querySelectorAll('div.a-column.a-span2.a-text-right.a-span-last');
    console.log(priceDiv);
    for (let item of priceDiv) {
        if (!item.className.includes("a-spacing-top-micro")) {
            console.log("ITEM", item)
            item.appendChild(createScoreBadge());
        }
    }
}

function createScoreBadge() {
    let span = document.createElement("span");
    span.className = "badge badge-pill badge-success";
    span.appendChild(document.createTextNode(""))
    return span;
    // <span class="badge badge-pill badge-primary">Primary</span>

}