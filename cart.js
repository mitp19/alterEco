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
            let itemDetails = item.parentNode.parentNode.parentNode;
            let itemId = itemDetails.getAttribute('data-itemid');
            console.log(itemId)
            // console.log("PARET", item.parentNode.parentNode.parentNode)
            item.appendChild(createScoreBadge(itemId));
        }
    }
}

function createScoreBadge(itemId) {
    let span = document.createElement("span");
    let badgeColor = "success"
    let score = getProductScore(itemId);
    if (score >= 80) {badgeColor="success"} 
    else if (score >= 60) {badgeColor="warning"} 
    else {badgeColor="danger"} 

    let scoreText = `alterEco Score ${score}`;
    span.className = `badge badge-pill badge-${badgeColor}`;
    span.appendChild(document.createTextNode(scoreText))
    return span;
    // <span class="badge badge-pill badge-primary">Primary</span>

}

function getProductScore(itemId) {
    console.log("ITEMID", itemId);
    let itemScoreMap = {
        "C95b35eaf-2c48-4697-b43f-8556f12cb8c8": 17,
        "Ca1824aec-1c2a-4e84-b8e6-d43a6b4a6eac": 72, 
        "Cbdbd7706-f033-43a3-874e-7def3eba3eff": 41
    }
    if (itemId in itemScoreMap) {
        console.log("FOUND KEY")
        return itemScoreMap[itemId];
    }
    else {
        return Math.floor(Math.random() * 100) + 1
    }
}
