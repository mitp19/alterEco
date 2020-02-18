var total = 0;
var count = 0;

function setCartScore() {
    if (total > 0) {
        let cartTitle = document.querySelector("div.a-row.sc-cart-header.sc-compact-bottom");
        let cartScore = Math.floor(total / count); 

        let h3 = document.createElement("h3");
        h3.appendChild(document.createTextNode("alterEco Cart Score: "));
        
        h3.style.color = ""
        let span = document.createElement("span");
        span.appendChild(document.createTextNode(cartScore));
        let badgeColor = getBadgeColor(cartScore);
        span.className = `badge badge-${badgeColor}`;

        h3.appendChild(span);
        cartTitle.append(h3);

        console.log("CART TITLE", cartTitle, total, count)
    }
}
function createScoreBadge(itemId) {
    let span = document.createElement("span");
    let score = getProductScore(itemId);
    let badgeColor = getBadgeColor(score)

    total += score;
    count += 1;
    let scoreText = `alterEco Score ${score}`;
    span.className = `badge badge-pill badge-${badgeColor}`;
    span.appendChild(document.createTextNode(scoreText))
    return span;
    // <span class="badge badge-pill badge-primary">Primary</span>
}

function getBadgeColor(score) {
    let badgeColor = ""
    if (score >= 80) {badgeColor="success"} 
    else if (score >= 60) {badgeColor="warning"} 
    else {badgeColor="danger"} 
    return badgeColor;
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


let tabUrl = window.location.toString()
let regex = ".*amazon\.ca.*cart"
if (tabUrl.match(regex)) {
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
    setCartScore() 
}