var total = 0;
var count = 0;

function setCartScore() {
    if (total > 0) {
        let cartTitle = document.querySelector("div.a-row.sc-cart-header.sc-compact-bottom");
        let cartScore = Math.floor(total / count); 
        let img = document.createElement("img");
        img.src = "https://i.ibb.co/1mq2mfc/Logo.png";
        img.style.height = "35px";
        let div = document.createElement("div");
        div.className = "greenScoreDiv cartCard";

        div.appendChild(img);
        div.appendChild(document.createElement("br"));
        let h2 = document.createElement("h2")
        h2.appendChild(document.createTextNode("Green Score"))
        h2.className="greenScore"
        div.appendChild(h2);
        // h3.appendChild(document.createTextNode("Green Score: "));
        div.style.color = ""
        let span = document.createElement("span");
        span.appendChild(document.createTextNode(cartScore));
        let badgeColor = getBadgeColor(cartScore);
        span.className = `badge badge-${badgeColor} cartScoreText`;

        div.appendChild(span);
        cartTitle.append(div);

        console.log("CART TITLE", cartTitle, total, count)
        setNewPointTotal(cartScore);
    }
}

function createScoreBadge(itemId) {
    let span = document.createElement("span");
    let score = getProductScore(itemId);
    let badgeColor = getBadgeColor(score);
    total += score;
    count += 1;
    let scoreText = `alterEco Score ${score}`;
    span.className = `badge badge-pill badge-${badgeColor}`;
    span.id = `altereco-score`;
    span.appendChild(document.createTextNode(scoreText))
    return span;
}

function checkRecommendations(itemId, cartItem) {
    let itemRecomm = {
        "B00CLVU0C4":{
            productName: "EcoVessel Water Bottle",
            img: "https://m.media-amazon.com/images/I/61bhmW6mjxL._AC_AA180_.jpg",
            linkAddress: "https://www.amazon.ca/gp/product/B019K72FTC/ref=ox_sc_act_title_1?smid=A3DWYIK6Y9EEQB&psc=1"
        }
    }

    if (itemId in itemRecomm) {
        let div = document.createElement("div");
        div.className = "alternativeProduct card"
        // Image: 
        let img = document.createElement("img");
        img.className = "cardImage";
        img.src = itemRecomm[itemId].img

        // Header: 
        let h5 = document.createElement("h5");
        h5.className = "card-header"
        h5.appendChild(document.createTextNode("alterEco alternative"));

        let divBody = document.createElement("div");
        divBody.className = "card-body";
        let p = document.createElement("p");
        p.appendChild(document.createTextNode(itemRecomm[itemId].productName))
        // h5.appendChild(document.createTextNode(itemRecomm[itemId].productName));

        let button = document.createElement("a");
        button.href = itemRecomm[itemId].linkAddress;
        button.className = "btn btn-primary"
        button.append(document.createTextNode("View Product"))
        button.className = "viewProduct";
        divBody.appendChild(button)


        div.appendChild(h5);
        div.appendChild(img);
        div.appendChild(divBody);

        cartItem.appendChild(div);
        // <a href="#" class="btn btn-primary">Go somewhere</a>

    }
{/* <div class="media">
  <img src="..." class="mr-3" alt="...">
  <div class="media-body">
    <h5 class="mt-0">Media heading</h5>
    Cras sit amet nibh libero, in gravida nulla. Nulla vel metus scelerisque ante sollicitudin. Cras purus odio, vestibulum in vulputate at, tempus viverra turpis. Fusce condimentum nunc ac nisi vulputate fringilla. Donec lacinia congue felis in faucibus.
  </div>
</div> */}

}

function getBadgeColor(score) {
    let badgeColor = ""
    if (score >= 80) {badgeColor="success"} 
    else if (score >= 60) {badgeColor="warning"} 
    else {badgeColor="danger"} 
    return badgeColor;
}

