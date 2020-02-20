

{/* <a href="#" class="previous">&laquo; Previous</a>
<a href="#" class="next">Next &raquo;</a> */}


addNavButtons(); 

function addNavButtons() {
    let navigationDiv = document.getElementById("navigation");
    navigationDiv.appendChild(createNavButton("insights.html", "Historical Insights"))
    navigationDiv.appendChild(createNavButton("catalogue.html", "Product Catalogue"))
}

function createNavButton(href, text) { 
    let a = document.createElement("a");
    a.href = href;
    a.append(document.createTextNode(text));
    return a;
}