function addEventListenerToDelete() {
    let deletes = document.querySelectorAll("input[value='Delete']");
    for (let item of deletes) {
        // getEventListeners(item);
        item.addEventListener("change", () => {
            console.log("EVENT LISTENER ACTIVATED");
            setProductScores();
        })
    }
}

function getProductScore(itemId) {
    console.log("ITEMID", itemId);
    let itemScoreMap = {
        "B00CLVU0C4": 10,
        "B07VD5LYMW": 45,
        "B07JQP2C3X": 78,
        "B019K72FTC": 98,
        "B07VD5LYMW": 45
    }
    if (itemId in itemScoreMap) {
        return itemScoreMap[itemId];
    }
    else {
        return Math.floor(Math.random() * 100) + 1
    }
}

function setProductScores() {
    let priceDiv = document.querySelectorAll('div.a-column.a-span2.a-text-right.a-span-last');
    console.log(priceDiv);
    for (let item of priceDiv) {
        if (!item.className.includes("a-spacing-top-micro")) {
            let itemDetails = item.parentNode.parentNode.parentNode;
            let itemId = itemDetails.getAttribute('data-asin');
            console.log(itemId)
            // console.log("PARET", item.parentNode.parentNode.parentNode)
            item.appendChild(createScoreBadge(itemId));
            checkRecommendations(itemId, item);
        }
    }
}

function setNewPointTotal(cartScore) {
    let subtotalDiv = document.querySelectorAll("[data-name='Subtotals']");
    for (let item of subtotalDiv) {
        item.appendChild(document.createElement("br"));
        item.appendChild(getNewBucksTotal(cartScore));
    }
    // subtotalDiv.appendChild(span);
    // return span;
}

function getNewBucksTotal(cartScore) {
    let span = document.createElement("span");
    let scoreText = `Earn $${(cartScore * 0.02).toFixed(2)} GreenBucks with this purchase`;
    span.className = `badge badge-pill badge-success`;
    span.id = `altereco-earnpoints`;
    span.appendChild(document.createTextNode(scoreText))
    return span;
}

let tabUrl = window.location.toString()
let regex = ".*amazon\.ca.*cart"
if (tabUrl.match(regex)) {
    // let cart = document.getElementById("sc-active-cart")
    // let activeCart = document.querySelectorAll("[data-name='Active Items']")[0]
    // let items = activeCart.querySelectorAll('sc-list-item-content');
    // let cartItems = cart.querySelectorAll("sc-product-price")
    setProductScores();
    setCartScore(); 
    setApplyCoupon();

    let form = document.getElementById("activeCartViewForm")

    let formItems = document.querySelectorAll("span.a-size-small.sc-action-delete");

    for (let item of formItems) {
        item.addEventListener("click", () => {
            console.log("Item Deleted");
            location.reload();

        })
    }

    form.addEventListener("change", () => {console.log("FORM CHANGE")})
    addEventListenerToDelete();
}


function setApplyCoupon() {
    if (total > 0) {
        let cartTitle = document.querySelector("div.a-row.sc-cart-header.sc-compact-bottom");
        let cartScore = Math.floor(total / count);
        console.log(cartScore);
        // let img = document.createElement("img");
        // img.src = "https://i.ibb.co/1mq2mfc/Logo.png";
        // img.style.height = "35px";
        let div = document.createElement("div");
        // div.appendChild(img);
        div.className = "applyCoupon cartCard";
        let h2 = document.createElement("h2")
        h2.className="greenBucks"
        div.appendChild(h2);
        let span = document.createElement("span");

        if (cartScore > 70) {
            span.appendChild(document.createTextNode("Use $10.00"));
            let badgeColor = getBadgeColor(cartScore);
            span.className = `badge badge-success cartScoreText boxShadow`;
            h2.appendChild(document.createTextNode(`Apply Green Bucks`))
            div.appendChild(document.createElement("br"));
            div.appendChild(span);
            cartTitle.append(div);

        } 


        console.log("CART TITLE", cartTitle, total, count)
        // setNewPointTotal(cartScore);
    }
}